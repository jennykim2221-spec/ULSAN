import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { scenes } from '@/data/scenes';
import type { SceneId } from '@/data/types';
import { buildSceneTimeline, type SceneTimelineHandle } from './buildSceneTimeline';
import { resolveMotionProfile, type MotionProfileId } from './motionProfiles';
import { sceneRegistry, type ScenePosition } from './sceneRegistry';
import { scrollToScene } from './scrollToScene';

gsap.registerPlugin(ScrollTrigger);
let tickerConfigured = false;
let liveRuntimes = 0;
let liveTickers = 0;

export type ScrollRuntime = { setReduced: (value: boolean) => void; dispose: () => void };
type Options = {
  reduced: boolean;
  onScene: (id: SceneId) => void;
  onProfile: (profile: MotionProfileId) => void;
};

/** Owns only this story's resources. Each scene owns its own GSAP context/timeline. */
export function createScrollRuntime(root: HTMLElement, options: Options): ScrollRuntime {
  liveRuntimes++;
  if (!tickerConfigured) {
    // App-wide GSAP behavior: Lenis receives uninterrupted ticker time.
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ autoRefreshEvents: 'none' });
    tickerConfigured = true;
  }
  const events = new AbortController();
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previousRestoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  let disposed = false;
  let rebuilding = false;
  let reduced = options.reduced;
  let handles: SceneTimelineHandle[] = [];
  let lenis: Lenis | null = null;
  let ticker: ((time: number) => void) | null = null;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  let jumping = false;
  let current: SceneId | null = null;
  let profile: MotionProfileId = 'reduced';
  let refreshCount = 0;
  let lastPosition: ScenePosition | null = null;
  const sizes = new Map<Element, string>();
  const observer = new ResizeObserver(entries => {
    let changed = false;
    for (const entry of entries) {
      const size = `${Math.round(entry.contentRect.width)}:${Math.round(entry.contentRect.height)}`;
      if (sizes.has(entry.target) && sizes.get(entry.target) !== size) changed = true;
      sizes.set(entry.target, size);
    }
    if (changed && !rebuilding) schedule();
  });
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const settle = () => {
    ScrollTrigger.update();
    for (const { trigger } of handles) {
      trigger.getTween()?.progress(1);
      trigger.animation?.progress(trigger.progress);
    }
  };
  const instant = (y: number) => {
    const top = Math.max(0, Math.min(maxScroll(), y));
    if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
    else window.scrollTo({ top, behavior: 'instant' });
    settle();
  };
  const publish = () => {
    if (disposed || rebuilding) return;
    lastPosition = sceneRegistry.position(window.scrollY);
    if (lastPosition && current !== lastPosition.id) {
      current = lastPosition.id;
      root.dataset.activeScene = current;
      options.onScene(current);
    }
  };
  const recordHistory = () => {
    if (disposed || rebuilding || jumping) return;
    publish();
    if (lastPosition) history.replaceState({ ...history.state, ulsan: lastPosition }, '', `#${lastPosition.id}`);
  };
  const measure = () => {
    const limit = maxScroll();
    for (const [index, handle] of handles.entries()) {
      const { trigger, pinned, root: section } = handle;
      const config = scenes[index];
      const start = Math.max(0, trigger.start);
      const end = trigger.end;
      const intervalEnd = index + 1 < handles.length ? handles[index+1].trigger.start : limit;
      const readingProgress = config.id === 'intro' ? 0 : config.id === 'ending' ? .96 : config.readingProgress;
      const readingY = Math.min(limit, pinned ? start + readingProgress * (end-start) : start);
      sceneRegistry.set({ id: config.id, start, end, intervalEnd: Math.max(start + 1, intervalEnd), readingY, pinned });
      section.dataset.scrollStart = String(start);
      section.dataset.scrollEnd = String(end);
      section.dataset.readingY = String(readingY);
    }
  };
  const releaseScenes = () => {
    if (ticker) { gsap.ticker.remove(ticker); ticker = null; liveTickers--; }
    lenis?.off('scroll', ScrollTrigger.update);
    lenis?.destroy();
    lenis = null;
    for (const handle of [...handles].reverse()) handle.kill();
    handles = [];
    sceneRegistry.clear();
  };
  const build = (position: ScenePosition | null) => {
    if (disposed) return;
    rebuilding = true;
    observer.disconnect();
    sizes.clear();
    releaseScenes();
    const resolved = resolveMotionProfile({ width: innerWidth, height: innerHeight, prefersReducedMotion: mq.matches, userReducedMotion: reduced });
    profile = resolved.id;
    root.classList.toggle('scroll-enhanced', resolved.enablePin);
    root.dataset.motionProfile = profile;
    for (const config of scenes) {
      const section = root.querySelector<HTMLElement>(`[data-scene="${config.id}"]`)!;
      handles.push(buildSceneTimeline(config, section, resolved.enablePin));
    }
    if (resolved.enableLenis) {
      lenis = new Lenis({ autoRaf: false, autoResize: false, smoothWheel: true, syncTouch: false, lerp: .14, anchors: false });
      lenis.on('scroll', ScrollTrigger.update);
      ticker = time => { if (!document.hidden) lenis?.raf(time * 1000); };
      gsap.ticker.add(ticker);
      liveTickers++;
    }
    lenis?.resize();
    ScrollTrigger.refresh();
    lenis?.resize();
    measure();
    window.dispatchEvent(new Event('ulsan:measured'));
    refreshCount++;
    if (position) instant(sceneRegistry.y(position));
    else settle();
    for (const handle of handles) observer.observe(handle.root.querySelector('[data-scene-inner]')!);
    rebuilding = false;
    options.onProfile(profile);
    root.dataset.scrollReady = 'true';
    publish();
  };
  function schedule() {
    if (disposed) return;
    clearTimeout(resizeTimer);
    const saved = lastPosition ?? sceneRegistry.position(window.scrollY);
    resizeTimer = setTimeout(() => build(saved), 150);
  }
  const jump = (id: SceneId, push = false, immediate = false) => {
    jumping = true;
    if (push) history.pushState({ ...history.state, ulsan: { id, progress: 0 } }, '', `#${id}`);
    scrollToScene(id, { lenis, immediate, onComplete: () => { settle(); jumping = false; publish(); } });
    if (immediate) settle();
  };
  const hashId = () => scenes.find(s => `#${s.id}` === location.hash)?.id;
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = scenes.find(s => `#${s.id}` === link?.getAttribute('href'))?.id;
    if (!id) return;
    event.preventDefault();
    jump(id, true);
  };
  const cancelJump = () => {
    if (!jumping) return;
    jumping = false;
    lenis?.scrollTo(window.scrollY, { immediate: true });
  };
  const restoreHistory = () => {
    const id = hashId();
    if (id) jump(id, false, true);
  };
  const onFocus = (event: FocusEvent) => {
    if (jumping || rebuilding) return;
    const target = event.target as HTMLElement;
    const section = target.closest<HTMLElement>('[data-scene]');
    if (!section || section.dataset.pinned !== 'true') return;
    const id = section.id as SceneId;
    if (sceneRegistry.position(window.scrollY)?.id !== id) jump(id, false, true);
  };
  const savePosition = () => {
    const position = sceneRegistry.position(window.scrollY);
    try { sessionStorage.setItem('ulsan-scroll', JSON.stringify({ path: location.pathname, position })); } catch { /* storage may be blocked */ }
  };
  const initialY = window.scrollY;
  const naturalScene = [...root.querySelectorAll<HTMLElement>('[data-scene]')].reverse().find(el => el.getBoundingClientRect().top <= 1);
  let initial: ScenePosition | null = initialY > 0 && naturalScene ? { id: naturalScene.id as SceneId, progress: Math.max(0, -naturalScene.getBoundingClientRect().top / naturalScene.offsetHeight) } : null;
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  let restoredSession = false;
  if (navigation?.type === 'reload' || navigation?.type === 'back_forward') {
    try {
      const saved = JSON.parse(sessionStorage.getItem('ulsan-scroll') ?? 'null');
      if (saved?.path === location.pathname && scenes.some(s=>s.id===saved.position?.id)) {
        initial = saved.position;
        restoredSession = true;
      }
    } catch { /* native position remains usable */ }
  }
  try {
    build(initial);
    if (hashId() && !restoredSession) jump(hashId()!, false, true);
  } catch (error) {
    dispose();
    throw error;
  }
  window.addEventListener('resize', schedule, { signal: events.signal });
  window.addEventListener('scroll', publish, { passive: true, signal: events.signal });
  window.addEventListener('popstate', restoreHistory, { signal: events.signal });
  window.addEventListener('hashchange', restoreHistory, { signal: events.signal });
  window.addEventListener('pagehide', savePosition, { signal: events.signal });
  window.addEventListener('pageshow', schedule, { signal: events.signal });
  window.addEventListener('wheel', cancelJump, { passive: true, signal: events.signal });
  window.addEventListener('touchstart', cancelJump, { passive: true, signal: events.signal });
  window.addEventListener('keydown', cancelJump, { signal: events.signal });
  document.addEventListener('click', onClick, { signal: events.signal });
  document.addEventListener('focusin', onFocus, { signal: events.signal });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); }, { signal: events.signal });
  root.addEventListener('toggle', schedule, { capture: true, signal: events.signal });
  mq.addEventListener('change', schedule, { signal: events.signal });
  document.fonts.addEventListener('loadingdone', schedule, { signal: events.signal });
  ScrollTrigger.addEventListener('scrollEnd', recordHistory);

  function dispose() {
    if (disposed) return;
    disposed = true;
    clearTimeout(resizeTimer);
    events.abort();
    observer.disconnect();
    ScrollTrigger.removeEventListener('scrollEnd', recordHistory);
    releaseScenes();
    root.classList.remove('scroll-enhanced');
    delete root.dataset.scrollReady;
    delete root.dataset.motionProfile;
    delete root.dataset.activeScene;
    for (const section of root.querySelectorAll<HTMLElement>('[data-scene]')) {
      delete section.dataset.scrollStart; delete section.dataset.scrollEnd; delete section.dataset.readingY;
    }
    history.scrollRestoration = previousRestoration;
    liveRuntimes--;
  }
  const runtime = { setReduced(value: boolean) { reduced = value; build(sceneRegistry.position(window.scrollY)); }, dispose };
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SCROLL_DEBUG === '1') {
    // Dev-only diagnostics; no test controls or debug UI in production.
    Object.assign(window, { __ulsanScroll: {
      snapshot: () => ({ liveRuntimes, liveTickers, refreshCount, profile, lenis: !!lenis, triggers: ScrollTrigger.getAll().map(t => t.vars.id), rows: sceneRegistry.all() }),
      dispose,
    } });
  }
  return runtime;
}

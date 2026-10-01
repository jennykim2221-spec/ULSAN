import type Lenis from 'lenis';
import type { SceneId } from '@/data/types';
import { sceneRegistry } from './sceneRegistry';

export function scrollToScene(id: SceneId, opts: { lenis?: Lenis | null; immediate?: boolean; onComplete?: () => void } = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  const row = sceneRegistry.get(id);
  const top = row?.readingY ?? element.getBoundingClientRect().top + window.scrollY;
  const complete = () => {
    element.querySelector<HTMLElement>('h1,h2')?.focus({ preventScroll: true });
    opts.onComplete?.();
  };
  if (opts.lenis) opts.lenis.scrollTo(top, { immediate: opts.immediate, duration: .65, onComplete: complete });
  else { window.scrollTo({ top, behavior: 'instant' }); complete(); }
}

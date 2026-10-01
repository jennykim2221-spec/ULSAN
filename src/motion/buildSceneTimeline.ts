import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SceneConfig } from '@/data/types';
import { introMotion } from '@/components/scenes/introMotion';
import { endingMotion } from '@/components/scenes/endingMotion';
import { historyMotion, industryMotion } from '@/components/archive/archiveMotion';
import { sceneTransitions } from './sceneTransitions';
import { deadRiverMotion, recoveryMotion, gardenMotion } from '@/components/scenes/phase4Motion';
import { whaleMotion, jangsaengpoMotion, seaMotion } from '@/components/scenes/phase5Motion';
import { upperStreamMotion } from '@/components/scenes/upperStreamMotion';
import { exploreMotion } from '@/components/explore/exploreMotion';

export type SceneTimelineHandle = { root: HTMLElement; trigger: ScrollTrigger; pinned: boolean; context: gsap.Context; kill: () => void };

/** One scoped timeline per scene. The stage itself is never animated. */
export function buildSceneTimeline(config: SceneConfig, root: HTMLElement, enablePin: boolean): SceneTimelineHandle {
  const stage = root.querySelector<HTMLElement>('[data-pin-stage]')!;
  const inner = root.querySelector<HTMLElement>('[data-scene-inner]')!;
  const pinned = enablePin && config.pin && inner.getBoundingClientRect().height <= window.innerHeight + 1;
  root.dataset.pinned = String(pinned);
  let trigger!: ScrollTrigger;
  let archive: ReturnType<typeof industryMotion> | undefined;
  const context = gsap.context(() => {
    let timeline: gsap.core.Timeline | undefined;
    if (pinned && config.id === 'intro') timeline = introMotion(root);
    else if (pinned && config.id === 'history') timeline = historyMotion(root);
    else if (pinned && config.id === 'upper-stream') timeline = upperStreamMotion(root);
    else if (pinned && config.id === 'industry') { archive = industryMotion(root); timeline = archive.timeline; }
    else if (pinned && config.id === 'ending') timeline = endingMotion(root);
    else if (pinned && config.id === 'dead-river') timeline = deadRiverMotion(root);
    else if (pinned && config.id === 'recovery') timeline = recoveryMotion(root);
    else if (pinned && config.id === 'garden') timeline = gardenMotion(root);
    else if (pinned && config.id === 'whale') timeline = whaleMotion(root);
    else if (pinned && config.id === 'jangsaengpo') timeline = jangsaengpoMotion(root);
    else if (pinned && config.id === 'sea') timeline = seaMotion(root);
    else if (pinned && config.id === 'explore') timeline = exploreMotion(root);
    else if (enablePin && config.id !== 'explore') {
      const kind = sceneTransitions[config.id];
      const copy = root.querySelector('[data-scene-copy]');
      timeline = gsap.timeline({ defaults: { ease: 'none' } });
      // Copy accents vary by scene; photos stay contained and unscaled.
      if (kind === 'rise') timeline.fromTo(copy, { y: 16 }, { y: 0, duration: .1 }, 0);
      else if (kind === 'soft') timeline.fromTo(copy, { opacity: .72 }, { opacity: 1, duration: .1 }, 0);
      else if (kind === 'line') timeline.fromTo(root.querySelector('[data-chapter-label]'), { opacity: .5 }, { opacity: 1, duration: .1 }, 0);
      // Retain readable copy at seams, avoiding a blank viewport at p=0/1.
      timeline.to({}, { duration: 1 }, 0);
    }
    trigger = ScrollTrigger.create({
      id: `ulsan-${config.id}`, trigger: root,
      pin: pinned ? stage : false, pinSpacing: true,
      start: 'top top',
      end: pinned ? () => `+=${config.distance({ width: window.innerWidth, height: window.innerHeight }, archive?.overflow() ?? 0)}` : 'bottom top',
      animation: timeline, scrub: timeline ? (config.id === 'jangsaengpo' ? 1.1 : .6) : false,
      invalidateOnRefresh: true, anticipatePin: pinned ? 1 : 0,
      onRefreshInit: () => archive?.measure(),
      onRefresh: () => archive?.measure(),
    });
  }, root);
  return { root, trigger, pinned, context, kill: () => { context.revert(); archive?.cleanup(); delete root.dataset.pinned; } };
}

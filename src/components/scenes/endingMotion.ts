import gsap from 'gsap';
import { riverBirthMotion } from './riverBirthMotion';

export function endingMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const birth = riverBirthMotion(root).pause();
  const timeline = gsap.timeline({ defaults: { ease: 'none' } });
  // Reverse the same timeline, including its clipping, geometry and dot pulse.
  // Matching 1.6 master duration and 2.4H pin preserve Opening's scroll cadence.
  timeline.fromTo(birth, {progress: 1}, {progress: 0, duration: birth.duration()}, .40)
    .fromTo(q('[data-title-en], [data-body-en]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .12 }, .28)
    .to(q('[data-title-en], [data-body-en]'), { autoAlpha: 0, duration: .08 }, .54)
    .fromTo(q('[data-title-ko], [data-body-ko]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .12 }, .54)
    .fromTo(q('[data-ending-actions]'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .06 }, .94)
    .to({}, {duration: 1.6}, 0);
  return timeline;
}

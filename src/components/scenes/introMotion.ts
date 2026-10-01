import gsap from 'gsap';
import { riverBirthMotion } from './riverBirthMotion';

export function introMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const timeline = gsap.timeline({ defaults: { ease: 'none' } });
  timeline.add(riverBirthMotion(root), 0)
    .fromTo(q('[data-title-en]'), { autoAlpha: 0, y: 90, scale: .88, clipPath: 'inset(100% 0 0 0)' }, { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: .22, ease: 'power2.out' }, .6)
    .fromTo(q('[data-title-ko], [data-body-ko], [data-body-en]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .14 }, .78)
    .fromTo(q('[data-scene-stage="intro"]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .12 }, .86)
    .to(q('[data-river-layer]'), { opacity: .18, scale: 1.12, duration: .28 }, .6)
    .to(root, { backgroundColor: '#071a2b', duration: .12 }, .88)
    .fromTo(q('[data-intro-video]'), { opacity: 0, clipPath: 'ellipse(1% 45% at 50% 50%)', scale: 1.16 }, { opacity: 1, clipPath: 'ellipse(85% 80% at 50% 50%)', scale: 1, duration: .34 }, 1.06)
    .to(q('[data-river-layer]'), { scaleX: 7, opacity: 0, duration: .22 }, 1.06)
    .to(q('[data-scene-copy], [data-scene-stage="intro"]'), { opacity: 0, duration: .18 }, 1.12)
    .to({}, { duration: 1.6 }, 0);
  return timeline;
}

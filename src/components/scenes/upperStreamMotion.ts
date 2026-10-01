import gsap from 'gsap';
export function upperStreamMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap.timeline({ defaults: { ease: 'none' } })
    .fromTo(q('[data-upper-image]'), { scale: 1, y: 0 }, { scale: 1.12, y: -35, duration: .65 }, .1)
    .to(q('[data-scene-copy]'), { opacity: 0, y: -16, duration: .16 }, .52)
    .fromTo(q('[data-upper-next]'), { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: .16 }, .68)
    .to({}, { duration: 1 }, 0);
}

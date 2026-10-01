import gsap from 'gsap';

export function exploreMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap.timeline({defaults: {ease: 'sine.inOut'}})
    .fromTo(q('[data-title-en]'), {opacity: .25, y: 22}, {opacity: 1, y: 0, duration: .22}, 0)
    .fromTo(q('.explore-planes'), {clipPath: 'inset(18% 32% 22% 32%)', opacity: .3}, {clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: .3}, 0)
    .to({}, {duration: 1}, 0);
}

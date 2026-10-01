import gsap from 'gsap';

/** Opening's original DOT → RIVER, also sampled backwards by Ending. */
export function riverBirthMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap.timeline({defaults: {ease: 'none'}})
    .fromTo(q('[data-river-drop]'), {scale: 1, opacity: 1, transformOrigin: 'center'}, {scale: 1.22, duration: .06, ease: 'sine.inOut'}, 0)
    .to(q('[data-river-drop]'), {scale: 1, duration: .06, ease: 'sine.inOut'}, .06)
    .to(q('[data-river-drop]'), {scale: 1.8, opacity: 0, duration: .16}, .12)
    .fromTo(q('[data-river-path]'), {strokeDasharray: 'none', clipPath: 'inset(0 0 100% 0)', scaleX: 3, scaleY: .01, svgOrigin: '60 300'},
      {strokeDasharray: 'none', clipPath: 'inset(0 0 0% 0)', scaleX: 3, scaleY: 1, svgOrigin: '60 300', duration: .4, ease: 'power2.inOut'}, .18);
}

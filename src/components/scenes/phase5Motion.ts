import gsap from 'gsap';

/** Phase 5 timelines join the single scroll runtime; no extra ticker/RAF. */
export function whaleMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.fromTo(q('[data-scene-copy]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .1 }, 0)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function jangsaengpoMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  // ENTER .00–.30 / OBSERVE .30–.70 / DEPTH HANDOFF .70–1.00.
  tl.fromTo(q('[data-asset-id="jangsaengpo-1"]'), {scale: 1.08, clipPath: 'inset(5% 10% 5% 10% round 3%)'},
      {scale: 1.02, clipPath: 'inset(0% 0% 0% 0% round 0%)', duration: .30, ease: 'sine.inOut'}, 0)
    .fromTo(q('[data-scene-inner]'), { '--port-opening': '0%' }, { '--port-opening': '150%', duration: .28, ease: 'sine.inOut' }, .72)
    .to(q('[data-asset-id="jangsaengpo-1"]'), { scale: 1, filter: 'brightness(.45)', duration: .30, ease: 'sine.inOut' }, .70)
    .to(q('[data-jang-title], [data-scene-copy]'), { opacity: 0, y: -12, duration: .19 }, .70)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function seaMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  // Port is already visible behind the preceding mask. Do not reset its entrance.
  tl.fromTo(q('[data-port-image="port-1"]'), {scale: 1.04}, { scale: 1.015, duration: .68, ease: 'sine.inOut' }, 0)
    .fromTo(q('[data-port-image="port-2"]'), { clipPath: 'inset(0 50% 0 50%)', opacity: 0, y: 18 }, { clipPath: 'inset(0 0% 0 0%)', opacity: .82, y: 0, duration: .18 }, .18)
    .fromTo(q('[data-port-image="port-3"]'), { clipPath: 'inset(0 50% 0 50%)', opacity: 0, y: 24 }, { clipPath: 'inset(0 0% 0 0%)', opacity: .88, y: 0, duration: .18 }, .36)
    .fromTo(q('[data-port-title]'), { opacity: .65, y: 0 }, { opacity: 1, duration: .16 }, .04)
    .fromTo(q('[data-sea-river]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .3 }, .48)
    .to(q('[data-port-structure]'), { opacity: 0, scale: .94, y: -20, duration: .14, ease: 'sine.inOut' }, .66)
    .to(q('[data-port-title], [data-scene-copy]'), {opacity: 0, duration: .16}, .70)
    .to(q('[data-port-image="port-1"]'), {scale: 1, filter: 'brightness(.2)', clipPath: 'inset(44% 0% 44% 0% round 35%)', duration: .29, ease: 'sine.inOut'}, .70)
    .to(q('[data-port-image="port-1"]'), {opacity: 0, duration: .13, ease: 'sine.inOut'}, .86)
    .to(q('[data-sea-river]'), {opacity: 0, duration: .14}, .84)
    .fromTo(q('[data-sea-title]'), { opacity: 0, letterSpacing: '.15em' }, { opacity: 1, letterSpacing: '.04em', duration: .12 }, .88)
    .to({}, { duration: 1 }, 0);
  return tl;
}

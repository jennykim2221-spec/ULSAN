import gsap from 'gsap';

/** Phase 5 timelines join the single scroll runtime; no extra ticker/RAF. */
export function whaleMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.fromTo(q('[data-scene-copy]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .1 }, 0)
    .to(q('[data-scene-copy]'), { opacity: 0, duration: .12 }, .23)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function jangsaengpoMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  // A central river opening removes the whole composition together.
  tl.fromTo(q('[data-scene-inner]'), { '--port-opening': '0%' }, { '--port-opening': '150%', duration: .36, ease: 'sine.inOut' }, .62)
    .to(q('[data-asset-id="jangsaengpo-1"]'), { scale: 1.035, filter: 'brightness(.55)', duration: .36, ease: 'sine.inOut' }, .60)
    .to(q('[data-jang-title], [data-scene-copy]'), { opacity: 0, y: -12, duration: .2 }, .60)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function seaMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  // Port is already visible behind the preceding mask. Do not reset its entrance.
  tl.to(q('[data-port-image="port-1"]'), { scale: .985, duration: .45, ease: 'sine.inOut' }, 0)
    .fromTo(q('[data-port-structure]'), { clipPath: 'inset(0 50% 0 50%)', opacity: 0 }, { clipPath: 'inset(0 0% 0 0%)', opacity: .82, duration: .2 }, .36)
    .fromTo(q('[data-port-title]'), { opacity: .65, y: 0 }, { opacity: 1, duration: .16 }, .04)
    .fromTo(q('[data-sea-river]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .3 }, .48)
    .to(q('[data-port-image="port-1"]'), { scale: .88, y: -18, filter: 'brightness(.2)', clipPath: 'inset(42% 0% 42% 0% round 30%)', opacity: 0, duration: .40, ease: 'sine.inOut' }, .54)
    .to(q('[data-port-structure], [data-port-title], [data-sea-river]'), { opacity: 0, duration: .18 }, .78)
    .to(q('[data-scene-copy]'), { opacity: 0, duration: .1 }, .84)
    .fromTo(q('[data-sea-title]'), { opacity: 0, letterSpacing: '.15em' }, { opacity: 1, letterSpacing: '.04em', duration: .12 }, .84)
    .to({}, { duration: 1 }, 0);
  return tl;
}

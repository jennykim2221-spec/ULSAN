import gsap from 'gsap';

// These timelines belong to the existing scene context/trigger. No extra RAF,
// scroll listener, React state, or independently pinned child is introduced.
export function deadRiverMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  tl.fromTo(q('[data-scene-copy]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .16 }, 0)
    .fromTo(q('[data-dead-archive]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .22 }, .06)
    .to(q('[data-dead-grain]'), { opacity: .12, duration: .28 }, .1)
    .to(q('[data-scene-copy]'), { opacity: 0, duration: .12 }, .34)
    .to(q('[data-dead-archive]'), { opacity: .35, scale: 1.06, duration: .35 }, .34)
    .fromTo(q('[data-bod-fact]'), { opacity: 0 }, { opacity: 1, duration: .12 }, .43)
    .fromTo(q('[data-bod-value]'), { scale: .94 }, { scale: 1, duration: .28, ease: 'power1.inOut' }, .46)
    .to(q('[data-bod-fact]'), { opacity: 0, y: 64, duration: .15 }, .74)

    .to(q('[data-dead-grain]'), { opacity: 0, duration: .12 }, .88)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function recoveryMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const nodes = q('[data-recovery-milestone]');
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  gsap.set(nodes, { opacity: 0, y: 24 });
  tl.fromTo(q('[data-scene-copy]'), { opacity: 1 }, { opacity: 0, duration: .08 }, .13)
    .fromTo(q('[data-pin-stage]'), { backgroundColor: '#050607' }, { backgroundColor: '#071a2b', duration: .4 }, .38);
  nodes.forEach((node, i) => {
    const at = .06 + i * .14;
    tl.to(node, { opacity: 1, y: 0, duration: .025 }, at);
    if (i < nodes.length - 1) tl.to(node, { opacity: 0, y: -24, duration: .025 }, at + .11);
  });
  tl.fromTo(q('[data-recovery-transition]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .07 }, .73)
    .to(q('[data-recovery-transition]'), { opacity: 0, duration: .04 }, .80)
    .fromTo(q('[data-recovery-image]'), { opacity: 0, clipPath: 'inset(48% 0 48% 0)', y: 12 }, { opacity: 1, clipPath: 'inset(0% 0 0% 0)', y: 0, duration: .1 }, .82)
    .to(q('[data-recovery-image], [data-recovery-milestone], [data-recovery-river]'), { opacity: 0, duration: .06 }, .94)
    .to({}, { duration: 1 }, 0);
  return tl;
}

export function gardenMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const frames = q('[data-garden-frame]');
  const tl = gsap.timeline({ defaults: { ease: 'none' } });
  gsap.set(frames, { opacity: 0 });
  tl.fromTo(q('[data-scene-copy]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .12 }, 0)
    .to(frames[0], { opacity: 1, duration: .04 }, .04)
    .fromTo(frames[0], { clipPath: 'inset(49% 0 49% 0)', y: 12 }, { clipPath: 'inset(0% 0 0% 0)', y: 0, duration: .2, ease: 'power2.inOut' }, .06)
    .to(q('[data-body-ko], [data-body-en]'), { opacity: 0, duration: .06 }, .3)
    .to(frames[0], { opacity: 0, y: -12, duration: .05 }, .34)
    .fromTo(frames[1], { opacity: 0, clipPath: 'inset(0 48% 0 48%)', y: 12 }, { opacity: 1, clipPath: 'inset(0 0% 0 0%)', y: 0, duration: .12 }, .36)
    .fromTo(q('[data-garden-fact]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .08 }, .4)
    .to(frames[1], { opacity: 0, scale: .97, y: -8, duration: .23, ease: 'sine.inOut' }, .54)
    .to(q('[data-garden-fact], [data-scene-copy]'), { opacity: 0, duration: .18 }, .54)
    .fromTo(q('[data-bamboo-shadow]'), { opacity: 0, scaleX: .6 }, { opacity: .72, scaleX: 1, duration: .22, ease: 'sine.inOut' }, .52)
    .fromTo(frames[2], { opacity: 0, scale: .97, y: 12, clipPath: 'inset(0% 48% 0% 48%)' }, { opacity: 1, scale: 1, y: -4, clipPath: 'inset(0% 0% 0% 0%)', duration: .34, ease: 'sine.inOut' }, .55)
    .fromTo(q('[data-depth-layer="front"]'), { '--scroll-y': '24px' }, { '--scroll-y': '0px', duration: .34 }, .55)
    .fromTo(q('[data-depth-layer="middle"]'), { '--scroll-y': '12px' }, { '--scroll-y': '0px', duration: .34 }, .55)
    .fromTo(q('[data-depth-layer="back"]'), { '--scroll-y': '4px' }, { '--scroll-y': '0px', duration: .34 }, .55)
    .to(q('[data-bamboo-shadow]'), { opacity: .18, duration: .17 }, .77)
    .fromTo(q('[data-bamboo-title]'), { opacity: 0, y: 20 }, { opacity: 1, y: -12, duration: .2 }, .72)
    .to(q('[data-bamboo-title]'), { opacity: 0, duration: .05 }, .94)
    .to({}, { duration: 1 }, 0);
  return tl;
}

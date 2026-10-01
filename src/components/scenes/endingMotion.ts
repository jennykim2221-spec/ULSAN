import gsap from 'gsap';

export function endingMotion(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const path = root.querySelector<SVGPathElement>('[data-river-path]')!;
  root.querySelectorAll<SVGGElement>('[data-ending-node]').forEach((node, i) => {
    const point = path.getPointAtLength(path.getTotalLength() * i / 6);
    gsap.set(node, { x: point.x - 60, y: point.y - (8 + i * 584 / 6) });
  });
  const timeline = gsap.timeline({ defaults: { ease: 'none' } });
  timeline.fromTo(q('[data-river-path]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .28 }, 0)
    .fromTo(q('[data-title-en], [data-body-en]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .12 }, .28)
    .to(q('[data-title-en], [data-body-en]'), { autoAlpha: 0, duration: .08 }, .54)
    .fromTo(q('[data-title-ko], [data-body-ko]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .12 }, .54)
    .to(q('[data-river-path], [data-ending-node]'), { scale: .01, opacity: 0, transformOrigin: '50% 50%', duration: .14 }, .8)
    .to(q('[data-ending-drop]'), { opacity: 1, duration: .08 }, .86)
    .fromTo(q('[data-ending-actions]'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .06 }, .94);
  return timeline;
}

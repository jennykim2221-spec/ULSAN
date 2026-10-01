'use client';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RIVER_PATH_D } from '@/graphics/river-path';
import styles from './ContinuousRiver.module.css';

/** One path survives both pin boundaries: the data becomes the recovery river. */
export function ContinuousRiver({ enabled }: { enabled: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = host.current;
    const dead = document.getElementById('dead-river');
    const recovery = document.getElementById('recovery');
    const path = node?.querySelector('path');
    if (!enabled || !node || !dead || !recovery || !path) return;
    const position = (el: HTMLElement, p: number) => Number(el.dataset.scrollStart) + p * (Number(el.dataset.scrollEnd) - Number(el.dataset.scrollStart));
    const update = () => {
      const y = scrollY;
      const start = position(dead, .7), seam = position(dead, 1), end = position(recovery, .94);
      const p = y <= seam ? .18 * Math.max(0, (y - start) / (seam - start)) : .18 + .82 * Math.min(1, (y - seam) / (end - seam));
      node.hidden = y < start || y > end || !dead.dataset.scrollStart;
      path.style.strokeDashoffset = String(1 - p);
      node.style.opacity = String(Math.min(.65, Math.max(0, (y - start) / 160)) * Math.min(1, (end - y) / 100));
      node.style.color = y > position(recovery, .42) ? '#8ed8c6' : '#f2f3f0';
    };
    const trigger = ScrollTrigger.create({ trigger: dead, start: () => position(dead, .7), end: () => position(recovery, .94), onUpdate: update, onRefresh: update });
    const measured = () => { trigger.refresh(); update(); };
    window.addEventListener('ulsan:measured', measured);
    update();
    return () => { window.removeEventListener('ulsan:measured', measured); trigger.kill(); node.hidden = true; };
  }, [enabled]);
  return <div ref={host} className={styles.river} hidden aria-hidden="true" data-continuous-river><svg viewBox="0 0 120 600" preserveAspectRatio="none"><path d={RIVER_PATH_D} pathLength="1" fill="none" stroke="currentColor" strokeWidth=".65" strokeDasharray="1" strokeDashoffset="1" /></svg></div>;
}

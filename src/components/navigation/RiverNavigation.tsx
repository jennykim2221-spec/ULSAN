'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { riverNavDestinations, riverNavLabels } from '@/data/scenes';
import { copyBySceneId } from '@/data/copy';
import type { SceneId } from '@/data/types';
import { RIVER_PATH_D } from '@/graphics/river-path';
import { sceneRegistry } from '@/motion/sceneRegistry';
import styles from './RiverNavigation.module.css';

gsap.registerPlugin(MotionPathPlugin);

export function RiverNavigation({ active, ready, decorative }: { active: SceneId; ready: boolean; decorative: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (!ready || !svg.current) return;
    const node = svg.current;
    const path = node.querySelector<SVGPathElement>('[data-nav-fill]')!;
    const dot = node.querySelector('[data-nav-dot]')!;
    node.querySelectorAll<SVGCircleElement>('[data-nav-node]').forEach((circle, i) => {
      const point = path.getPointAtLength(path.getTotalLength() * i / 11);
      circle.setAttribute('cx', String(point.x));
      circle.setAttribute('cy', String(point.y));
    });
    const context = gsap.context(() => {
      const motion = gsap.to(dot, { motionPath: { path: RIVER_PATH_D }, duration: 1, ease: 'none', paused: true });
      const update = () => {
        const rows = riverNavDestinations.map(id => sceneRegistry.get(id)).filter(row => !!row);
        if (rows.length !== 12) return;
        const y = window.scrollY;
        let t = 0;
        for (let i = 0; i < rows.length; i++) {
          if (y < rows[i].readingY) break;
          const next = rows[i + 1];
          t = next ? (i + Math.min(1, Math.max(0, (y - rows[i].readingY) / Math.max(1, next.readingY - rows[i].readingY)))) / 11 : 1;
        }
        path.style.strokeDashoffset = String(1 - t);
        motion.progress(t);
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('ulsan:measured', update);
      return () => { window.removeEventListener('scroll', update); window.removeEventListener('ulsan:measured', update); };
    }, node);
    return () => context.revert();
  }, [ready]);

  const links = riverNavDestinations.map((id, i) => <a key={id} href={`#${id}`} data-index={String(i + 1).padStart(2, '0')}
    aria-current={active === id ? 'location' : undefined}
    aria-label={`${copyBySceneId[id].title.ko} 장면으로 이동`}
    onClick={() => { if (menu.current) menu.current.open = false; }}>
    <span lang="en">{String(i + 1).padStart(2, '0')} {riverNavLabels[id]}</span>
  </a>);

  return <>
    <nav className={styles.chapters} aria-label="장면 이동">
      <details ref={menu} onKeyDown={event => {
        if (event.key === 'Escape') { menu.current!.open = false; menu.current!.querySelector('summary')?.focus(); }
      }}>
        <summary aria-label="장면 이동"><span lang="en">CHAPTERS</span><span aria-hidden="true"> + ↗</span></summary>
        <div className={styles.list}>{links}</div>
      </details>
    </nav>
    <div className={styles.river} data-river-navigation data-active={active} aria-hidden="true" hidden={!decorative}>
      <svg ref={svg} viewBox="0 0 120 600" focusable="false">
        <path d={RIVER_PATH_D} fill="none" stroke="currentColor" opacity=".3" />
        <path data-nav-fill d={RIVER_PATH_D} pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1" strokeDashoffset="1" />
        <circle data-nav-dot r="5" fill="currentColor" />
        {riverNavDestinations.map(id => <circle key={id} data-nav-node r="2" fill="currentColor" />)}
      </svg>
    </div>
    <nav className={styles.rail} aria-label="강 장면 목록" data-active={active} hidden={!decorative}>{links}</nav>
  </>;
}

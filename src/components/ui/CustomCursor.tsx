'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export function CustomCursor({ enabled }: { enabled: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = cursor.current;
    const story = document.getElementById('__ulsan-story');
    if (!enabled || !layer || !story || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const events = new AbortController();
    const hide = () => { layer.hidden = true; delete story.dataset.customCursor; };
    const context = gsap.context(() => {
      const x = gsap.quickTo(layer, 'x', { duration: .1, ease: 'power2.out' });
      const y = gsap.quickTo(layer, 'y', { duration: .1, ease: 'power2.out' });
      story.addEventListener('pointermove', event => {
        const target = event.target as HTMLElement;
        if (target.closest('input,textarea,select,iframe') || event.pointerType !== 'mouse') { hide(); return; }
        const mode = target.closest('[data-photo-link]') ? '+ MORE' : '';
        if (!mode) { hide(); return; }
        layer.hidden = false;
        layer.dataset.mode = mode.toLowerCase();
        const label = layer.querySelector('span');
        if (label) label.textContent = mode;
        const link = !!target.closest('a,button,summary') || !!mode;
        layer.dataset.link = String(link);
        x(event.clientX + 18); y(event.clientY + 20);
      }, { signal: events.signal });
    }, layer);
    story.addEventListener('pointerleave', hide, { signal: events.signal });
    window.addEventListener('blur', hide, { signal: events.signal });
    window.addEventListener('keydown', hide, { signal: events.signal });
    return () => { events.abort(); hide(); context.revert(); };
  }, [enabled]);
  return enabled ? <div ref={cursor} className={styles.cursor} hidden aria-hidden="true"><span lang="en">VIEW</span></div> : null;
}

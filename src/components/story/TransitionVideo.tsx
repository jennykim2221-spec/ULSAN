'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function TransitionVideo({ src, className }: { src: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const scene = el.closest('[data-scene]');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let nearby = false;
    const sync = () => {
      const revealed = nearby && !preference.matches && !document.hidden && Number(getComputedStyle(el.parentElement!).opacity) > .02;
      if (nearby && revealed && !preference.matches && !document.hidden) {
        if (!el.src) { el.src = src; el.load(); }
        if (el.paused) void el.play().catch(() => { /* Reading layout remains available if autoplay is unavailable. */ });
      } else el.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { nearby = entry.isIntersecting; sync(); }, { rootMargin: '80px 0px' });
    if (scene) observer.observe(scene);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    gsap.ticker.add(sync);
    return () => { gsap.ticker.remove(sync); observer.disconnect(); document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', sync); el.pause(); el.removeAttribute('src'); el.load(); };
  }, [src]);
  return <video ref={video} className={className} muted playsInline loop preload="none" aria-hidden="true" tabIndex={-1} data-transition-video />;
}

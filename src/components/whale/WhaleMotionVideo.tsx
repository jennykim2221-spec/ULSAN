'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhaleMotionVideo.module.css';

const source = `/assets/video/${encodeURIComponent('고래.mp4')}`;
const clamp = (p: number) => Math.min(1, Math.max(0, p));
const smooth = (p: number) => { const t = clamp(p); return t * t * (3 - 2 * t); };

/** Native playback owns the subject. The master only wipes the stable ocean layer. */
export function WhaleMotionVideo({ enabled }: { enabled: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [readingHost, setReadingHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => { if (!cancelled) setReadingHost(enabled ? null : document.querySelector<HTMLElement>('[data-whale-media-slot]')); });
    return () => { cancelled = true; };
  }, [enabled]);

  useEffect(() => {
    const layer = host.current, media = video.current;
    const whale = document.getElementById('whale'), jang = document.getElementById('jangsaengpo');
    const next = document.getElementById('sea');
    const nextStage = next?.querySelector<HTMLElement>('[data-pin-stage]');
    const nextInner = next?.querySelector<HTMLElement>('[data-scene-inner]');
    if (!layer || !media || !whale || !jang || !next || !nextStage || !nextInner) return;
    media.defaultPlaybackRate = .8;
    media.playbackRate = .8;
    if (!enabled) { layer.hidden = !readingHost; return; }
    if (readingHost) return;

    let active = false, playing = false, disposed = false;
    let closePass = false, passGate = 0;
    const load = () => { if (!media.getAttribute('src')) { media.src = source; media.load(); } };
    const play = () => {
      if (!active || document.hidden || playing) return;
      playing = true;
      void media.play().catch(() => { playing = false; });
    };
    // One initial cue skips the empty source opening. Never seek on scroll.
    const cue = () => { media.playbackRate = .8; media.currentTime = 1.7; };
    const ready = () => { media.dataset.frameReady = 'true'; play(); };
    media.addEventListener('loadedmetadata', cue, { once: true });
    media.addEventListener('loadeddata', ready);
    const proximity = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) load(); }, { rootMargin: '100% 0px' });
    proximity.observe(whale);
    gsap.registerPlugin(ScrollTrigger);
    const position = (el: HTMLElement, p: number) => Number(el.dataset.scrollStart) + p * (Number(el.dataset.scrollEnd) - Number(el.dataset.scrollStart));
    const state = { reveal: 0 };
    const update = () => {
      if (disposed || !whale.dataset.scrollStart) return;
      const start = position(whale, 0), end = position(jang, .38);
      // The source's broad rightward close pass begins around 6.1 seconds.
      // A quick chapter skip can complete the wipe without waiting for video frames.
      if (media.currentTime >= 5.8 || state.reveal > .85) closePass = true;
      if (closePass) passGate = Math.min(1, passGate + gsap.ticker.deltaRatio(60) / 48);
      const reveal = clamp(state.reveal) * smooth(passGate);
      const visible = scrollY >= start - 1 && scrollY < end + innerHeight * .3 && reveal < .9999;
      layer.hidden = !visible;
      layer.style.opacity = String(smooth((scrollY - start) / Math.max(1, position(whale, .16) - start)));
      layer.style.clipPath = `inset(0 0 0 ${reveal * 100}%)`;
      layer.dataset.reveal = reveal.toFixed(5);
      active = visible;
      if (active && !document.hidden) { load(); play(); }
      else if (!media.paused || playing) { media.pause(); playing = false; }
      jang.style.setProperty('--whale-title-reveal', smooth((reveal - .86) / .14).toFixed(5));
      jang.style.setProperty('--whale-copy-reveal', smooth((reveal - .94) / .06).toFixed(5));

      // Lift the actual next composition behind Jangsaengpo; no cloned media/content.
      const underlay = scrollY >= position(jang, .60) && scrollY < position(next, 0);
      next.toggleAttribute('data-jang-underlay', underlay);
      if (underlay) nextInner.style.translate = `0 ${-nextStage.getBoundingClientRect().top}px`;
      else nextInner.style.removeProperty('translate');
    };
    const timeline = gsap.timeline().to(state, { reveal: 1, duration: 1, ease: 'power1.inOut' });
    const trigger = ScrollTrigger.create({ id: 'ulsan-whale-video-master', trigger: whale, start: () => position(jang, 0), end: () => position(jang, .38), animation: timeline, scrub: 1.1, onRefresh: update });
    const measured = () => { trigger.refresh(); update(); };
    const visibility = () => { if (document.hidden) { media.pause(); playing = false; } update(); };
    gsap.ticker.add(update);
    window.addEventListener('ulsan:measured', measured);
    document.addEventListener('visibilitychange', visibility);
    update();
    return () => {
      disposed = true;
      gsap.ticker.remove(update);
      window.removeEventListener('ulsan:measured', measured);
      document.removeEventListener('visibilitychange', visibility);
      proximity.disconnect(); trigger.kill(); timeline.kill();
      media.removeEventListener('loadedmetadata', cue); media.removeEventListener('loadeddata', ready);
      media.pause(); media.removeAttribute('src'); media.load();
      nextInner.style.removeProperty('translate');
      next.removeAttribute('data-jang-underlay'); next.removeAttribute('data-jang-handoff');
      jang.style.removeProperty('--whale-title-reveal'); jang.style.removeProperty('--whale-copy-reveal');
    };
  }, [enabled, readingHost]);
  const subject = <div ref={host} className={readingHost ? styles.reading : styles.layer} data-whale-video hidden aria-hidden="true"><div className={styles.subject}><video ref={video} poster="/assets/video/whale-poster.png" muted loop playsInline preload="none" tabIndex={-1} data-whale-motion-video /></div></div>;
  return readingHost ? createPortal(subject, readingHost) : <div className={styles.viewport} data-whale-viewport aria-hidden="true">{subject}</div>;
}

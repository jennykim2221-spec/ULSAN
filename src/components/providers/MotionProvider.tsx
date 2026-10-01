'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SceneId } from '@/data/types';
import type { MotionProfileId } from '@/motion/motionProfiles';
import { createScrollRuntime, type ScrollRuntime } from '@/motion/createScrollRuntime';
import { LoadingOverlay } from '../ui/LoadingOverlay';
import { CustomCursor } from '../ui/CustomCursor';
import { ContinuousRiver } from '../story/ContinuousRiver';
import { ChapterIndicator } from '../navigation/ChapterIndicator';
import { RiverNavigation } from '../navigation/RiverNavigation';
import dynamic from 'next/dynamic';
import { WhaleMotionVideo } from '../whale/WhaleMotionVideo';
const GlobalRipple = dynamic(() => import('../ui/image-ripple-effect').then(m => m.GlobalRipple), { ssr: false });

/** Client engine boundary; all scene content remains server-rendered children. */
export function MotionProvider({ children }: { children: ReactNode }) {
  const runtime = useRef<ScrollRuntime | null>(null);
  const continueLoading = useRef<() => void>(() => undefined);
  const [loading, setLoading] = useState<{ completed: number; canContinue: boolean; fading: boolean } | null>(null);
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<MotionProfileId>('reduced');

  const [active, setActive] = useState<SceneId>('intro');

  useEffect(() => {
    const root = document.getElementById('__ulsan-story')!;
    let cancelled = false;
    let finished = false;
    let slowTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    const previousOverflow = document.documentElement.style.overflow;
    const previousInert = root.inert;
    let locked = false;
    const unlock = () => {
      if (!locked) return;
      document.documentElement.style.overflow = previousOverflow;
      root.inert = previousInert;
      locked = false;
    };
    const savedReduced = false; // System preference is handled by the existing scroll runtime.
    const finish = (fallback: boolean) => {
      if (cancelled || finished) return;
      finished = true;
      clearTimeout(slowTimer);
      unlock();
      try {
        runtime.current = createScrollRuntime(root, { reduced: savedReduced || fallback, onScene: setActive, onProfile: setProfile });

        setReady(true);
      } catch (error) {
        // Runtime tears down its own resources before returning to readable SSR DOM.
        console.error('ULSAN scroll initialization failed; reading layout remains available.', error);
      }
      setLoading(previous => previous ? { ...previous, fading: true } : null);
      fadeTimer = setTimeout(() => { if (!cancelled) setLoading(null); }, 300);
    };
    continueLoading.current = () => finish(true);
    void (async () => {
      await Promise.resolve(); // Defer state publication beyond the effect setup/StrictMode cleanup.
      if (cancelled) return;

      const showLoading = !location.hash && window.scrollY < 2;
      if (showLoading) {
        root.inert = true;
        document.documentElement.style.overflow = 'hidden';
        locked = true;
        setLoading({ completed: 0, canContinue: false, fading: false });
      }
      // Deep links also need an escape if a critical request never settles.
      slowTimer = setTimeout(() => {
        if (!cancelled && !finished) {
          if (showLoading) setLoading(previous => previous ? { ...previous, canContinue: true } : previous);
          else finish(true);
        }
      }, 5000);
      const critical = root.querySelector<HTMLImageElement>('[data-load-tier="critical"] img');
      const tasks = [document.fonts.ready, Promise.resolve(root.querySelector('[data-river-path]')), critical?.decode() ?? Promise.resolve()];
      const results = await Promise.allSettled(tasks.map(task => Promise.resolve(task).finally(() => {
        if (!cancelled && !finished) setLoading(previous => previous ? { ...previous, completed: previous.completed + 1 } : previous);
      })));
      if (!cancelled) finish(results.some(result => result.status === 'rejected'));
    })();
    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
      clearTimeout(fadeTimer);
      unlock();
      continueLoading.current = () => undefined;
      runtime.current?.dispose();
      runtime.current = null;
    };
  }, []);

  return <>
    {children}
    {loading && <LoadingOverlay {...loading} onContinue={() => continueLoading.current()} />}
    <ContinuousRiver enabled={ready && profile === 'desktop'} />
    <WhaleMotionVideo enabled={ready && profile === 'desktop'} />
    {ready && !loading && profile === 'desktop' && <GlobalRipple active={active} />}
    <ChapterIndicator active={active} ready={ready} />
    {!loading && <RiverNavigation active={active} ready={ready} decorative={ready && profile === 'desktop'} />}
    <CustomCursor enabled={ready && !loading && profile === 'desktop'} />
  </>;
}

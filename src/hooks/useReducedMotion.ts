'use client';

import { useEffect, useState } from 'react';

/** prefers-reduced-motion + optional user override (MotionToggle in Phase 2). */
export function useReducedMotion(userOverride = false): boolean {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefers(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return prefers || userOverride;
}

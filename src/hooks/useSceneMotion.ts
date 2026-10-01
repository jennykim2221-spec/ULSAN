'use client';

/**
 * Scene motion hook stub — Phase 2 attaches ScrollTrigger via gsap.context / useGSAP.
 */
import type { SceneId } from '@/data/types';
import { useEffect, useRef } from 'react';

export function useSceneMotion(sceneId: SceneId, enabled = false) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Phase 2: register ScrollTrigger for this scene
    void sceneId;
  }, [sceneId, enabled]);

  return { rootRef };
}

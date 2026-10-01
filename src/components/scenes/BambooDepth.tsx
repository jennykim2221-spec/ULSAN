'use client';

import type { PointerEvent, ReactNode } from 'react';
import styles from './GardenScene.module.css';

type BambooDepthProps = {
  src: string;
  children: ReactNode;
};

export function BambooDepth({ src, children }: BambooDepthProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.closest('.scroll-enhanced')) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));

    event.currentTarget.querySelectorAll<HTMLElement>('[data-depth-layer]').forEach((layer) => {
      const depth = layer.dataset.depthLayer;
      const scale = depth === 'front' ? 1 : depth === 'middle' ? 0.5 : 0.2;
      layer.style.setProperty('--return-duration', '0ms');
      layer.style.setProperty('--pointer-x', `${x * 10 * scale}px`);
      layer.style.setProperty('--pointer-y', `${y * 16 * scale}px`);
    });
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.querySelectorAll<HTMLElement>('[data-depth-layer]').forEach((layer) => {
      layer.style.setProperty('--return-duration', '250ms');
      layer.style.setProperty('--pointer-x', '0px');
      layer.style.setProperty('--pointer-y', '0px');
    });
  }

  return (
    <div
      className={styles.frame}
      data-garden-frame="garden-4"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <div className={styles.depthLayers} aria-hidden="true" data-bamboo-depth>
        <span
          className={styles.depthBack}
          style={{ backgroundImage: `url("${src}")` }}
          data-depth-layer="back"
        />
        <span
          className={styles.depthMiddle}
          style={{ backgroundImage: `url("${src}")` }}
          data-depth-layer="middle"
        />
        <span
          className={styles.depthFront}
          style={{ backgroundImage: `url("${src}")` }}
          data-depth-layer="front"
        />
      </div>
    </div>
  );
}

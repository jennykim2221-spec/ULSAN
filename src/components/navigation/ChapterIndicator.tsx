'use client';
import type { SceneId } from '@/data/types';
import { scenesById } from '@/data/scenes';
import styles from './ChapterIndicator.module.css';
export function ChapterIndicator({ active, ready }: { active: SceneId; ready: boolean }) {
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SCROLL_DEBUG !== '1' || !ready) return null;
  const scene = scenesById[active];
  return <output className={styles.indicator} data-chapter-indicator lang="en">DEV · {String(scene.order).padStart(2, '0')} / 14 · {scene.label}</output>;
}

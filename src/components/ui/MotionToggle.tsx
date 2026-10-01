'use client';
import { uiCopy } from '@/data/copy';
import styles from './ScrollControls.module.css';
export function MotionToggle({ reduced, onToggle }: { reduced: boolean; onToggle: () => void }) {
  const label = reduced ? uiCopy.enableMotion : uiCopy.reduceMotion;
  return <button className={styles.toggle} data-motion-toggle type="button" aria-pressed={reduced} onClick={onToggle}>{label.ko} / <span lang="en">{label.en}</span></button>;
}

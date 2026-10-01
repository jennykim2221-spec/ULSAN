'use client';
import { uiCopy } from '@/data/copy';
import styles from './ScrollControls.module.css';

export function LoadingOverlay({ completed, canContinue, fading, onContinue }: { completed: number; canContinue: boolean; fading: boolean; onContinue: () => void }) {
  return <div className={styles.loading} data-loading-overlay data-fading={fading}>
    <svg width="24" height="40" viewBox="0 0 24 40" aria-hidden="true"><path d="M12 2 C12 10 3 20 3 27 A9 9 0 0 0 21 27 C21 20 12 10 12 2Z" fill="none" stroke="currentColor" /></svg>
    <p role="status">물길을 준비하고 있습니다. <span lang="en">PREPARING THE JOURNEY.</span> {completed}/3</p>
    {canContinue && <button type="button" onClick={onContinue}>{uiCopy.continueViewing.ko} / <span lang="en">{uiCopy.continueViewing.en}</span></button>}
  </div>;
}

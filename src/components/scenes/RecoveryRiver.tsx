import { RIVER_PATH_D } from '@/graphics/river-path';
import styles from './Phase4.module.css';

/** The navigation's decorative river, never a measured water-quality chart. */
export function RecoveryRiver() {
  return <div hidden className={styles.river} data-recovery-river aria-hidden="true">
    <svg viewBox="0 0 120 600" preserveAspectRatio="none" focusable="false">
      <path data-recovery-path d={RIVER_PATH_D} pathLength="1" fill="none" stroke="currentColor" strokeWidth=".6" />
    </svg>
  </div>;
}

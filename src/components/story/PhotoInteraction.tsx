'use client';
import { type ReactNode } from 'react';
import styles from './PhotoInteraction.module.css';
export function PhotoInteraction({ href, label, children }: { src: string; href?: string; label: string; children: ReactNode }) {
  const visual = <div className={styles.visual} data-photo-interaction>
    {children}
    {href && <span className={styles.focusLabel} aria-hidden="true">+ MORE</span>}
  </div>;
  return href ? <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} + MORE, 새 탭`} data-photo-link>{visual}</a> : visual;
}

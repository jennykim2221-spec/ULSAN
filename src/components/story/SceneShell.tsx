import type { SceneId } from '@/data/types';
import type { ReactNode } from 'react';
import styles from './SceneShell.module.css';
import { RiverLine } from './RiverLine';

type SceneShellProps = {
  className?: string;
  id: SceneId;
  label: string;
  tokenKey: string;
  children: ReactNode;
  headingLevel?: 'h1' | 'h2';
  titleKo: string;
  titleEn: string;
  bodyKo?: string;
  bodyEn?: string;
};

/**
 * Static scene shell — pin/scrub wired in Phase 2.
 * Outer = natural flow; stage = full viewport-height reading surface.
 */
export function SceneShell({
  className,
  id,
  label,
  tokenKey,
  children,
  headingLevel = 'h2',
  titleKo,
  titleEn,
  bodyKo,
  bodyEn,
}: SceneShellProps) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={[styles.outer, className].filter(Boolean).join(' ')}
      data-scene={id}
      data-token={tokenKey}
      aria-labelledby={`${id}-heading`}
    >
      <div className={styles.stage} data-pin-stage>
        {(id === 'intro' || id === 'ending') && <RiverLine ending={id === 'ending'} />}
        <div className={styles.inner} data-scene-inner>
          <header data-scene-copy>
          <p data-chapter-label className={styles.label} lang="en">
            {label}
          </p>
          <Heading id={`${id}-heading`} tabIndex={-1} data-title-ko className={styles.titleKo}>
            {titleKo}
          </Heading>
          <p data-title-en className={styles.titleEn} lang="en">
            {titleEn}
          </p>
          {bodyKo ? <p data-body-ko className={styles.body}>{bodyKo}</p> : null}
          {bodyEn ? (
            <p data-body-en className={styles.bodyEn} lang="en">
              {bodyEn}
            </p>
          ) : null}
          </header>
          <div className={styles.content} data-scene-content>{children}</div>
        </div>
      </div>
    </section>
  );
}

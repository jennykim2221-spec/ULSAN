import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { recoveryMilestones, factsById } from '@/data/timeline';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './RecoveryScene.module.css';
import phase from './Phase4.module.css';
import { RecoveryRiver } from './RecoveryRiver';

export function RecoveryScene() {
  const copy = copyBySceneId.recovery;
  const closing = assetsById['taehwa-now-2'];
  const transition = assetsById['taehwa-now-3'];

  return (
    <SceneShell
      id="recovery"
      className={phase.scene}
      label="Recovery"
      tokenKey="recovery"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <RecoveryRiver />
        <ol className={styles.milestones}>
          {recoveryMilestones.map((m) => {
            const fact = factsById[m.factId];
            return (
              <li key={m.factId} data-recovery-milestone>
                <span className={styles.year}>{fact?.yearLabel}</span>
                <span className={styles.text}>{m.display.ko}</span>
                <span className={styles.textEn} lang="en">
                  {m.display.en}
                </span>
              </li>
            );
          })}
        </ol>
        <div className={styles.transition} data-recovery-transition>
          {transition ? <SceneImage asset={transition} cssWidth={640} /> : null}
        </div>
        <div className={styles.closing} data-recovery-image>{closing ? (
          <SceneImage asset={closing} cssWidth={640} />
        ) : null}</div>
        <div className={phase.actions}></div>
      </div>
    </SceneShell>
  );
}

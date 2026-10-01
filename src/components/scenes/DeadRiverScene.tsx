import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { BOD_1996_UNIT, BOD_1996_VALUE } from '@/data/timeline';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './DeadRiverScene.module.css';
import phase from './Phase4.module.css';
import { RecoveryRiver } from './RecoveryRiver';

export function DeadRiverScene() {
  const copy = copyBySceneId['dead-river'];
  const image = assetsById['past-taehwa-3'];

  return (
    <SceneShell
      id="dead-river"
      className={phase.scene}
      label="The dead river"
      tokenKey="deadRiver"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <div className={styles.archive} data-dead-archive>{image ? <SceneImage asset={image} cssWidth={570} /> : null}</div>
        <div className={styles.grain} data-dead-grain aria-hidden="true" />
        {/* Fact block is separate from the photograph — no date/source on image */}
        <div className={styles.fact} data-bod-fact aria-label="BOD 1996">
          <p className={styles.value} data-bod-value>{BOD_1996_VALUE}</p>
          <p className={styles.unit}>
            1996 · BOD {BOD_1996_VALUE} {BOD_1996_UNIT}
          </p>
          <p className={styles.explanation}>생화학적 산소요구량 <span lang="en">Biochemical Oxygen Demand</span><br />유기물을 분해하는 데 필요한 산소량.<br />수치가 높을수록 유기물 오염이 심합니다.</p>
        </div>
        <RecoveryRiver />
        <div className={phase.actions}></div>
      </div>
    </SceneShell>
  );
}

import { copyBySceneId, uiCopy } from '@/data/copy';
import { SceneShell } from '../story/SceneShell';
import styles from './EndingScene.module.css';

export function EndingScene() {
  const copy = copyBySceneId.ending;
  return <SceneShell id="ending" label="Ending" tokenKey="night"
    titleKo={copy.title.ko} titleEn={copy.title.en}
    bodyKo={copy.body.ko} bodyEn={copy.body.en}>
    <div className={styles.root} data-ending-actions>
      <a href="#intro">{uiCopy.replay.ko} / <span lang="en">{uiCopy.replay.en}</span></a>
      <a href="#explore">{uiCopy.exploreUlsan.ko} / <span lang="en">{uiCopy.exploreUlsan.en}</span></a>
    </div>
  </SceneShell>;
}

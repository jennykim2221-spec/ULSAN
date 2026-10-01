import { copyBySceneId } from '@/data/copy';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './IntroScene.module.css';
import { TransitionVideo } from '../story/TransitionVideo';

export function IntroScene() {
  const copy = copyBySceneId.intro;
  return (
    <SceneShell
      id="intro"
      label="ULSAN"
      tokenKey="intro"
      headingLevel="h1"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.water} data-intro-video><TransitionVideo src={`/assets/video/${encodeURIComponent('태화강 영상.mp4')}`} /></div>
      <div className={styles.root} data-scene-stage="intro">
        <a href="#source">이야기 시작 / <span lang="en">START THE JOURNEY</span></a>
        {/* Phase 2: droplet → river stroke → brand reveal */}
        <p className={styles.cue} lang="en">
          SCROLL TO EXPLORE
        </p>
        <p className={styles.cue}>스크롤하여 이동</p>
      </div>
    </SceneShell>
  );
}

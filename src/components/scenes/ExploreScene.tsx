import { copyBySceneId } from '@/data/copy';
import { ExploreCollection } from '@/components/explore/ExploreCollection';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './ExploreScene.module.css';

export function ExploreScene() {
  const copy = copyBySceneId.explore;

  return (
    <SceneShell
      id="explore"
      label="Explore Ulsan"
      tokenKey="recovery"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <ExploreCollection />
        <p className={styles.continue}>
          <a href="#night">밤의 울산으로</a>
          <span lang="en"> / CONTINUE TO NIGHT</span>
        </p>
      </div>
    </SceneShell>
  );
}

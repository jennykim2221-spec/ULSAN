import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './NightScene.module.css';

export function NightScene() {
  const copy = copyBySceneId.night;
  const image = assetsById['night-1'];

  return (
    <SceneShell
      id="night"
      label="Night"
      tokenKey="night"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        {image ? (
          <SceneImage asset={image} sizes="(max-width: 1840px) 92vw, 1840px" />
        ) : null}
      </div>
    </SceneShell>
  );
}

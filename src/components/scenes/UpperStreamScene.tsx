import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './UpperStreamScene.module.css';

export function UpperStreamScene() {
  const copy = copyBySceneId['upper-stream'];
  const image = assetsById['upper-stream-2'];

  return (
    <SceneShell
      id="upper-stream"
      label="Upper stream"
      tokenKey="upperStream"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        {image ? (
          <div data-upper-image><SceneImage asset={image} sizes="100vw" /></div>
        ) : null}
        <p className={styles.next} data-upper-next lang="en">OLD ULSAN</p>
      </div>
    </SceneShell>
  );
}

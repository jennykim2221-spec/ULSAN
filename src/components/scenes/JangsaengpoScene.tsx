import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './JangsaengpoScene.module.css';

export function JangsaengpoScene() {
  const copy = copyBySceneId.jangsaengpo;
  const image = assetsById['jangsaengpo-1'];
  // jangsaengpo-2 is reserve and not a real site photo — do not use here

  return (
    <SceneShell
      id="jangsaengpo"
      label="Jangsaengpo"
      tokenKey="whale"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <p className={styles.place} data-jang-title lang="en">JANGSAENGPO</p>
        {image ? (
          <SceneImage asset={image} sizes="100vw" />
        ) : null}
        <div className={styles.more}></div>
      </div>
    </SceneShell>
  );
}

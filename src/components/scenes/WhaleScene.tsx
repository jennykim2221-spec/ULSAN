import { copyBySceneId } from '@/data/copy';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './WhaleScene.module.css';

/** The actual video is the only whale subject, including the reading fallback. */
export function WhaleScene() {
  const copy = copyBySceneId.whale;

  return (
    <SceneShell
      id="whale"
      label="Whale"
      tokenKey="whale"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <div className={styles.media} data-whale-media-slot />
      </div>
    </SceneShell>
  );
}

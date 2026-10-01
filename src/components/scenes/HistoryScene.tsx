import { assetsById } from '@/data/assets';
import { copyBySceneId, historyCaptions } from '@/data/copy';
import { ArchiveCollage } from '@/components/archive/ArchiveCollage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './HistoryScene.module.css';

export function HistoryScene() {
  const copy = copyBySceneId.history;
  const frames = historyCaptions
    .map((c) => {
      const asset = assetsById[c.assetId];
      if (!asset || asset.status !== 'active') return null;
      return { asset, caption: c.caption };
    })
    .filter(Boolean);

  return (
    <SceneShell
      id="history"
      label="Old Ulsan"
      tokenKey="archive"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <ArchiveCollage
          frames={frames as NonNullable<(typeof frames)[number]>[]}
        />
      </div>
    </SceneShell>
  );
}

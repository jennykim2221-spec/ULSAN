import type { Asset, Localized } from '@/data/types';
import { SceneImage } from '../story/SceneImage';
import styles from './Archive.module.css';

export function ArchiveCollage({ frames }: { frames: { asset: Asset; caption: Localized }[] }) {
  return <ol className={styles.collage} data-collage>{frames.map(({ asset, caption }, index) =>
    <li key={asset.id} data-history-frame>
      <SceneImage asset={asset} />
      <p><span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>{caption.ko} / <span lang="en">{caption.en}</span></p>
    </li>,
  )}</ol>;
}

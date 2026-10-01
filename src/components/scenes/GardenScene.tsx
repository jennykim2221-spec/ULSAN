import { assetPublicUrl, assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import { BambooDepth } from './BambooDepth';
import styles from './GardenScene.module.css';
import phase from './Phase4.module.css';

export function GardenScene() {
  const copy = copyBySceneId.garden;
  const images = ['garden-1', 'garden-2', 'garden-4']
    .map((id) => assetsById[id])
    .filter((a) => a && a.status === 'active');

  return (
    <SceneShell
      id="garden"
      className={phase.scene}
      label="Green heart"
      tokenKey="garden"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <p className={styles.meta} data-garden-fact>
          <span>2019 / 대한민국 제2호</span> <strong>835,452<span>㎡</span></strong>
        </p>
        <span className={styles.shadow} data-bamboo-shadow aria-hidden="true" />
        <div className={styles.stack}>
          {images.map((asset) => (
            asset.id === 'garden-4' ? (
              <BambooDepth key={asset.id} src={assetPublicUrl(asset.filename)}>
                <SceneImage asset={asset} />
              </BambooDepth>
            ) : (
              <div key={asset.id} className={styles.frame} data-garden-frame={asset.id}>
                <SceneImage asset={asset} />
              </div>
            )
          ))}
        </div>
        <p className={styles.bamboo} data-bamboo-title>
          <span>십리대숲</span>
          <span lang="en">BAMBOO WALK</span>
        </p>
        <div className={phase.actions}>
          
        </div>
      </div>
    </SceneShell>
  );
}

import { assetsById } from '@/data/assets';
import { copyBySceneId } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './SeaScene.module.css';

export function SeaScene() {
  const copy = copyBySceneId.sea;
  const image = assetsById['port-1'];

  return (
    <SceneShell
      id="sea"
      label="Port / To the sea"
      tokenKey="whale"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        {image ? (
          <div className={styles.overview} data-port-image="port-1"><SceneImage asset={image} sizes="(max-width: 800px) 68vw, 800px" /></div>
        ) : null}
        {['port-2', 'port-3'].map((id) => {
          const detail = assetsById[id];
          return detail ? <div key={id} className={styles.structure} data-port-structure data-port-image={id}><SceneImage asset={detail} decorative /></div> : null;
        })}
        <p className={styles.portTitle} data-port-title lang="en">ULSAN PORT</p>
        <svg className={styles.river} data-sea-river viewBox="0 0 1000 700" aria-hidden="true"><path d="M103 0C185 122 812 72 730 252S233 390 422 520 810 590 1000 700" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1" strokeDashoffset="1" pathLength="1" /></svg>
        <p className={styles.toSea} data-sea-title lang="en">TO THE SEA</p>
      </div>
    </SceneShell>
  );
}

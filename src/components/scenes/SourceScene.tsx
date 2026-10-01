import { assetsById } from '@/data/assets';
import { copyBySceneId, sourceFactRow } from '@/data/copy';
import { SceneImage } from '@/components/story/SceneImage';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './SourceScene.module.css';

export function SourceScene() {
  const copy = copyBySceneId.source;
  const detail = assetsById['bangudae-2'];
  const place = assetsById['bangudae-3'];

  return (
    <SceneShell
      id="source"
      label="Bangucheon"
      tokenKey="source"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        {detail ? <SceneImage asset={detail} priority sizes="(max-width: 420px) 30vw, 420px" /> : null}
        {place ? <SceneImage asset={place} sizes="(max-width: 900px) 66vw, 900px" /> : null}
        <ul className={styles.facts}>
          {sourceFactRow.map((f) => (
            <li key={f.en}>
              <span>{f.ko}</span>
              <span lang="en"> / {f.en}</span>
            </li>
          ))}
        </ul>
        
      </div>
    </SceneShell>
  );
}

import { copyBySceneId } from '@/data/copy';
import { HorizontalArchive } from '@/components/archive/HorizontalArchive';
import { SceneShell } from '@/components/story/SceneShell';
import styles from './IndustryScene.module.css';

export function IndustryScene() {
  const copy = copyBySceneId.industry;
  return (
    <SceneShell
      id="industry"
      label="Industrialization"
      tokenKey="industry"
      titleKo={copy.title.ko}
      titleEn={copy.title.en}
      bodyKo={copy.body.ko}
      bodyEn={copy.body.en}
    >
      <div className={styles.root}>
        <HorizontalArchive />
        <div className={styles.actions}>
          <a href="#dead-river">산업 아카이브 건너뛰기 <span lang="en">/ SKIP ARCHIVE</span></a>
          
        </div>
      </div>
    </SceneShell>
  );
}

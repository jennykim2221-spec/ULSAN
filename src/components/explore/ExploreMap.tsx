import type { Place } from '@/data/types';
import { assetsById } from '@/data/assets';
import { SceneImage } from '../story/SceneImage';
import { MoreLink } from '../ui/MoreLink';
import styles from './ExploreMap.module.css';

// Native disclosure provides all place content without JS. Map/dialog arrive in Phase 6.
export function ExploreMap({ places }: { places: Place[] }) {
  return <div className={styles.places}>{places.map((place) =>
    <details key={place.id} id={`place-${place.id}`}>
      <summary>{place.name.ko} / <span lang="en">{place.name.en}</span></summary>
      <div className={styles.detail}>
        <dl>{(['location', 'type', 'description', 'highlight', 'visit'] as const).map((key) =>
          <div key={key}><dt lang="en">{key.toUpperCase()}</dt>
            <dd>{place[key].ko}<p lang="en">{place[key].en}</p></dd></div>,
        )}</dl>
        {place.assetIds.map((id) => <SceneImage key={id} asset={assetsById[id]} />)}
        <MoreLink sourceId={place.sourceId} accessibleNameKo={`${place.name.ko} 공식 정보 보기, 새 탭`} />
      </div>
    </details>,
  )}</div>;
}

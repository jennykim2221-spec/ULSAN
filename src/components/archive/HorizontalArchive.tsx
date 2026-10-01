import { assetsById } from '@/data/assets';
import { factsById } from '@/data/timeline';
import { SceneImage } from '../story/SceneImage';
import styles from './Archive.module.css';

const photo = (id: string, width?: number, decorative = false) => <SceneImage asset={assetsById[id]} cssWidth={width} decorative={decorative} />;
const label = (ko: string, en: string) => <h3>{ko}<span lang="en">{en}</span></h3>;

/** Semantic exhibition order is shared by pinned and natural reading layouts. */
export function HorizontalArchive() {
  const monument = factsById['tower-1967'];
  return <div data-horizontal-archive>
    <ol className={styles.track} data-archive-track>
      <li className={styles.begin} data-archive-item="begin">
        <p className={styles.year}>1962</p>
        <h3 lang="en">THE INDUSTRIAL<br />CITY BEGINS</h3>
        <p className={styles.meta}>1962.01.27 · 1962.06</p>
      </li>
      <li className={styles.labor} data-archive-item="labor">
        {photo('labor-1', 480)}{label('노동', 'LABOR')}
      </li>
      <li className={styles.construction} data-archive-item="construction">
        {label('건설', 'CONSTRUCTION')}{photo('factory-2', 480)}
      </li>
      <li className={styles.production} data-archive-item="production">
        {label('생산', 'PRODUCTION')}
        <div className={styles.productionImages}>{photo('labor-2', 340)}{photo('labor-3', 360)}</div>
      </li>
      <li className={styles.monument} data-archive-item="monument">
        {label('공업탑', 'INDUSTRIAL MONUMENT')}
        <div className={styles.dissolve} data-dissolve>
          <div className={styles.oldTower} data-tower-old>{photo('old-tower', 440)}<p lang="en">ARCHIVE</p></div>
          <div className={styles.newTower} data-tower-new>{photo('tower-now-2', 640)}<p lang="en">TIME DISSOLVE</p></div>
          <div className={styles.grain} data-archive-grain aria-hidden="true" />
        </div>
        <p className={styles.meta}>{monument.yearLabel} · {monument.text.ko}</p>
      </li>
      <li className={styles.expansion} data-archive-item="expansion">
        {photo('city-now-2', 500)}{label('도시 확장', 'CITY EXPANSION')}
      </li>
      <li className={styles.today} data-archive-item="today">
        <h3 lang="en" data-today-title>TODAY</h3>
        <div className={styles.todayImage} data-today-image>
          <div className={styles.todaySurface} data-today-surface>{photo('night-3', 1600)}
          <div className={styles.todayMono} data-today-mono aria-hidden="true">{photo('night-3', 1600, true)}</div><div className={styles.todayShade} data-today-shade aria-hidden="true" /></div>
        </div>
      </li>
    </ol>
    <div className={styles.exhibitionLine} aria-hidden="true"><span data-exhibition-line /></div>
  </div>;
}

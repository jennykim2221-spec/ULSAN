'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CollectionSurfer } from '@/components/ui/collection-surfer';
import { PhotoInteraction } from '@/components/story/PhotoInteraction';
import { assetPublicUrl, assetsById } from '@/data/assets';
import { placesById } from '@/data/places';
import { resolveSourceUrl } from '@/data/sources';
import type { PlaceId } from '@/data/types';
import styles from './ExploreCollection.module.css';

const order: PlaceId[] = ['daewangam', 'ganjeolgot', 'seongnamsa', 'ganwoljae', 'bangucheon', 'taehwa', 'jangsaengpo'];
const destinations = order.map(id => placesById[id]);
const items = destinations.map((place, id) => ({id, title: place.name.en, image: assetPublicUrl(assetsById[place.assetIds[0]].filename)}));

export function ExploreCollection() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const place = destinations[selected];
  const step = (delta: number) => setSelected(current => (current + delta + items.length) % items.length);
  return <div className={styles.collection} data-explore-collection data-destination={place.id}
    onKeyDown={e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.target instanceof HTMLAnchorElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1);}
      if (e.key === 'Home' || e.key === 'End') {e.preventDefault(); setSelected(e.key === 'Home' ? 0 : items.length - 1);}
    }}>
    <CollectionSurfer items={items} variant="centered" selectedIndex={selected} reducedMotion={!!reduced}
      renderItem={(item, current) => {
        const destination = destinations[item.id], asset = assetsById[destination.assetIds[0]];
        const image = <Image src={item.image} alt={current ? asset.alt.ko : ''} width={asset.width} height={asset.height}
          sizes="(max-width: 1280px) 38vw, 560px" unoptimized style={{maxWidth: asset.maxCssWidth}} />;
        return current ? <PhotoInteraction src={item.image} href={resolveSourceUrl(destination.sourceId).href} label={destination.name.ko}>{image}</PhotoInteraction>
          : <button type="button" className={styles.visual} tabIndex={-1} aria-label={`${destination.name.ko} 선택`} onClick={() => setSelected(item.id)}>{image}</button>;
      }}/>
    <motion.div className={styles.information} key={place.id} data-destination-info
      initial={{opacity: .25, y: reduced ? 0 : 8}} animate={{opacity: 1, y: 0}} transition={{duration: reduced ? .1 : .65, ease: [.22, 1, .36, 1]}}
      aria-live="polite" aria-atomic="true">
      <h3 lang="en">{place.name.en}</h3><p className={styles.name}>{place.name.ko}</p>
      <p>{place.description.ko}</p><p className={styles.english} lang="en">{place.description.en}</p>
      <p className={styles.location}><span>LOCATION</span> {place.location.ko}</p>
      <p className={styles.feature}>{place.highlight.ko}</p>
    </motion.div>
    <nav className={styles.navigation} aria-label="울산 장소 컬렉션">
      <button type="button" onClick={() => step(-1)} aria-label="이전 장소">←</button>
      {destinations.map((destination, i) => <button type="button" key={destination.id} aria-label={destination.name.ko}
        aria-current={selected === i ? 'true' : undefined} onClick={() => setSelected(i)}>{String(i + 1).padStart(2, '0')}</button>)}
      <button type="button" onClick={() => step(1)} aria-label="다음 장소">→</button>
    </nav>
  </div>;
}

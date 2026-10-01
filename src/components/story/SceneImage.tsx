import type { Asset } from '@/data/types';
import { assetPublicUrl } from '@/data/assets';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import styles from './SceneImage.module.css';
import { PhotoInteraction } from './PhotoInteraction';
import { resolveSourceUrl } from '@/data/sources';

type SceneImageProps = {
  asset: Asset;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Decorative duplicate — empty alt */
  decorative?: boolean;
  cssWidth?: number;
};

/**
 * Contained scene image — never forces cover unless allowCover is approved.
 * CSS width capped at min(layout, original width, maxCssWidth).
 */
export function SceneImage({
  asset,
  priority = false,
  sizes,
  className,
  decorative = false,
  cssWidth,
}: SceneImageProps) {
  if (asset.status !== 'active') {
    return null;
  }

  const widthCap = Math.min(asset.width, asset.maxCssWidth, cssWidth ?? asset.maxCssWidth);
  const alt = decorative ? '' : asset.alt.ko;
  const src = assetPublicUrl(asset.filename);
  const sourceId = asset.id.startsWith('bangudae-') ? 'S01'
    : asset.id.startsWith('garden-') ? 'S06'
    : asset.id === 'jangsaengpo-1' ? 'S07'
    : asset.id.startsWith('taehwa-now-') || asset.id === 'past-taehwa-3' ? 'S04'
    : asset.id.startsWith('factory-') || asset.id.startsWith('labor-') ? 'S03' : undefined;

  return (
    <figure
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={{
        width: `min(100%, ${widthCap}px)`,
        '--image-width': `${widthCap}px`,
        '--image-ratio': asset.width / asset.height,
        aspectRatio: `${asset.width} / ${asset.height}`,
      } as CSSProperties}
      data-load-tier={priority ? 'critical' : 'deferred'}
      data-asset-id={asset.id}
      data-asset-status={asset.status}
    >
      <PhotoInteraction src={src} href={!decorative && sourceId ? resolveSourceUrl(sourceId).href : undefined} label={asset.alt.ko}>
      <Image
        src={src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        preload={priority}
        sizes={sizes ?? `(max-width: ${widthCap}px) 100vw, ${widthCap}px`}
        className={styles.image}
        unoptimized
      />
      </PhotoInteraction>
    </figure>
  );
}

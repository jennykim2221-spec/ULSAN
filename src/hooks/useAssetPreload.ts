'use client';

/**
 * Asset preload helper — Foundation exposes API; critical decode wiring in Phase 2 Loading.
 */
import { assetPublicUrl } from '@/data/assets';
import { useCallback, useState } from 'react';

export function useAssetPreload() {
  const [ready, setReady] = useState<Record<string, boolean>>({});

  const preload = useCallback(async (filename: string) => {
    const url = assetPublicUrl(filename);
    if (typeof window === 'undefined') return false;
    try {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      if (typeof img.decode === 'function') {
        await img.decode();
      } else {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed: ${filename}`));
        });
      }
      setReady((prev) => ({ ...prev, [filename]: true }));
      return true;
    } catch {
      setReady((prev) => ({ ...prev, [filename]: false }));
      return false;
    }
  }, []);

  return { preload, ready };
}

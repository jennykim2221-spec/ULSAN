/** Shared content types — MASTER_BUILD_SPEC §13 */
export type Localized = { ko: string; en: string };

export type SceneId =
  | 'intro'
  | 'source'
  | 'upper-stream'
  | 'history'
  | 'industry'
  | 'dead-river'
  | 'recovery'
  | 'garden'
  | 'whale'
  | 'jangsaengpo'
  | 'sea'
  | 'explore'
  | 'night'
  | 'ending';

export type AssetStatus = 'active' | 'reserve' | 'hold';

export type Asset = {
  id: string;
  filename: string;
  width: number;
  height: number;
  bytes: number;
  status: AssetStatus;
  roles: string[];
  sceneIds: SceneId[];
  alt: Localized;
  maxCssWidth: number;
  allowCover: boolean;
  uncertaintyIds: string[];
  derivedFrom?: string;
  capturedAt: string | null;
  visibleCredit: string | null;
};

export type SceneConfig = {
  id: SceneId;
  order: number;
  pin: boolean;
  /** Additional pin scroll distance D; overflow used by Industry horizontal track */
  distance: (viewport: { width: number; height: number }, overflow: number) => number;
  readingProgress: number;
  assetIds: string[];
  sourceIds: string[];
  label: string;
  anchor: string;
  tokenKey: SceneTokenKey;
};

export type SceneTokenKey =
  | 'loading'
  | 'intro'
  | 'source'
  | 'upperStream'
  | 'archive'
  | 'industry'
  | 'deadRiver'
  | 'recovery'
  | 'garden'
  | 'whale'
  | 'night';

export type Fact = {
  id: string;
  yearLabel: string;
  text: Localized;
  value?: number;
  unit?: string;
  sourceIds: string[];
  scope: 'historical' | 'reference-snapshot';
};

export type PlaceId =
  | 'bangucheon'
  | 'taehwa'
  | 'jangsaengpo'
  | 'daewangam'
  | 'ganjeolgot'
  | 'ganwoljae'
  | 'seongnamsa';

export type Place = {
  id: PlaceId;
  name: Localized;
  mapPoint: [number, number];
  location: Localized;
  type: Localized;
  description: Localized;
  highlight: Localized;
  visit: Localized;
  assetIds: string[];
  sourceId: string;
};

export type OfficialSource = {
  id: string;
  purpose: string;
  url: string;
  fallbackId?: string;
  statusNote: string;
};

/** Public URL: encode path segment only */
export function assetPublicUrl(filename: string): string {
  return `/assets/images/${encodeURIComponent(filename)}`;
}

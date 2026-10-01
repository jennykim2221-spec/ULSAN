/**
 * Historical facts — MASTER_BUILD_SPEC §10.1
 * Image capture dates are NOT these fact years.
 */
import type { Fact } from './types';

export const facts: Fact[] = [
  {
    id: 'industrial-district-1962',
    yearLabel: '1962.01.27',
    text: {
      ko: '울산 특정공업지구 지정',
      en: 'Ulsan designated a special industrial district',
    },
    sourceIds: ['S03'],
    scope: 'historical',
  },
  {
    id: 'city-status-1962',
    yearLabel: '1962.06',
    text: {
      ko: '울산시 승격',
      en: 'Ulsan elevated to city status',
    },
    sourceIds: ['S12'],
    scope: 'historical',
  },
  {
    id: 'tower-1967',
    yearLabel: '1967',
    text: {
      ko: '공업탑 건립',
      en: 'Industrial monument built',
    },
    sourceIds: ['S13'],
    scope: 'historical',
  },
  {
    id: 'bod-1996',
    yearLabel: '1996',
    text: {
      ko: '태화강 BOD',
      en: 'Taehwa River BOD',
    },
    value: 11.3,
    unit: 'mg/L',
    sourceIds: ['S14'],
    scope: 'historical',
  },
  {
    id: 'ecopolis-2004',
    yearLabel: '2004',
    text: {
      ko: '에코폴리스 울산',
      en: 'ECOPOLIS ULSAN',
    },
    sourceIds: ['S05'],
    scope: 'historical',
  },
  {
    id: 'masterplan-2005',
    yearLabel: '2005',
    text: {
      ko: '태화강 마스터플랜',
      en: 'TAEHWA RIVER MASTER PLAN',
    },
    sourceIds: ['S05'],
    scope: 'historical',
  },
  {
    id: 'grade1-2007',
    yearLabel: '2007',
    text: {
      ko: '1등급 수질로 개선',
      en: 'IMPROVED TO GRADE 1 WATER QUALITY',
    },
    sourceIds: ['S14'],
    scope: 'historical',
  },
  {
    id: 'ecotourism-2013',
    yearLabel: '2013',
    text: {
      ko: '생태관광지역',
      en: 'ECOTOURISM AREA',
    },
    sourceIds: ['S05', 'S15'],
    scope: 'historical',
  },
  {
    id: 'national-garden-2019',
    yearLabel: '2019',
    text: {
      ko: '국가정원',
      en: 'NATIONAL GARDEN',
    },
    sourceIds: ['S05'],
    scope: 'historical',
  },
  {
    id: 'garden-area',
    yearLabel: '2019',
    text: {
      ko: '국가정원 면적',
      en: 'National garden area',
    },
    value: 835452,
    unit: '㎡',
    sourceIds: ['S06'],
    scope: 'reference-snapshot',
  },
  {
    id: 'unesco-2025',
    yearLabel: '2025',
    text: {
      ko: '반구천의 암각화 세계유산 등재',
      en: 'Petroglyphs along the Bangucheon Stream inscribed as World Heritage',
    },
    sourceIds: ['S02'],
    scope: 'historical',
  },
];

/** Recovery scene milestones in display order (§6.8) */
export const recoveryMilestones = [
  { factId: 'bod-1996', display: { ko: 'BOD 11.3 mg/L', en: 'BOD 11.3 mg/L' } },
  {
    factId: 'ecopolis-2004',
    display: { ko: '에코폴리스 울산', en: 'ECOPOLIS ULSAN' },
  },
  {
    factId: 'masterplan-2005',
    display: { ko: '태화강 마스터플랜', en: 'TAEHWA RIVER MASTER PLAN' },
  },
  {
    factId: 'grade1-2007',
    display: {
      ko: '1등급 수질로 개선',
      en: 'IMPROVED TO GRADE 1 WATER QUALITY',
    },
  },
  {
    factId: 'ecotourism-2013',
    display: { ko: '생태관광지역', en: 'ECOTOURISM AREA' },
  },
  {
    factId: 'national-garden-2019',
    display: { ko: '국가정원', en: 'NATIONAL GARDEN' },
  },
] as const;

export const factsById = Object.fromEntries(facts.map((f) => [f.id, f])) as Record<
  string,
  Fact
>;

/** BOD value must remain 11.3 — never tween to 0 or invent interpolations */
export const BOD_1996_VALUE = 11.3;
export const BOD_1996_UNIT = 'mg/L';

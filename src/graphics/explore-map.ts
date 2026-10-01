/**
 * Explore map geometry stubs — MASTER_BUILD_SPEC §9.1
 * Schematic coast/inland/river lines. Implemented visually in Phase 6.
 */
import { EXPLORE_MAP_VIEWBOX } from '@/data/places';

export { EXPLORE_MAP_VIEWBOX };

export const EXPLORE_COAST_PATH =
  'M800 40 C860 120 920 200 940 320 C960 440 930 560 880 700 C840 740 800 750 800 750';

export const EXPLORE_RIVER_PATH =
  'M420 80 C480 160 560 220 620 300 C680 380 720 450 760 520';

export const EXPLORE_INLAND_HINT =
  'M120 100 C200 180 240 260 280 400 C300 500 260 620 200 700';

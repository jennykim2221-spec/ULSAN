/**
 * Shared Taehwa river path — MASTER_BUILD_SPEC §8.1
 * viewBox 120×600. Approximate decorative path; not a surveyed river line.
 * Stroke-draw / MotionPath wiring arrives in Phase 2.
 */
export const RIVER_PATH_VIEWBOX = { width: 120, height: 600 } as const;

/** Single reusable path `d` for Intro / nav / Recovery / Sea / Ending */
export const RIVER_PATH_D =
  'M60 8 C52 48 78 78 58 118 C40 156 72 188 64 228 C54 272 82 302 60 348 C42 386 74 422 66 462 C58 502 70 542 60 592';

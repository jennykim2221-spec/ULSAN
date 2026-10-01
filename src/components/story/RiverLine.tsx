import { RIVER_PATH_D } from '@/graphics/river-path';

/** Shared decorative geometry, separate from interactive navigation. */
export function RiverLine({ ending = false }: { ending?: boolean }) {
  return <div data-river-layer aria-hidden="true">
    <svg preserveAspectRatio="none" viewBox="0 0 120 600" focusable="false">
      <path data-river-path d={RIVER_PATH_D} pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
    <span data-river-drop data-ending-drop={ending ? true : undefined} />
  </div>;
}

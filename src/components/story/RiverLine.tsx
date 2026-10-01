import { RIVER_PATH_D } from '@/graphics/river-path';

/** Shared decorative geometry, separate from interactive navigation. */
export function RiverLine({ ending = false }: { ending?: boolean }) {
  return <div data-river-layer aria-hidden="true">
    <svg preserveAspectRatio={ending ? "xMidYMid meet" : "none"} viewBox="0 0 120 600" focusable="false">
      <path data-river-path d={RIVER_PATH_D} pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" />
      {ending && ['SOURCE', 'HISTORY', 'INDUSTRY', 'RECOVERY', 'GARDEN', 'WHALE', 'SEA'].map((label, i) => <g key={label} data-ending-node>
        <circle cx="60" cy={8 + i * 584 / 6} r="3" fill="currentColor" />
        <text x="74" y={11 + i * 584 / 6} fontSize="6" fill="currentColor" lang="en">{label}</text>
      </g>)}
      {ending && <circle data-ending-drop cx="60" cy="300" r="3" fill="currentColor" opacity="0" />}
    </svg>
    {!ending && <span data-river-drop />}
  </div>;
}

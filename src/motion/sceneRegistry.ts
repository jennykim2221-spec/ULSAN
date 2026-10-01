import type { SceneId } from '@/data/types';

export type SceneMeasurement = {
  id: SceneId;
  start: number;
  end: number;
  intervalEnd: number;
  readingY: number;
  pinned: boolean;
};
export type ScenePosition = { id: SceneId; progress: number };
const registry = new Map<SceneId, SceneMeasurement>();
const clamp = (n: number) => Math.min(1, Math.max(0, n));
export const sceneRegistry = {
  set(measurement: SceneMeasurement) { registry.set(measurement.id, measurement); },
  get(id: SceneId) { return registry.get(id); },
  all() { return Array.from(registry.values()); },
  position(y: number): ScenePosition | null {
    const rows = this.all();
    const row = [...rows].reverse().find(r => y >= r.start - 1) ?? rows[0];
    return row ? { id: row.id, progress: clamp((y - row.start) / Math.max(1, row.intervalEnd - row.start)) } : null;
  },
  y(position: ScenePosition) {
    const row = registry.get(position.id);
    return row ? row.start + clamp(position.progress) * (row.intervalEnd - row.start) : 0;
  },
  clear() { registry.clear(); },
};

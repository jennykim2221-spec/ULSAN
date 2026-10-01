import type { SceneId } from '@/data/types';

export type TransitionKind = 'still' | 'rise' | 'line' | 'soft';
/** Phase 2 framing only. Archive photographs never scale, rotate or crop. */
export const sceneTransitions: Record<SceneId, TransitionKind> = {
  intro: 'line', source: 'still', 'upper-stream': 'rise', history: 'still',
  industry: 'still', 'dead-river': 'still', recovery: 'line', garden: 'soft',
  whale: 'line', jangsaengpo: 'soft', sea: 'rise', explore: 'still',
  night: 'rise', ending: 'line',
};

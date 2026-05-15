import { create } from 'zustand';
import { productionCues } from '../data/productionMockData.js';
import { resolveCueIndexFromMarker } from '../features/cue-engine/resolveCueFromMarker.js';
import { transportStates } from '../features/websocket/syncProtocol.js';
import { clampPercent, getCueStartSeconds } from '../utils/time.js';

function createHistoryItem(cue, action) {
  return {
    id: `${Date.now()}-${cue?.id ?? action}`,
    cueId: cue?.id ?? 'NO-CUE',
    title: cue?.title ?? action,
    action,
    at: new Date().toLocaleTimeString(),
  };
}

export const usePlaybackStore = create((set, get) => ({
  currentCueIndex: 0,
  isPlaying: false,
  isPaused: false,
  elapsedInCue: 0,
  triggerHistory: [],
  go: () => {
    const { currentCueIndex, isPlaying } = get();
    const nextIndex = isPlaying ? Math.min(currentCueIndex + 1, productionCues.length - 1) : currentCueIndex;
    const cue = productionCues[nextIndex];

    set((state) => ({
      currentCueIndex: nextIndex,
      isPlaying: true,
      isPaused: false,
      elapsedInCue: 0,
      triggerHistory: [createHistoryItem(cue, 'GO'), ...state.triggerHistory].slice(0, 10),
    }));
  },
  pause: () => set({ isPlaying: false, isPaused: true }),
  resume: () => set({ isPlaying: true, isPaused: false }),
  stop: () => set({ isPlaying: false, isPaused: false, elapsedInCue: 0 }),
  nextCue: () =>
    set((state) => ({
      currentCueIndex: Math.min(state.currentCueIndex + 1, productionCues.length - 1),
      elapsedInCue: 0,
      isPlaying: false,
      isPaused: false,
    })),
  previousCue: () =>
    set((state) => ({
      currentCueIndex: Math.max(state.currentCueIndex - 1, 0),
      elapsedInCue: 0,
      isPlaying: false,
      isPaused: false,
    })),
  loadCueIndex: (cueIndex) =>
    set({
      currentCueIndex: Math.max(0, Math.min(cueIndex, productionCues.length - 1)),
      elapsedInCue: 0,
      isPlaying: false,
      isPaused: false,
    }),
  loadCueAtTime: (playheadSeconds) => {
    let cueIndex = 0;
    for (let index = 0; index < productionCues.length; index += 1) {
      if (getCueStartSeconds(productionCues[index]) <= playheadSeconds) {
        cueIndex = index;
      }
    }
    const boundedIndex = Math.max(0, cueIndex);
    const cue = productionCues[boundedIndex];
    const cueStart = getCueStartSeconds(cue);

    set({
      currentCueIndex: boundedIndex,
      elapsedInCue: Math.max(0, Math.min(playheadSeconds - cueStart, cue?.duration ?? 0)),
      isPlaying: false,
      isPaused: false,
    });
  },
  applyExternalMarker: (marker) => {
    const cueIndex = resolveCueIndexFromMarker(marker);
    const cue = productionCues[cueIndex];
    const markerSeconds = typeof marker?.seconds === 'number' ? marker.seconds : getCueStartSeconds(cue);

    set({
      currentCueIndex: cueIndex,
      elapsedInCue: Math.max(0, markerSeconds - getCueStartSeconds(cue)),
    });
  },
  applyExternalTransport: ({ state, seconds }) => {
    if (typeof seconds === 'number') {
      get().loadCueAtTime(seconds);
    }

    set({
      isPlaying: state === transportStates.playing,
      isPaused: state === transportStates.paused,
    });
  },
  tick: () => {
    const { isPlaying, currentCueIndex, elapsedInCue } = get();
    if (!isPlaying) return;

    const cue = productionCues[currentCueIndex];
    const nextCue = productionCues[currentCueIndex + 1];
    const nextElapsed = elapsedInCue + 1;
    const cueWindow = nextCue ? getCueStartSeconds(nextCue) - getCueStartSeconds(cue) : cue?.duration;

    if (cueWindow && nextElapsed >= cueWindow && nextCue) {
      set({
        currentCueIndex: currentCueIndex + 1,
        elapsedInCue: 0,
        isPlaying: true,
        isPaused: false,
      });
      return;
    }

    set({
      elapsedInCue: cueWindow ? Math.min(nextElapsed, cueWindow) : nextElapsed,
      isPlaying: cueWindow ? nextElapsed < cueWindow || Boolean(nextCue) : isPlaying,
    });
  },
  getProgress: () => {
    const { currentCueIndex, elapsedInCue } = get();
    const cue = productionCues[currentCueIndex];
    if (!cue?.duration) return 0;
    return clampPercent((elapsedInCue / cue.duration) * 100);
  },
}));

import { useEffect } from 'react';
import { productionCues } from '../data/productionMockData.js';
import { usePlaybackTicker } from './usePlaybackTicker.js';
import { usePlaybackStore } from '../store/playbackStore.js';
import { useTimelineStore } from '../store/timelineStore.js';
import { getCueStartSeconds } from '../utils/time.js';

export function useTimelinePlaybackSync() {
  usePlaybackTicker();

  const currentCueIndex = usePlaybackStore((state) => state.currentCueIndex);
  const elapsedInCue = usePlaybackStore((state) => state.elapsedInCue);
  const isDraggingPlayhead = useTimelineStore((state) => state.isDraggingPlayhead);
  const setPlayheadSeconds = useTimelineStore((state) => state.setPlayheadSeconds);

  useEffect(() => {
    if (isDraggingPlayhead) return;

    const cue = productionCues[currentCueIndex];
    setPlayheadSeconds(getCueStartSeconds(cue) + elapsedInCue);
  }, [currentCueIndex, elapsedInCue, isDraggingPlayhead, setPlayheadSeconds]);
}

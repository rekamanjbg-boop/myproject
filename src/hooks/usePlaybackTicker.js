import { useEffect } from 'react';
import { usePlaybackStore } from '../store/playbackStore.js';

export function usePlaybackTicker() {
  const isPlaying = usePlaybackStore((state) => state.isPlaying);
  const tick = usePlaybackStore((state) => state.tick);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [isPlaying, tick]);
}

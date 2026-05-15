import { useEffect } from 'react';
import { usePlaybackStore } from '../store/playbackStore.js';

export function useOperatorKeyboardShortcuts() {
  const go = usePlaybackStore((state) => state.go);
  const pause = usePlaybackStore((state) => state.pause);
  const resume = usePlaybackStore((state) => state.resume);
  const nextCue = usePlaybackStore((state) => state.nextCue);
  const previousCue = usePlaybackStore((state) => state.previousCue);
  const isPlaying = usePlaybackStore((state) => state.isPlaying);

  useEffect(() => {
    function onKeyDown(event) {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) return;

      if (event.code === 'Space') {
        event.preventDefault();
        isPlaying ? pause() : resume();
      }

      if (event.code === 'Enter') {
        event.preventDefault();
        go();
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault();
        nextCue();
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        previousCue();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go, isPlaying, nextCue, pause, previousCue, resume]);
}

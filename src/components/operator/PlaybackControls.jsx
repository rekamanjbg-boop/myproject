import { usePlaybackStore } from '../../store/playbackStore.js';

export function PlaybackControls() {
  const go = usePlaybackStore((state) => state.go);
  const pause = usePlaybackStore((state) => state.pause);
  const resume = usePlaybackStore((state) => state.resume);
  const stop = usePlaybackStore((state) => state.stop);
  const nextCue = usePlaybackStore((state) => state.nextCue);
  const previousCue = usePlaybackStore((state) => state.previousCue);
  const isPlaying = usePlaybackStore((state) => state.isPlaying);
  const isPaused = usePlaybackStore((state) => state.isPaused);

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1.3fr_1fr_1fr_1fr]">
      <button type="button" onClick={previousCue} className="rounded-lg border border-theater-line bg-white/10 px-4 py-4 font-semibold text-violet-50">
        Prev
      </button>
      <button type="button" onClick={go} className="rounded-lg bg-violet-500 px-5 py-5 text-3xl font-black text-white shadow-glow">
        GO
      </button>
      <button
        type="button"
        onClick={isPlaying ? pause : resume}
        className="rounded-lg border border-theater-line bg-white/10 px-4 py-4 font-semibold text-violet-50"
      >
        {isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'}
      </button>
      <button type="button" onClick={stop} className="rounded-lg border border-theater-line bg-white/10 px-4 py-4 font-semibold text-violet-50">
        Stop
      </button>
      <button type="button" onClick={nextCue} className="rounded-lg border border-theater-line bg-white/10 px-4 py-4 font-semibold text-violet-50">
        Next
      </button>
    </section>
  );
}

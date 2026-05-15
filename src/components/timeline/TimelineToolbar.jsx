import { usePlaybackStore } from '../../store/playbackStore.js';
import { useTimelineStore } from '../../store/timelineStore.js';

export function TimelineToolbar() {
  const zoom = useTimelineStore((state) => state.zoom);
  const setZoom = useTimelineStore((state) => state.setZoom);
  const isPlaying = usePlaybackStore((state) => state.isPlaying);
  const isPaused = usePlaybackStore((state) => state.isPaused);
  const go = usePlaybackStore((state) => state.go);
  const pause = usePlaybackStore((state) => state.pause);
  const resume = usePlaybackStore((state) => state.resume);
  const stop = usePlaybackStore((state) => state.stop);

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Theatrical Timeline</h2>
        <p className="text-sm text-violet-100/60">Horizontal cue sequence with realtime playback simulation.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={go} className="rounded-lg bg-violet-500 px-4 py-3 font-semibold text-white shadow-glow">
          GO
        </button>
        <button type="button" onClick={isPlaying ? pause : resume} className="rounded-lg border border-theater-line bg-white/10 px-4 py-3 font-semibold text-violet-50">
          {isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'}
        </button>
        <button type="button" onClick={stop} className="rounded-lg border border-theater-line bg-white/10 px-4 py-3 font-semibold text-violet-50">
          Stop
        </button>
        <label className="ml-2 flex min-w-52 items-center gap-3 text-sm text-violet-100/75">
          Zoom
          <input
            type="range"
            min="0.75"
            max="2.6"
            step="0.05"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full accent-violet-400"
          />
        </label>
      </div>
    </div>
  );
}

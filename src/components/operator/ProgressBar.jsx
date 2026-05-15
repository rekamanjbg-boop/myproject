import { formatDuration } from '../../utils/time.js';

export function ProgressBar({ elapsed, duration, progress }) {
  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-violet-100/70">
        <span>Cue Progress</span>
        <span className="font-mono">{formatDuration(elapsed)} / {formatDuration(duration)}</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

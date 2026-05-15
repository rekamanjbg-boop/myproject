import { formatDuration } from '../../utils/time.js';

export function TimelineRuler({ runtimeSeconds }) {
  const markerCount = 9;
  const markers = Array.from({ length: markerCount }, (_, index) => Math.round((runtimeSeconds / (markerCount - 1)) * index));

  return (
    <div className="relative h-12 border-b border-theater-line">
      {markers.map((seconds) => (
        <div key={seconds} className="absolute top-0 h-full border-l border-violet-200/20" style={{ left: `${(seconds / runtimeSeconds) * 100}%` }}>
          <span className="ml-2 font-mono text-xs text-violet-100/60">{formatDuration(seconds)}</span>
        </div>
      ))}
    </div>
  );
}

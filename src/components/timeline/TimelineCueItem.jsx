import { memo } from 'react';
import { getCueStartSeconds } from '../../utils/time.js';

export const TimelineCueItem = memo(function TimelineCueItem({ cue, runtimeSeconds, isActive, onSelect }) {
  const left = (getCueStartSeconds(cue) / runtimeSeconds) * 100;
  const width = Math.max(1.8, ((cue.duration ?? 20) / runtimeSeconds) * 100);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'absolute top-2 h-14 overflow-hidden rounded-md border px-3 py-2 text-left shadow-panel transition hover:-translate-y-0.5',
        isActive ? 'border-white/70 ring-2 ring-white/25' : 'border-white/20',
      ].join(' ')}
      style={{
        left: `${left}%`,
        width: `${width}%`,
        minWidth: '9rem',
        background: `linear-gradient(135deg, ${cue.color}66, rgba(255,255,255,0.06))`,
      }}
      title={`${cue.id} / ${cue.title}`}
    >
      <span className="block truncate font-mono text-xs text-white/70">{cue.id}</span>
      <span className="block truncate text-sm font-semibold text-white">{cue.title}</span>
    </button>
  );
});

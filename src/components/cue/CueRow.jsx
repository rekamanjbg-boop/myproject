import { memo } from 'react';
import { CueStatusBadge } from './CueStatusBadge.jsx';

export const CueRow = memo(function CueRow({ cue, isCurrent, onLoad }) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className={[
        'grid w-full grid-cols-[5rem_4.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-3 text-left transition',
        isCurrent
          ? 'border-violet-300/50 bg-violet-500/20 shadow-glow'
          : 'border-theater-line bg-white/5 hover:border-violet-300/35 hover:bg-white/10',
      ].join(' ')}
    >
      <span className="font-mono text-xs text-violet-200/70">{cue.timestamp}</span>
      <span className="rounded-md px-2 py-1 text-center font-mono text-xs font-semibold text-white" style={{ backgroundColor: `${cue.color}55` }}>
        {cue.type}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-white">{cue.title}</span>
        <span className="block truncate text-xs text-violet-100/60">{cue.section}</span>
      </span>
      <CueStatusBadge status={cue.status} />
    </button>
  );
});

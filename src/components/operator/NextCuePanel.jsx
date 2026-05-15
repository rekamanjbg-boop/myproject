import { CueStatusBadge } from '../cue/CueStatusBadge.jsx';

export function NextCuePanel({ cue }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Next Cue</p>
          <h2 className="mt-2 truncate text-xl font-semibold text-white">{cue?.title ?? 'End of stack'}</h2>
          {cue && <p className="mt-2 font-mono text-sm text-violet-100/65">{cue.id} / {cue.timestamp} / {cue.type}</p>}
        </div>
        {cue && <CueStatusBadge status={cue.status} />}
      </div>
    </section>
  );
}

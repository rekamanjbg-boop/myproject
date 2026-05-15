import { CueStatusBadge } from '../cue/CueStatusBadge.jsx';

export function CurrentCuePanel({ cue }) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Current Cue</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{cue?.title ?? 'No cue loaded'}</h2>
          <p className="mt-2 font-mono text-sm text-violet-100/70">{cue?.id} / {cue?.timestamp} / {cue?.type}</p>
        </div>
        {cue && <CueStatusBadge status={cue.status} />}
      </div>
      <p className="mt-5 text-base leading-7 text-violet-100/75">{cue?.description}</p>
      {cue?.operatorNote && (
        <div className="mt-5 rounded-lg border border-amber-200/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
          {cue.operatorNote}
        </div>
      )}
    </section>
  );
}

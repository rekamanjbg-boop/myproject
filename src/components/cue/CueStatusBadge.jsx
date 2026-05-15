const statusTone = {
  armed: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
  ready: 'border-violet-300/40 bg-violet-300/10 text-violet-100',
  standby: 'border-amber-300/40 bg-amber-300/10 text-amber-100',
  locked: 'border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100',
};

export function CueStatusBadge({ status = 'ready' }) {
  return (
    <span className={`rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusTone[status] ?? statusTone.ready}`}>
      {status}
    </span>
  );
}

import { useSyncStore } from '../../store/syncStore.js';
import { formatDuration } from '../../utils/time.js';

const connectionTone = {
  online: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
  connecting: 'border-amber-300/40 bg-amber-300/10 text-amber-100',
  error: 'border-red-300/40 bg-red-300/10 text-red-100',
  offline: 'border-white/15 bg-white/5 text-violet-100/70',
};

export function SyncStatusPanel({ compact = false }) {
  const masterSource = useSyncStore((state) => state.masterSource);
  const connectionState = useSyncStore((state) => state.connectionState);
  const transportState = useSyncStore((state) => state.transportState);
  const activeMarker = useSyncStore((state) => state.activeMarker);
  const reaperTimeSeconds = useSyncStore((state) => state.reaperTimeSeconds);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${connectionTone[connectionState] ?? connectionTone.offline}`}>
          {connectionState}
        </span>
        <span className="rounded-lg border border-theater-line bg-white/5 px-3 py-2 font-mono text-sm text-violet-100">
          {transportState}
        </span>
      </div>
    );
  }

  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">External Sync</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{masterSource} Master</h2>
        </div>
        <span className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${connectionTone[connectionState] ?? connectionTone.offline}`}>
          {connectionState}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-theater-line bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-200/60">Transport</p>
          <p className="mt-1 font-mono text-lg text-white">{transportState}</p>
        </div>
        <div className="rounded-lg border border-theater-line bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-200/60">Marker</p>
          <p className="mt-1 truncate text-lg font-semibold text-white">{activeMarker?.name ?? activeMarker?.cueId ?? 'No marker'}</p>
        </div>
        <div className="rounded-lg border border-theater-line bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-200/60">REAPER Time</p>
          <p className="mt-1 font-mono text-lg text-white">{formatDuration(reaperTimeSeconds)}</p>
        </div>
      </div>
    </section>
  );
}

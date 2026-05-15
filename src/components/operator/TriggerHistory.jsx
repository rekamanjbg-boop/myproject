import { usePlaybackStore } from '../../store/playbackStore.js';

export function TriggerHistory() {
  const triggerHistory = usePlaybackStore((state) => state.triggerHistory);

  return (
    <section className="glass-panel rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white">Trigger History</h2>
      <div className="mt-4 space-y-2">
        {triggerHistory.length === 0 && <p className="text-sm text-violet-100/60">No cues fired yet.</p>}
        {triggerHistory.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-theater-line bg-white/5 px-3 py-2">
            <span className="truncate text-sm text-white">{item.action} / {item.cueId} / {item.title}</span>
            <span className="shrink-0 font-mono text-xs text-violet-200/60">{item.at}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

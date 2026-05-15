import { TimelineCueItem } from './TimelineCueItem.jsx';

export function TimelineTrack({ department, meta, cues, runtimeSeconds, activeCueId, onCueSelect }) {
  return (
    <div className="relative border-b border-theater-line py-3">
      <div className="sticky left-0 z-10 mb-2 inline-flex items-center gap-2 rounded-md border border-theater-line bg-black/75 px-3 py-1 backdrop-blur-xl">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">{department}</span>
        <span className="text-xs text-violet-100/60">{meta.label}</span>
      </div>
      <div className="relative h-20">
        {cues.map((cue) => (
          <TimelineCueItem
            key={cue.id}
            cue={cue}
            runtimeSeconds={runtimeSeconds}
            isActive={cue.id === activeCueId}
            onSelect={() => onCueSelect(cue)}
          />
        ))}
      </div>
    </div>
  );
}

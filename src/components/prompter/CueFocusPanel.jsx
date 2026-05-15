export function CueFocusPanel({ cue, nextCue, isPaused, scrollProgress }) {
  return (
    <aside className="mx-auto grid w-full max-w-7xl gap-3 px-5 pb-28 md:grid-cols-[1fr_0.8fr_12rem]">
      <div className="rounded-lg border border-theater-line bg-white/5 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Focused Cue</p>
        <h2 className="mt-2 truncate text-xl font-semibold text-white">{cue?.title ?? 'No cue loaded'}</h2>
        <p className="mt-2 font-mono text-sm text-violet-100/65">{cue?.id ?? 'NO-CUE'} / {cue?.timestamp ?? '00:00:00'} / {cue?.type ?? 'STANDBY'}</p>
      </div>
      <div className="rounded-lg border border-theater-line bg-white/5 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Next Cue</p>
        <h2 className="mt-2 truncate text-lg font-semibold text-white">{nextCue?.title ?? 'End of stack'}</h2>
        <p className="mt-2 text-sm text-violet-100/60">{nextCue?.actorPrompt ?? 'No next prompt available.'}</p>
      </div>
      <div className="rounded-lg border border-theater-line bg-white/5 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Scroll</p>
        <p className="mt-2 text-2xl font-semibold text-white">{Math.round(scrollProgress)}%</p>
        <p className="mt-1 text-sm text-violet-100/60">{isPaused ? 'Paused' : 'Auto'}</p>
      </div>
    </aside>
  );
}

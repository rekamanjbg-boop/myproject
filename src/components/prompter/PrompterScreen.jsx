import { PromptText } from './PromptText.jsx';
import { CueFocusPanel } from './CueFocusPanel.jsx';

export function PrompterScreen({ cue, nextCue, fontScale, scrollProgress, isPaused }) {
  return (
    <main className="min-h-screen overflow-hidden bg-theater-blackout text-white">
      <div className="pointer-events-none fixed inset-0 stage-grid opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(139,92,246,0.22),transparent_34rem),linear-gradient(180deg,rgba(5,4,10,0.15),rgba(5,4,10,0.92))]" />
      <div className="relative flex min-h-screen flex-col justify-between">
        <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-200/65">Actor Prompter</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{cue?.section ?? 'Standby'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-theater-line bg-white/5 px-4 py-3 font-mono text-lg text-violet-50">
              {cue?.timestamp ?? '00:00:00'}
            </span>
            <span className={`rounded-lg border px-4 py-3 text-sm font-semibold ${isPaused ? 'border-amber-300/35 bg-amber-300/10 text-amber-100' : 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100'}`}>
              {isPaused ? 'Paused' : 'Auto Scroll'}
            </span>
          </div>
        </header>
        <PromptText cue={cue} fontScale={fontScale} scrollProgress={scrollProgress} />
        <CueFocusPanel cue={cue} nextCue={nextCue} isPaused={isPaused} scrollProgress={scrollProgress} />
      </div>
    </main>
  );
}

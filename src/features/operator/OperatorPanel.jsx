import { CueList } from '../../components/cue/CueList.jsx';
import { CurrentCuePanel } from '../../components/operator/CurrentCuePanel.jsx';
import { NextCuePanel } from '../../components/operator/NextCuePanel.jsx';
import { PlaybackControls } from '../../components/operator/PlaybackControls.jsx';
import { ProgressBar } from '../../components/operator/ProgressBar.jsx';
import { TriggerHistory } from '../../components/operator/TriggerHistory.jsx';
import { useOperatorKeyboardShortcuts } from '../../hooks/useOperatorKeyboardShortcuts.js';
import { usePlaybackTicker } from '../../hooks/usePlaybackTicker.js';
import { useCueStore } from '../../store/cueStore.js';
import { usePlaybackStore } from '../../store/playbackStore.js';

export function OperatorPanel() {
  useOperatorKeyboardShortcuts();
  usePlaybackTicker();

  const cues = useCueStore((state) => state.cues);
  const currentCueIndex = usePlaybackStore((state) => state.currentCueIndex);
  const elapsedInCue = usePlaybackStore((state) => state.elapsedInCue);
  const progress = usePlaybackStore((state) => state.getProgress());
  const isPlaying = usePlaybackStore((state) => state.isPlaying);
  const isPaused = usePlaybackStore((state) => state.isPaused);

  const currentCue = cues[currentCueIndex] ?? null;
  const nextCue = cues[currentCueIndex + 1] ?? null;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_27rem]">
      <div className="space-y-5">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Transport State</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                {isPlaying ? 'Running' : isPaused ? 'Paused' : 'Standing By'}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-violet-100/70">
              <span className="rounded-md border border-theater-line bg-white/5 px-3 py-2 font-mono">Enter = GO</span>
              <span className="rounded-md border border-theater-line bg-white/5 px-3 py-2 font-mono">Space = Play/Pause</span>
              <span className="rounded-md border border-theater-line bg-white/5 px-3 py-2 font-mono">Left/Right = Cue</span>
            </div>
          </div>
        </div>
        <PlaybackControls />
        <ProgressBar elapsed={elapsedInCue} duration={currentCue?.duration ?? 0} progress={progress} />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <CurrentCuePanel cue={currentCue} />
          <NextCuePanel cue={nextCue} />
        </div>
        <TriggerHistory />
      </div>
      <CueList />
    </div>
  );
}

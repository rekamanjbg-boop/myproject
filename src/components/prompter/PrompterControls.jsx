import { usePrompterStore } from '../../store/prompterStore.js';

export function PrompterControls({ onFullscreen }) {
  const isPaused = usePrompterStore((state) => state.isPaused);
  const isFullscreenReady = usePrompterStore((state) => state.isFullscreenReady);
  const togglePause = usePrompterStore((state) => state.togglePause);
  const fontScale = usePrompterStore((state) => state.fontScale);
  const setFontScale = usePrompterStore((state) => state.setFontScale);

  return (
    <div className="fixed bottom-5 left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 flex-wrap items-center justify-between gap-3 rounded-xl border border-theater-line bg-black/70 p-3 shadow-panel backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePause}
          className="rounded-lg bg-violet-500 px-5 py-3 font-semibold text-white shadow-glow"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={onFullscreen}
          className="rounded-lg border border-theater-line bg-white/10 px-5 py-3 font-semibold text-violet-50"
        >
          {isFullscreenReady ? 'Fullscreen Ready' : 'Fullscreen'}
        </button>
      </div>
      <label className="flex min-w-52 flex-1 items-center gap-3 text-sm text-violet-100/75 sm:flex-none">
        Text Size
        <input
          type="range"
          min="0.85"
          max="1.35"
          step="0.05"
          value={fontScale}
          onChange={(event) => setFontScale(Number(event.target.value))}
          className="w-full accent-violet-400"
        />
      </label>
    </div>
  );
}

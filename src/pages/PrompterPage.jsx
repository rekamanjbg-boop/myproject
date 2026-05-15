import { useCallback, useEffect } from 'react';
import { PrompterControls } from '../components/prompter/PrompterControls.jsx';
import { PrompterScreen } from '../components/prompter/PrompterScreen.jsx';
import { usePrompterAutoScroll } from '../hooks/usePrompterAutoScroll.js';
import { useCueStore } from '../store/cueStore.js';
import { usePlaybackStore } from '../store/playbackStore.js';
import { usePrompterStore } from '../store/prompterStore.js';

export function PrompterPage() {
  const cues = useCueStore((state) => state.cues);
  const currentCueIndex = usePlaybackStore((state) => state.currentCueIndex);
  const nextCue = usePlaybackStore((state) => state.nextCue);
  const previousCue = usePlaybackStore((state) => state.previousCue);
  const cue = cues[currentCueIndex] ?? null;
  const upcomingCue = cues[currentCueIndex + 1] ?? null;
  const isPaused = usePrompterStore((state) => state.isPaused);
  const togglePause = usePrompterStore((state) => state.togglePause);
  const fontScale = usePrompterStore((state) => state.fontScale);
  const scrollProgress = usePrompterStore((state) => state.scrollProgress);
  const setFullscreenReady = usePrompterStore((state) => state.setFullscreenReady);

  usePrompterAutoScroll(cue?.id);

  const enterFullscreen = useCallback(async () => {
    await document.documentElement.requestFullscreen?.();
    setFullscreenReady(Boolean(document.fullscreenElement));
  }, [setFullscreenReady]);

  useEffect(() => {
    function onFullscreenChange() {
      setFullscreenReady(Boolean(document.fullscreenElement));
    }

    function onKeyDown(event) {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (isTyping) return;

      if (event.code === 'Space') {
        event.preventDefault();
        togglePause();
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault();
        nextCue();
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        previousCue();
      }

      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        enterFullscreen();
      }

      if (event.code === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    }

    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [enterFullscreen, nextCue, previousCue, setFullscreenReady, togglePause]);

  return (
    <>
      <PrompterScreen
        cue={cue}
        nextCue={upcomingCue}
        fontScale={fontScale}
        scrollProgress={scrollProgress}
        isPaused={isPaused}
      />
      <PrompterControls onFullscreen={enterFullscreen} />
    </>
  );
}

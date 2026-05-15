import { useEffect } from 'react';
import { usePrompterStore } from '../store/prompterStore.js';

export function usePrompterAutoScroll(cueId) {
  const advanceScroll = usePrompterStore((state) => state.advanceScroll);
  const resetScroll = usePrompterStore((state) => state.resetScroll);

  useEffect(() => {
    resetScroll();
  }, [cueId, resetScroll]);

  useEffect(() => {
    const timerId = window.setInterval(advanceScroll, 120);
    return () => window.clearInterval(timerId);
  }, [advanceScroll]);
}

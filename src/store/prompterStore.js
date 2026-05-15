import { create } from 'zustand';

export const usePrompterStore = create((set) => ({
  isPaused: false,
  scrollProgress: 0,
  fontScale: 1,
  isFullscreenReady: false,
  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  resetScroll: () => set({ scrollProgress: 0 }),
  advanceScroll: () =>
    set((state) => ({
      scrollProgress: state.isPaused ? state.scrollProgress : Math.min(100, state.scrollProgress + 0.45),
    })),
  setFontScale: (fontScale) => set({ fontScale: Math.max(0.85, Math.min(1.35, fontScale)) }),
  setFullscreenReady: (isFullscreenReady) => set({ isFullscreenReady }),
}));

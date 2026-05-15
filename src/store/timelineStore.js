import { create } from 'zustand';

export const useTimelineStore = create((set) => ({
  zoom: 1,
  playheadSeconds: 0,
  isDraggingPlayhead: false,
  setZoom: (zoom) => set({ zoom: Math.max(0.75, Math.min(2.6, zoom)) }),
  setPlayheadSeconds: (playheadSeconds) => set({ playheadSeconds: Math.max(0, playheadSeconds) }),
  setDraggingPlayhead: (isDraggingPlayhead) => set({ isDraggingPlayhead }),
}));

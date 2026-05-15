import { create } from 'zustand';
import { transportStates } from '../features/websocket/syncProtocol.js';

export const useSyncStore = create((set) => ({
  masterSource: 'REAPER',
  connectionState: 'offline',
  transportState: transportStates.stopped,
  activeMarker: null,
  lastSyncEvent: null,
  reaperTimeSeconds: 0,
  resolumeStatus: {
    connected: false,
    activeComposition: null,
    activeClip: null,
  },
  setConnectionState: (connectionState) => set({ connectionState }),
  setTransportState: (transportState) => set({ transportState }),
  setActiveMarker: (activeMarker) => set({ activeMarker }),
  setReaperTimeSeconds: (reaperTimeSeconds) => set({ reaperTimeSeconds }),
  setLastSyncEvent: (lastSyncEvent) => set({ lastSyncEvent }),
  setResolumeStatus: (resolumeStatus) =>
    set((state) => ({
      resolumeStatus: {
        ...state.resolumeStatus,
        ...resolumeStatus,
      },
    })),
}));

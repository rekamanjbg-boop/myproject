import { syncEventTypes } from '../features/websocket/syncProtocol.js';
import { usePlaybackStore } from '../store/playbackStore.js';
import { usePrompterStore } from '../store/prompterStore.js';
import { useSyncStore } from '../store/syncStore.js';
import { useTimelineStore } from '../store/timelineStore.js';

export function routeSyncEvent(event) {
  if (!event) return;

  useSyncStore.getState().setLastSyncEvent(event);

  if (event.type === syncEventTypes.marker) {
    const marker = event.payload?.marker ?? event.payload;
    useSyncStore.getState().setActiveMarker(marker);
    usePlaybackStore.getState().applyExternalMarker(marker);

    if (typeof marker?.seconds === 'number') {
      useSyncStore.getState().setReaperTimeSeconds(marker.seconds);
      useTimelineStore.getState().setPlayheadSeconds(marker.seconds);
    }
  }

  if (event.type === syncEventTypes.transport) {
    if (event.payload?.state) {
      useSyncStore.getState().setTransportState(event.payload.state);
    }

    usePlaybackStore.getState().applyExternalTransport(event.payload);

    if (typeof event.payload?.seconds === 'number') {
      useSyncStore.getState().setReaperTimeSeconds(event.payload.seconds);
      useTimelineStore.getState().setPlayheadSeconds(event.payload.seconds);
    }
  }

  if (event.type === syncEventTypes.timeline && typeof event.payload?.seconds === 'number') {
    useSyncStore.getState().setReaperTimeSeconds(event.payload.seconds);
    useTimelineStore.getState().setPlayheadSeconds(event.payload.seconds);
    usePlaybackStore.getState().loadCueAtTime(event.payload.seconds);
  }

  if (event.type === syncEventTypes.prompter) {
    if (event.payload?.paused === true) usePrompterStore.getState().pause();
    if (event.payload?.paused === false) usePrompterStore.getState().resume();
    if (event.payload?.resetScroll) usePrompterStore.getState().resetScroll();
  }

  if (event.type === syncEventTypes.resolumeClip) {
    useSyncStore.getState().setResolumeStatus({
      connected: true,
      activeClip: event.payload?.clip ?? null,
      activeComposition: event.payload?.composition ?? null,
    });
  }
}

import { resolveCueIndexFromMarker } from '../features/cue-engine/resolveCueFromMarker.js';
import { syncEventTypes, syncSources, transportStates } from '../features/websocket/syncProtocol.js';

export function normalizeReaperEvent(rawEvent) {
  const event = rawEvent ?? {};
  const type = event.type ?? event.event ?? syncEventTypes.heartbeat;
  const payload = event.payload ?? event;

  return {
    source: syncSources.reaper,
    type,
    payload,
    receivedAt: Date.now(),
  };
}

export function mapReaperMarkerToCue(marker) {
  return {
    cueIndex: resolveCueIndexFromMarker(marker),
    marker,
  };
}

export function mapReaperTransportState(rawState) {
  if (rawState === true || rawState === 1 || rawState === 'play') return transportStates.playing;
  if (rawState === 'pause') return transportStates.paused;
  return transportStates.stopped;
}

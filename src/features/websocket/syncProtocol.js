export const syncSources = {
  reaper: 'REAPER',
  resolume: 'RESOLUME',
  oscBridge: 'OSC_BRIDGE',
  local: 'LOCAL_UI',
};

export const syncEventTypes = {
  transport: 'transport',
  marker: 'marker',
  cue: 'cue',
  timeline: 'timeline',
  prompter: 'prompter',
  resolumeClip: 'resolume.clip',
  heartbeat: 'heartbeat',
};

export const transportStates = {
  playing: 'playing',
  paused: 'paused',
  stopped: 'stopped',
};

export function createSyncEvent({ source, type, payload = {}, receivedAt = Date.now() }) {
  return {
    source,
    type,
    payload,
    receivedAt,
  };
}

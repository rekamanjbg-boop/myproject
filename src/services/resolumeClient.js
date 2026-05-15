export function createResolumeClient({ baseUrl }) {
  return {
    async getStatus() {
      if (!baseUrl) {
        return { connected: false, activeComposition: null, activeClip: null };
      }

      return {
        connected: false,
        activeComposition: null,
        activeClip: null,
        note: 'Resolume REST/OSC bridge endpoint not connected yet.',
      };
    },
    async triggerClip({ layer, clip }) {
      return {
        accepted: false,
        layer,
        clip,
        note: 'Frontend contract only. Actual Resolume bridge will execute this later.',
      };
    },
  };
}

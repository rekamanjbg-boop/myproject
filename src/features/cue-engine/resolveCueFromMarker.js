import { productionCues } from '../../data/productionMockData.js';
import { getCueStartSeconds } from '../../utils/time.js';

export function resolveCueIndexFromMarker(marker) {
  if (!marker) return 0;

  if (marker.cueId) {
    const cueIdIndex = productionCues.findIndex((cue) => cue.id === marker.cueId);
    if (cueIdIndex >= 0) return cueIdIndex;
  }

  if (marker.name) {
    const normalizedName = marker.name.toLowerCase();
    const titleIndex = productionCues.findIndex(
      (cue) => cue.title.toLowerCase().includes(normalizedName) || normalizedName.includes(cue.id.toLowerCase()),
    );
    if (titleIndex >= 0) return titleIndex;
  }

  if (typeof marker.seconds === 'number') {
    let nearestIndex = 0;
    for (let index = 0; index < productionCues.length; index += 1) {
      if (getCueStartSeconds(productionCues[index]) <= marker.seconds) {
        nearestIndex = index;
      }
    }
    return nearestIndex;
  }

  return 0;
}

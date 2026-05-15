export function formatDuration(totalSeconds = 0) {
  const boundedSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(boundedSeconds / 3600);
  const minutes = String(Math.floor((boundedSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(boundedSeconds % 60).padStart(2, '0');
  return hours > 0 ? `${String(hours).padStart(2, '0')}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

export function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

export function timestampToSeconds(timestamp = '00:00:00') {
  const [hours = 0, minutes = 0, seconds = 0] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function getCueStartSeconds(cue) {
  return timestampToSeconds(cue?.timestamp);
}

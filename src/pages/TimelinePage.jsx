import { ScreenContainer } from '../components/layout/ScreenContainer.jsx';
import { TimelineSequencer } from '../features/timeline/TimelineSequencer.jsx';

export function TimelinePage() {
  return (
    <ScreenContainer
      eyebrow="Sequencer"
      title="Production Timeline"
      description="Horizontal theatrical timeline with department tracks, cue markers, draggable playhead, zoom, and playback simulation."
      size="full"
    >
      <TimelineSequencer />
    </ScreenContainer>
  );
}

import { ScreenContainer } from '../components/layout/ScreenContainer.jsx';
import { OperatorPanel } from '../features/operator/OperatorPanel.jsx';

export function OperatorPage() {
  return (
    <ScreenContainer
      eyebrow="Backstage operator"
      title="Show Control Panel"
      description="Cue stack, transport controls, current cue monitoring, and keyboard-driven operation for rehearsal and live playback."
      size="full"
    >
      <OperatorPanel />
    </ScreenContainer>
  );
}

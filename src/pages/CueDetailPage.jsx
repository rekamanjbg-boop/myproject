import { useParams } from 'react-router-dom';
import { PlaceholderPage } from '../components/layout/PlaceholderPage.jsx';

export function CueDetailPage() {
  const { cueId } = useParams();

  return (
    <PlaceholderPage
      eyebrow="Cue inspection"
      title={`Cue ${cueId}`}
      description="Cue detail route placeholder. Cue metadata, notes, and status inspection will be implemented later."
    />
  );
}

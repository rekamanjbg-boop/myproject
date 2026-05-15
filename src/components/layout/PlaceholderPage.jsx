import { ScreenContainer } from './ScreenContainer.jsx';

export function PlaceholderPage({ eyebrow, title, description }) {
  return (
    <ScreenContainer eyebrow={eyebrow} title={title}>
      <section className="glass-panel rounded-lg p-6">
        <p className="max-w-3xl text-lg leading-8 text-violet-100/75">{description}</p>
      </section>
    </ScreenContainer>
  );
}

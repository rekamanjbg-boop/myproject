import { PlaceholderPage } from '../components/layout/PlaceholderPage.jsx';
import { SyncStatusPanel } from '../components/integration/SyncStatusPanel.jsx';

export function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-200/60">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Mencari Taman</h1>
      </div>
      <div className="space-y-5">
        <SyncStatusPanel />
        <PlaceholderPage
          eyebrow="Production"
          title="Show Monitor"
          description="Production summaries and show status will be implemented in a later phase. REAPER remains the master playback source."
        />
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

export function AppShell() {
  return (
    <div className="min-h-screen overflow-hidden bg-theater-blackout text-violet-50">
      <div className="pointer-events-none fixed inset-0 stage-grid opacity-70" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(139,92,246,0.22),transparent_28rem),radial-gradient(circle_at_88%_92%,rgba(34,211,238,0.1),transparent_24rem)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

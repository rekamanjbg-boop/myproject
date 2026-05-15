import { NavLink } from 'react-router-dom';
import { SyncStatusPanel } from '../integration/SyncStatusPanel.jsx';
import { navItems } from './Sidebar.jsx';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-theater-line bg-theater-blackout/80 px-4 py-3 backdrop-blur-xl sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/60">Live performance system</p>
        <h2 className="text-xl font-semibold text-white">Production Control</h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <SyncStatusPanel compact />
      </div>
      </div>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'border-violet-300/35 bg-violet-500/20 text-white'
                  : 'border-theater-line bg-white/5 text-violet-100/70',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

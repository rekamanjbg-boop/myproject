import { NavLink } from 'react-router-dom';

export const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/operator', label: 'Operator' },
  { to: '/prompter', label: 'Prompter' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/rehearsal', label: 'Rehearsal' },
  { to: '/settings', label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-theater-line bg-black/35 px-4 py-5 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="mb-8 rounded-lg border border-theater-line bg-white/5 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-200/70">Show Sequencer</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Mencari Taman</h1>
        <p className="mt-3 text-sm leading-6 text-violet-100/60">Live theater frontend scaffold</p>
      </div>
      <nav className="space-y-2" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'block rounded-lg border px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'border-violet-300/35 bg-violet-500/20 text-white shadow-glow'
                  : 'border-transparent text-violet-100/70 hover:border-theater-line hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-theater-line bg-black/35 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-200/60">System</p>
        <p className="mt-2 text-sm font-semibold text-white">Frontend Shell</p>
        <p className="mt-1 text-xs leading-5 text-violet-100/55">Prepared for operator, timeline, and fullscreen display modules.</p>
      </div>
    </aside>
  );
}

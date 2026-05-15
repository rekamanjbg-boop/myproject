import { formatDuration } from '../../utils/time.js';

export function TimelinePlayhead({ left, seconds }) {
  return (
    <div className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.85)]" style={{ left: `${left}%` }}>
      <div className="-ml-3 flex flex-col items-center">
        <div className="h-5 w-5 rounded-full border border-cyan-100 bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.9)]" />
        <span className="mt-1 rounded-md bg-cyan-300 px-2 py-1 font-mono text-xs font-semibold text-black">{formatDuration(seconds)}</span>
      </div>
    </div>
  );
}

import { useMemo, useRef } from 'react';
import { cueDepartments, production, productionCues } from '../../data/productionMockData.js';
import { TimelinePlayhead } from '../../components/timeline/TimelinePlayhead.jsx';
import { TimelineRuler } from '../../components/timeline/TimelineRuler.jsx';
import { TimelineToolbar } from '../../components/timeline/TimelineToolbar.jsx';
import { TimelineTrack } from '../../components/timeline/TimelineTrack.jsx';
import { useTimelinePlaybackSync } from '../../hooks/useTimelinePlaybackSync.js';
import { useCueStore } from '../../store/cueStore.js';
import { usePlaybackStore } from '../../store/playbackStore.js';
import { useTimelineStore } from '../../store/timelineStore.js';
import { getCueStartSeconds, timestampToSeconds } from '../../utils/time.js';

export function TimelineSequencer() {
  useTimelinePlaybackSync();

  const timelineRef = useRef(null);
  const zoom = useTimelineStore((state) => state.zoom);
  const playheadSeconds = useTimelineStore((state) => state.playheadSeconds);
  const setPlayheadSeconds = useTimelineStore((state) => state.setPlayheadSeconds);
  const setDraggingPlayhead = useTimelineStore((state) => state.setDraggingPlayhead);
  const currentCueIndex = usePlaybackStore((state) => state.currentCueIndex);
  const loadCueAtTime = usePlaybackStore((state) => state.loadCueAtTime);
  const loadCueIndex = usePlaybackStore((state) => state.loadCueIndex);
  const setSelectedCueId = useCueStore((state) => state.setSelectedCueId);
  const runtimeSeconds = timestampToSeconds(production.runtime);
  const activeCue = productionCues[currentCueIndex];
  const playheadLeft = Math.min(100, (playheadSeconds / runtimeSeconds) * 100);

  const tracks = useMemo(
    () =>
      Object.entries(cueDepartments).map(([department, meta]) => ({
        department,
        meta,
        cues: productionCues.filter((cue) => cue.type === department),
      })),
    [],
  );

  function setPlayheadFromPointer(event) {
    const element = timelineRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const nextSeconds = Math.round(runtimeSeconds * ratio);

    setPlayheadSeconds(nextSeconds);
    loadCueAtTime(nextSeconds);
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingPlayhead(true);
    setPlayheadFromPointer(event);
  }

  function handlePointerMove(event) {
    if (event.buttons !== 1) return;
    setPlayheadFromPointer(event);
  }

  function handlePointerUp(event) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDraggingPlayhead(false);
    setPlayheadFromPointer(event);
  }

  function selectCue(cue) {
    const cueIndex = productionCues.findIndex((item) => item.id === cue.id);
    setSelectedCueId(cue.id);
    loadCueIndex(cueIndex);
    setPlayheadSeconds(getCueStartSeconds(cue));
  }

  return (
    <section className="glass-panel rounded-lg p-4">
      <TimelineToolbar />
      <div className="overflow-x-auto rounded-lg border border-theater-line bg-black/40">
        <div
          ref={timelineRef}
          className="relative cursor-crosshair select-none"
          style={{ width: `${100 * zoom}%`, minWidth: '76rem' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <TimelineRuler runtimeSeconds={runtimeSeconds} />
          <TimelinePlayhead left={playheadLeft} seconds={playheadSeconds} />
          <div className="relative">
            {tracks.map((track) => (
              <TimelineTrack
                key={track.department}
                department={track.department}
                meta={track.meta}
                cues={track.cues}
                runtimeSeconds={runtimeSeconds}
                activeCueId={activeCue?.id}
                onCueSelect={selectCue}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-theater-line bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-200/60">Active Cue</p>
          <p className="mt-2 truncate text-lg font-semibold text-white">{activeCue?.title ?? 'No cue'}</p>
        </div>
        <div className="rounded-lg border border-theater-line bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-200/60">Department</p>
          <p className="mt-2 text-lg font-semibold text-white">{activeCue?.type ?? 'STANDBY'}</p>
        </div>
        <div className="rounded-lg border border-theater-line bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-200/60">Runtime</p>
          <p className="mt-2 font-mono text-lg font-semibold text-white">{production.runtime}</p>
        </div>
      </div>
    </section>
  );
}

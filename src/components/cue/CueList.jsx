import { useMemo } from 'react';
import { cueDepartments } from '../../data/productionMockData.js';
import { useCueStore } from '../../store/cueStore.js';
import { usePlaybackStore } from '../../store/playbackStore.js';
import { CueRow } from './CueRow.jsx';

export function CueList() {
  const allCues = useCueStore((state) => state.cues);
  const departmentFilter = useCueStore((state) => state.departmentFilter);
  const setDepartmentFilter = useCueStore((state) => state.setDepartmentFilter);
  const setSelectedCueId = useCueStore((state) => state.setSelectedCueId);
  const getCueIndexById = useCueStore((state) => state.getCueIndexById);
  const currentCueIndex = usePlaybackStore((state) => state.currentCueIndex);
  const loadCueIndex = usePlaybackStore((state) => state.loadCueIndex);
  const currentCueId = allCues[currentCueIndex]?.id;
  const cues = useMemo(
    () => (departmentFilter === 'ALL' ? allCues : allCues.filter((cue) => cue.type === departmentFilter)),
    [allCues, departmentFilter],
  );

  function loadCue(cueId) {
    setSelectedCueId(cueId);
    loadCueIndex(getCueIndexById(cueId));
  }

  return (
    <section className="glass-panel rounded-lg p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Cue List</h2>
          <p className="text-sm text-violet-100/55">{cues.length} cues visible</p>
        </div>
        <select
          value={departmentFilter}
          onChange={(event) => setDepartmentFilter(event.target.value)}
          className="rounded-lg border border-theater-line bg-black/50 px-3 py-2 text-sm text-violet-50"
          aria-label="Filter cues by department"
        >
          <option value="ALL">All Departments</option>
          {Object.entries(cueDepartments).map(([department, meta]) => (
            <option key={department} value={department}>
              {meta.label}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-[39rem] space-y-2 overflow-auto pr-1">
        {cues.map((cue) => (
          <CueRow
            key={cue.id}
            cue={cue}
            isCurrent={cue.id === currentCueId}
            onLoad={() => loadCue(cue.id)}
          />
        ))}
      </div>
    </section>
  );
}

import { create } from 'zustand';
import { productionCues } from '../data/productionMockData.js';

export const useCueStore = create((set, get) => ({
  cues: productionCues,
  selectedCueId: productionCues[0]?.id ?? null,
  departmentFilter: 'ALL',
  setSelectedCueId: (selectedCueId) => set({ selectedCueId }),
  setDepartmentFilter: (departmentFilter) => set({ departmentFilter }),
  getSelectedCue: () => get().cues.find((cue) => cue.id === get().selectedCueId) ?? null,
  getCueByIndex: (index) => get().cues[index] ?? null,
  getCueIndexById: (cueId) => get().cues.findIndex((cue) => cue.id === cueId),
  getFilteredCues: () => {
    const { cues, departmentFilter } = get();
    return departmentFilter === 'ALL' ? cues : cues.filter((cue) => cue.type === departmentFilter);
  },
}));

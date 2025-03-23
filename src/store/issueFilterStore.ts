import { create } from "zustand";

type IssueFilterState = {
  selectedAssignees: string | null;
  selectedMilestone: number | null;
  selectedLabel: string[];
  keyword: string;
  setSelectedAssignees: (assignees: string | null) => void;
  setSelectedMilestone: (milestone: number | null) => void;
  setSelectedLabel: (labels: string[]) => void;
  setKeyword: (keyword: string) => void;
};

export const useIssueFilterStore = create<IssueFilterState>((set) => ({
  selectedAssignees: null,
  selectedMilestone: null,
  selectedLabel: [],
  keyword: "",
  setSelectedAssignees: (assignees) => set({ selectedAssignees: assignees }),
  setSelectedMilestone: (milestone) => set({ selectedMilestone: milestone }),
  setSelectedLabel: (labels) => set({ selectedLabel: labels }),
  setKeyword: (keyword) => set({ keyword: keyword }),
}));

import { create } from "zustand";

import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser } from "@/schemas/github-user";

interface GitHubMetaState {
  assignees?: GitHubSimpleUser[];
  labels?: GitHubLabel[];
  milestones?: GitHubMilestone[];
  setAssignees: (assignees: GitHubSimpleUser[]) => void;
  setLabels: (labels: GitHubLabel[]) => void;
  setMilestones: (milestones: GitHubMilestone[]) => void;
}

export const useGitHubMetaStore = create<GitHubMetaState>((set) => ({
  assignees: undefined,
  labels: undefined,
  milestones: undefined,
  setAssignees: (assignees) => set({ assignees }),
  setLabels: (labels) => set({ labels }),
  setMilestones: (milestones) => set({ milestones }),
}));

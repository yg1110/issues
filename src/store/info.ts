import { create } from "zustand";

interface InfoState {
  user: string;
  repo: string;
  updateInfo: (user: string, repo: string) => void;
}

export const useInfoStore = create<InfoState>((set) => ({
  user: import.meta.env.VITE_INITIAL_GITHUB_OWNER,
  repo: import.meta.env.VITE_INITIAL_GITHUB_REPO,
  updateInfo: () => set((state) => ({ user: state.user, repo: state.repo })),
}));

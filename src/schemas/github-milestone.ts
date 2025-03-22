import { GitHubSimpleUser } from "./github-user";

export interface GitHubMilestonesRequest {
  owner: string;
  repo: string;
}

export interface GitHubUpdateMilestoneRequest extends GitHubMilestonesRequest {
  token: string;
  issueNumber: number;
  milestone: string;
}

export interface GitHubMilestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string | null;
  creator: GitHubSimpleUser;
  open_issues: number;
  closed_issues: number;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  due_on: string | null;
  closed_at: string | null;
}

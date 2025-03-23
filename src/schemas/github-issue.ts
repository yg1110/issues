import { GitHubLabel } from "./github-label";
import { GitHubMilestone } from "./github-milestone";
import { GitHubSimpleUser } from "./github-user";

export interface GitHubIssuesRequest {
  owner: string;
  repo: string;
  page: number;
}

export interface GitHubIssueRequest {
  id: number;
  owner: string;
  repo: string;
}

export interface GitHubCreateIssueRequest {
  owner: string;
  repo: string;
  title?: string;
  body?: string;
  assignees?: string[];
  milestone?: number | null;
  labels?: string[];
  state?: "open" | "closed";
}

export interface GitHubUpdateIssueRequest extends GitHubCreateIssueRequest {
  id: number;
}

export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubSimpleUser;
  labels: GitHubLabel[];
  state: "open" | "closed";
  locked: boolean;
  assignee: GitHubSimpleUser | null;
  assignees: GitHubSimpleUser[];
  milestone: GitHubMilestone | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  sub_issues_summary: SubIssuesSummary;
  active_lock_reason: string | null;
  body: string | null;
  closed_by: GitHubSimpleUser | null;
  reactions: GitHubReactions;
  timeline_url: string;
  state_reason: string | null;
}

export interface SubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface GitHubReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

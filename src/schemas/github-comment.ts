import { GitHubReactions } from "./github-issue";
import { GitHubSimpleUser } from "./github-user";

export interface GitHubCommentRequest {
  owner: string;
  repo: string;
  issueNumber: number;
}

export interface GitHubCommentChangeRequest extends GitHubCommentRequest {
  token?: string;
  body?: string;
}

export interface GitHubComment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: GitHubSimpleUser;
  created_at: string;
  updated_at: string;
  author_association: "CONTRIBUTOR" | "MEMBER" | "OWNER" | "NONE" | string;
  body: string;
  reactions: GitHubReactions;
}

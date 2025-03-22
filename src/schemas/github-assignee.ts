export interface GitHubAssigneesRequest {
  owner: string;
  repo: string;
}
export interface GitHubUpdateAssigneesRequest extends GitHubAssigneesRequest {
  token: string;
  issueNumber: number;
  assignees: string[];
}

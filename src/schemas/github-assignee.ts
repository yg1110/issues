export interface GitHubAssigneesRequest {
  owner: string;
  repo: string;
}
export interface GitHubUpdateAssigneesRequest extends GitHubAssigneesRequest {
  issueNumber: number;
  assignees: string[];
}

export interface GitHubLabelsRequest {
  owner: string;
  repo: string;
}

export interface GitHubUpdateLabelsRequest extends GitHubLabelsRequest {
  token: string;
  issueNumber: number;
  labels: string[];
}

export interface GitHubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

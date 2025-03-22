import { GitHubUpdateAssigneesRequest } from "@/schemas/github-assignee";

import { ApiResult } from "../api-result";

type Request = GitHubUpdateAssigneesRequest;
export const postGithubAssignees = async (request: Request): Promise<ApiResult<void>> => {
  const { owner, repo, issueNumber, ...rest } = request;
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/assignees`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN ? `token ${import.meta.env.VITE_GITHUB_TOKEN}` : "",
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      return {
        status: "success",
        data: result,
      };
    } else {
      if (result.message) {
        return {
          status: "error",
          error: result.message,
        };
      }
      return {
        status: "error",
        error: "데이터 형식이 올바르지 않습니다.",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        error: error.message,
      };
    }

    return {
      status: "error",
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
};

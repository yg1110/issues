import { GithubIssueCount, GithubIssueCountRequest } from "@/schemas/github-issue";

import { ApiResult } from "../api-result";

export const getIssueCount = async (request: GithubIssueCountRequest): Promise<ApiResult<GithubIssueCount>> => {
  try {
    const headers = {
      Authorization: import.meta.env.VITE_GITHUB_TOKEN ? `token ${import.meta.env.VITE_GITHUB_TOKEN}` : "",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };

    const [openRes, closedRes] = await Promise.all([
      fetch(`https://api.github.com/search/issues?q=repo:${request.owner}/${request.repo}+type:issue+state:open`, {
        headers,
      }),
      fetch(`https://api.github.com/search/issues?q=repo:${request.owner}/${request.repo}+type:issue+state:closed`, {
        headers,
      }),
    ]);

    const openJson = await openRes.json();
    const closedJson = await closedRes.json();
    if (openJson && closedJson) {
      return {
        status: "success",
        data: {
          openCount: openJson.total_count,
          closedCount: closedJson.total_count,
        },
      };
    } else {
      if (openJson.message) {
        return {
          status: "error",
          error: openJson.message,
        };
      }
      if (closedJson.message) {
        return {
          status: "error",
          error: closedJson.message,
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

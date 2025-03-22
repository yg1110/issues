import { GitHubComment, GitHubCommentRequest } from "@/schemas/github-comment";

import { ApiResult } from "../api-result";

type Response = GitHubComment[];
type Request = GitHubCommentRequest;
export const getGithubComments = async (request: Request): Promise<ApiResult<Response>> => {
  try {
    const url = `https://api.github.com/repos/${request.owner}/${request.repo}/issues/${request.issueNumber}/comments`;

    const response = await fetch(url);
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

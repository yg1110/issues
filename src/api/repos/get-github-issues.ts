import { GitHubIssue, GitHubIssuesRequest } from "../../schemas/github-issue";
import { ApiResult } from "../api-result";

type Response = GitHubIssue[];
type Request = GitHubIssuesRequest;
export const getGithubIssues = async (request: Request): Promise<ApiResult<Response>> => {
  try {
    const url = `https://api.github.com/repos/${request.owner}/${request.repo}/issues?page=${request.page}`;

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      return {
        status: "success",
        data: result,
      };
    } else {
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

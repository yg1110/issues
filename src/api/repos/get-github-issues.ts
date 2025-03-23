import { GitHubIssue, GitHubIssuesRequest } from "@/schemas/github-issue";
import { buildGithubIssuesQueryString } from "@/shared/utils";

import { ApiResult } from "../api-result";

type Response = GitHubIssue[];
type Request = GitHubIssuesRequest;

export const getGithubIssues = async (request: Request): Promise<ApiResult<Response>> => {
  try {
    const { owner, repo, keyword, ...rest } = request;
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
      Authorization: token ? `token ${token}` : "",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    };

    let url = "";
    if (keyword) {
      // 검색어가 있는 경우: /search/issues 사용
      const queryParts = [`${keyword}`, `repo:${owner}/${repo}`];

      if (rest.state) queryParts.push(`state:${rest.state}`);
      if (rest.assignee) queryParts.push(`assignee:${rest.assignee}`);
      if (rest.milestone !== null && rest.milestone !== undefined) queryParts.push(`milestone:${rest.milestone}`);
      if (rest.labels && rest.labels.length > 0) {
        queryParts.push(...rest.labels.map((label) => `label:"${label}"`));
      }

      const searchParams = new URLSearchParams({
        q: queryParts.join(" "),
        per_page: String(rest.per_page || 10),
        page: String(rest.page || 1),
      });

      url = `https://api.github.com/search/issues?${searchParams.toString()}`;
    } else {
      // 검색어가 없는 경우: /repos/:owner/:repo/issues 사용
      const queryParams = buildGithubIssuesQueryString(rest);
      url = `https://api.github.com/repos/${owner}/${repo}/issues?${queryParams}`;
    }

    const response = await fetch(url, { headers });
    const result = await response.json();

    if (response.ok) {
      const data = keyword ? result.items : result;
      return {
        status: "success",
        data,
      };
    } else {
      return {
        status: "error",
        error: result?.message ?? "데이터 형식이 올바르지 않습니다.",
      };
    }
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다.",
    };
  }
};

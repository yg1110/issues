import { useQuery } from "@tanstack/react-query";

import { getGithubIssues } from "../../../../api/repos/get-github-issues";
import { GitHubIssuesRequest } from "../../../../schemas/github-issue";

export const useGithubIssues = (request: GitHubIssuesRequest) => {
  return useQuery({
    queryKey: ["githubIssues", request],
    queryFn: async () => {
      const res = await getGithubIssues(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};

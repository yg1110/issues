import { useQuery } from "@tanstack/react-query";

import { getGithubComments } from "../../../../../api/repos/get-github-comments";
import { GitHubCommentRequest } from "../../../../../schemas/github-comment";

export const useGithubComments = (request: GitHubCommentRequest) => {
  return useQuery({
    queryKey: ["githubComments", request],
    queryFn: async () => {
      const res = await getGithubComments(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: request.issueNumber !== 0,
  });
};

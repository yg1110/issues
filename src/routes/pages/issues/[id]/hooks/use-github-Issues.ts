import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubIssue } from "../../../../../api/repos/get-github-issue";
import { GitHubIssueRequest } from "../../../../../schemas/github-issue";

export const useGithubIssue = (request: GitHubIssueRequest) => {
  return useQuery({
    queryKey: ["githubIssue", request],
    queryFn: async () => {
      const res = await getGithubIssue(request);
      if (res.status === "error") {
        toast(res.error, {
          duration: 2000,
          position: "bottom-center",
        });
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: request.id !== 0,
  });
};

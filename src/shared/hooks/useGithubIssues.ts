import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubIssues } from "@/api/repos/get-github-issues";
import { GitHubIssuesRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubIssues = (request: GitHubIssuesRequest) => {
  return useQuery({
    queryKey: ["githubIssues", request],
    queryFn: async () => {
      const res = await getGithubIssues(request);
      if (res.status === "error") {
        toast(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};

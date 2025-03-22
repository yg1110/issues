import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubIssue } from "@/api/repos/get-github-issue";
import { GitHubIssueRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubIssue = (request: GitHubIssueRequest) => {
  return useQuery({
    queryKey: ["githubIssue", request],
    queryFn: async () => {
      const res = await getGithubIssue(request);
      if (res.status === "error") {
        toast(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: request.id !== 0,
  });
};

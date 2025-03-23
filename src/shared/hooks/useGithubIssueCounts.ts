import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getIssueCount } from "@/api/repos/get-issue-count";
import { GithubIssueCountRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubIssueCount = (request: GithubIssueCountRequest) => {
  return useQuery({
    queryKey: ["issueCount", request],
    queryFn: async () => {
      const res = await getIssueCount(request);
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

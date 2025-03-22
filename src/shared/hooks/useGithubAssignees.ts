import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubAssignees } from "@/api/repos/get-github-assignees";
import { GitHubAssigneesRequest } from "@/schemas/github-assignees";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubAssignees = (request: GitHubAssigneesRequest) => {
  return useQuery({
    queryKey: ["githubAssignees", request],
    queryFn: async () => {
      const res = await getGithubAssignees(request);
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

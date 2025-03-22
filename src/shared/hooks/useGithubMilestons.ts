import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubMilestones } from "@/api/repos/get-github-milestons";
import { GitHubMilestonesRequest } from "@/schemas/github-milestone";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubMilestones = (request: GitHubMilestonesRequest) => {
  return useQuery({
    queryKey: ["githubMilestones", request],
    queryFn: async () => {
      const res = await getGithubMilestones(request);
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

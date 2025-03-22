import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { putGithubMileStone } from "@/api/repos/put-github-milestone";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubUpdateMilestoneRequest } from "@/schemas/github-milestone";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useUpdateGithubMilestone = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (request: GitHubUpdateMilestoneRequest) => {
      const res = await putGithubMileStone(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["githubIssue"],
      });
      queryClient.invalidateQueries({
        queryKey: ["githubIssues"],
      });
      queryClient.invalidateQueries({
        queryKey: ["githubMilestones"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postGithubAssignees } from "@/api/repos/post-github-assignees";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubUpdateAssigneesRequest } from "@/schemas/github-assignee";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useUpdateGithubAssignees = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (request: GitHubUpdateAssigneesRequest) => {
      const res = await postGithubAssignees(request);
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
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
    },
  });
};

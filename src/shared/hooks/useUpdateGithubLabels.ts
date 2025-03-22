import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { putGithubLabels } from "@/api/repos/put-github-labels";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubUpdateLabelsRequest } from "@/schemas/github-label";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useUpdateGithubLabels = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (request: GitHubUpdateLabelsRequest) => {
      const res = await putGithubLabels(request);
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
        queryKey: ["githubLabels"],
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

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { patchGithubIssue } from "@/api/repos/patch-github-issue";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubUpdateIssueRequest } from "@/schemas/github-issue";

import { usePageInfoWithHelmet } from "./usePageInfoWithHelmet";

export const useUpdateGithubIssue = () => {
  const queryClient = getQueryClient();
  const { user, repo } = usePageInfoWithHelmet();

  return useMutation({
    mutationFn: async (request: GitHubUpdateIssueRequest) => {
      const res = await patchGithubIssue(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("이슈가 수정되었습니다.", {
        duration: 2000,
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["githubIssue"],
      });
      setTimeout(() => {
        window.location.href = `${user}/${repo}/issues`;
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        position: "top-right",
      });
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postGithubIssue } from "@/api/repos/post-github-issue";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubChangeIssueRequest } from "@/schemas/github-issue";

import { usePageInfoWithHelmet } from "./usePageInfoWithHelmet";

export const useCreateGithubIssue = () => {
  const queryClient = getQueryClient();
  const { user, repo } = usePageInfoWithHelmet();

  return useMutation({
    mutationFn: async (request: GitHubChangeIssueRequest) => {
      const res = await postGithubIssue(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("이슈가 등록되었습니다.", {
        duration: 2000,
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["githubIssues"],
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

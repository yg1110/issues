import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postGithubIssue } from "@/api/repos/post-github-issue";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubCreateIssueRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";
import { usePageInfoWithHelmet } from "./usePageInfoWithHelmet";

export const useCreateGithubIssue = () => {
  const queryClient = getQueryClient();
  const { user, repo } = usePageInfoWithHelmet();

  return useMutation({
    mutationFn: async (request: GitHubCreateIssueRequest) => {
      const res = await postGithubIssue(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("이슈가 등록되었습니다.", {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
      queryClient.invalidateQueries({
        queryKey: ["githubIssues"],
      });
      setTimeout(() => {
        window.location.href = `${user}/${repo}/issues?state=open`;
      }, TOAST_DURATION);
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
    },
  });
};

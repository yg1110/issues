import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { patchGithubIssue } from "@/api/repos/patch-github-issue";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubUpdateIssueRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";
import { usePageInfoWithHelmet } from "./usePageInfoWithHelmet";

interface Props {
  issueNumber: number;
  options?: { shouldRedirect?: boolean };
}
export const useUpdateGithubIssue = ({ issueNumber, options }: Props) => {
  const queryClient = getQueryClient();
  const { user, repo } = usePageInfoWithHelmet();

  const mutation = useMutation({
    mutationFn: async (request: GitHubUpdateIssueRequest) => {
      const res = await patchGithubIssue(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("이슈가 수정되었습니다.", {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
      queryClient.invalidateQueries({
        queryKey: ["githubIssue"],
      });
      if (options?.shouldRedirect) {
        setTimeout(() => {
          window.location.href = `${user}/${repo}/issues/${issueNumber}`;
        }, TOAST_DURATION);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      });
    },
  });

  return {
    ...mutation,
    safeMutate: (req: GitHubUpdateIssueRequest) => {
      if (issueNumber > 0) {
        mutation.mutate(req);
      } else {
        toast.error("유효하지 않은 이슈 번호입니다.");
      }
    },
  };
};

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postGithubComment } from "@/api/repos/post-github-comment";
import { getQueryClient } from "@/lib/tanstack-query/client";
import { GitHubCommentChangeRequest } from "@/schemas/github-comment";

export const useCreateGithubComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async (request: GitHubCommentChangeRequest) => {
      const res = await postGithubComment(request);
      if (res.status === "error") {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("댓글이 등록되었습니다.", {
        duration: 2000,
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["githubComments"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        position: "top-right",
      });
    },
  });
};

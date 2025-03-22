import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubComments } from "@/api/repos/get-github-comments";
import { GitHubCommentRequest } from "@/schemas/github-comment";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubComments = (request: GitHubCommentRequest) => {
  return useQuery({
    queryKey: ["githubComments", request],
    queryFn: async () => {
      const res = await getGithubComments(request);
      if (res.status === "error") {
        toast(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: request.issueNumber !== 0,
  });
};

import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubIssues } from "@/api/repos/get-github-issues";
import { GitHubIssuesRequest } from "@/schemas/github-issue";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useInfinityGithubIssues = (request: GitHubIssuesRequest) => {
  return useInfiniteQuery({
    queryKey: ["githubIssues", request],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getGithubIssues({ ...request, page: pageParam });
      if (res.status === "error") {
        toast.error(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return {
        data: res.data,
        nextPage: res.data.length > 0 ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

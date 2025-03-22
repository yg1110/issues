import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubLabels } from "@/api/repos/get-github-labels";
import { GitHubLabelsRequest } from "@/schemas/github-labels";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubLabels = (request: GitHubLabelsRequest) => {
  return useQuery({
    queryKey: ["githubLabels", request],
    queryFn: async () => {
      const res = await getGithubLabels(request);
      if (res.status === "error") {
        toast(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return res.data;
    },
  });
};

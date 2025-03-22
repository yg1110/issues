import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubUser } from "@/api/user/get-github-user";

import { TOAST_DURATION, TOAST_POSITION } from "../utils/constants";

export const useGithubUser = (token: string) => {
  return useQuery({
    queryKey: ["githubUser", token],
    queryFn: async () => {
      const res = await getGithubUser(token);
      if (res.status === "error") {
        toast(res.error, {
          duration: TOAST_DURATION,
          position: TOAST_POSITION,
        });
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: token !== "",
  });
};

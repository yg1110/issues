import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getGithubUser } from "@/api/user/get-github-user";

export const useGithubUser = (token: string) => {
  return useQuery({
    queryKey: ["githubUser", token],
    queryFn: async () => {
      const res = await getGithubUser(token);
      if (res.status === "error") {
        toast(res.error, {
          duration: 2000,
          position: "top-right",
        });
        throw new Error(res.error);
      }
      return res.data;
    },
    enabled: token !== "",
  });
};

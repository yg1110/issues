import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { useInfoStore } from "@/store/info";

export function usePageInfoWithHelmet() {
  const { user: userParam, repo: repoParam } = useParams<Record<string, string>>();
  const { user, repo, updateInfo } = useInfoStore();

  useEffect(() => {
    if (!userParam || !repoParam) return;
    if (userParam === user && repoParam === repo) return;
    updateInfo(userParam, repoParam);
  }, [userParam, repoParam, user, repo]);

  const HelmetTitle = (
    <Helmet>
      <title>{`Issues · ${user}/${repo}`}</title>
    </Helmet>
  );

  return { user, repo, HelmetTitle };
}

import { useParams } from "react-router-dom";

import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfo";
import { useGithubIssue } from "./hooks/use-github-Issues";

export default function IssuesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();

  const { data: issue } = useGithubIssue({
    id: id ? Number(id) : 0,
    owner: user,
    repo: repo,
  });

  return (
    <div>
      {HelmetTitle}
      {id}
    </div>
  );
}

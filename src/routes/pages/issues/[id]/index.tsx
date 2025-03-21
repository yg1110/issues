import { useParams } from "react-router-dom";

import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfo";
import IssueBody from "./components/IssueBody";
import IssueTitle from "./components/IssueTitle";
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
      {issue && (
        <div className="max-w-6xl mx-auto px-4 pt-2">
          <IssueTitle title={issue.title} />
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <IssueBody {...issue} />
          </div>
        </div>
      )}
    </div>
  );
}

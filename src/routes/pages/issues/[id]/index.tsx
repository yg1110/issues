import { useParams } from "react-router-dom";

import IssuesTabLabel from "../../../../shared/components/IssuesTabLabel";
import TabList from "../../../../shared/components/TabList";
import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfo";
import IssueDetail from "./components/IssueDetail";
import { useGithubIssue } from "./hooks/use-github-Issues";

export default function IssuesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();

  const { data: issue } = useGithubIssue({
    id: id ? Number(id) : 0,
    owner: user,
    repo: repo,
  });

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssueDetail issue={issue} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

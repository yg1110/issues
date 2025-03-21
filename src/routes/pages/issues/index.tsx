import IssuesTabLabel from "../../../shared/components/IssuesTabLabel";
import TabList from "../../../shared/components/TabList";
import { usePageInfoWithHelmet } from "../../../shared/hooks/usePageInfo";
import IssuesList from "./components/IssuesList";
import { useGithubIssues } from "./hooks/use-github-Issues";

export default function IssuesPage() {
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();
  const { data: issues } = useGithubIssues({
    owner: user,
    repo: repo,
    page: 1,
  });

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesList issues={issues} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

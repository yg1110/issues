import TabList from "../../../shared/components/TabList";
import IssuesTabContents from "./components/IssuesTabContents";
import IssuesTabLabel from "./components/IssuesTabLabel";
import { useGithubIssues } from "./hooks/use-github-Issues";

export default function IssuesPage() {
  const { data: issues } = useGithubIssues({
    owner: "yg1110",
    repo: "issues",
    page: 1,
  });

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesTabContents issues={issues} />,
    },
  ];

  return (
    <div>
      <TabList tabs={tabs} />
    </div>
  );
}

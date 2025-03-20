import { Helmet } from "react-helmet-async";

import TabList from "../../../shared/components/TabList";
import IssuesTabContents from "./components/IssuesTabContents";
import IssuesTabLabel from "./components/IssuesTabLabel";
import { useGithubIssues } from "./hooks/use-github-Issues";

export default function IssuesPage() {
  const { data: issues } = useGithubIssues({
    owner: import.meta.env.VITE_GITHUB_OWNER,
    repo: import.meta.env.VITE_GITHUB_REPO,
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
      <Helmet>
        <title>
          {`Issues · ${import.meta.env.VITE_GITHUB_OWNER}/${
            import.meta.env.VITE_GITHUB_REPO
          }`}
        </title>
      </Helmet>
      <TabList tabs={tabs} />
    </div>
  );
}

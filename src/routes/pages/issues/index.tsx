import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import TabList from "../../../shared/components/TabList";
import { useInfoStore } from "../../../store/info";
import IssuesTabContents from "./components/IssuesTabContents";
import IssuesTabLabel from "./components/IssuesTabLabel";
import { useGithubIssues } from "./hooks/use-github-Issues";

export default function IssuesPage() {
  const { user: userParam, repo: repoPram } = useParams<Record<string, string>>();
  const { user, repo, updateInfo } = useInfoStore();
  const { data: issues } = useGithubIssues({
    owner: user,
    repo: repo,
    page: 1,
  });

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesTabContents issues={issues} />,
    },
  ];

  useEffect(() => {
    if (!userParam || !repoPram) return;
    updateInfo(userParam, repoPram);
  }, [userParam, repoPram]);

  return (
    <div>
      <Helmet>
        <title>{`Issues · ${user}/${repo}`}</title>
      </Helmet>
      <TabList tabs={tabs} />
    </div>
  );
}

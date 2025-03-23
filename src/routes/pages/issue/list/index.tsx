import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { useGithubIssueCount } from "@/shared/hooks/useGithubIssueCounts";
import { useInfinityGithubIssues } from "@/shared/hooks/useInfinityGithubIssues";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import IssuesList from "./components/IssuesList";

export default function IssuesPage() {
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();
  const { data: issueCount } = useGithubIssueCount({
    owner: user,
    repo: repo,
  });
  const infinityGithubIssues = useInfinityGithubIssues({
    owner: user,
    repo: repo,
    page: 1,
    per_page: 20,
  });

  const issues = infinityGithubIssues.data?.pages.flatMap((page) => page.data) ?? [];

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesList issues={issues} issueCount={issueCount} {...infinityGithubIssues} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGithubAssignees } from "@/shared/hooks/useGithubAssignees";
import { useGithubIssueCount } from "@/shared/hooks/useGithubIssueCounts";
import { useGithubLabels } from "@/shared/hooks/useGithubLabels";
import { useGithubMilestones } from "@/shared/hooks/useGithubMilestons";
import { useInfinityGithubIssues } from "@/shared/hooks/useInfinityGithubIssues";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";
import { useGitHubMetaStore } from "@/store/githubMeta";
import { useIssueFilterStore } from "@/store/issueFilterStore";

import IssuesList from "./components/IssuesList";

export default function IssuesPage() {
  const [searchParams] = useSearchParams();
  const stateParam = searchParams.get("state") || "open";

  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();
  const { setAssignees, setLabels, setMilestones } = useGitHubMetaStore();
  const { selectedAssignees, selectedMilestone, selectedLabel, keyword } = useIssueFilterStore();

  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: issueCount } = useGithubIssueCount({
    owner: user,
    repo: repo,
  });
  const infinityGithubIssues = useInfinityGithubIssues({
    owner: user,
    repo: repo,
    page: 1,
    per_page: 20,
    state: stateParam as "open" | "closed",
    assignee: selectedAssignees,
    milestone: selectedMilestone,
    labels: selectedLabel,
    keyword: debouncedKeyword,
  });
  const { data: assignees } = useGithubAssignees({
    owner: user,
    repo: repo,
  });
  const { data: labels } = useGithubLabels({
    owner: user,
    repo: repo,
  });
  const { data: milestones } = useGithubMilestones({
    owner: user,
    repo: repo,
  });

  const issues = infinityGithubIssues.data?.pages.flatMap((page) => page.data) ?? [];

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesList issues={issues} issueCount={issueCount} {...infinityGithubIssues} />,
    },
  ];

  useEffect(() => {
    if (assignees) setAssignees(assignees);
    if (labels) setLabels(labels);
    if (milestones) setMilestones(milestones);
  }, [assignees, labels, milestones]);

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

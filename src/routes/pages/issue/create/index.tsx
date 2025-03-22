import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { useGithubAssignees } from "@/shared/hooks/useGithubAssignees";
import { useGithubLabels } from "@/shared/hooks/useGithubLabels";
import { useGithubMilestones } from "@/shared/hooks/useGithubMilestons";
import { useGithubUser } from "@/shared/hooks/useGithubUser";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import IssueCreate from "./components/IssueCreate";

export default function IssuesCreatePage() {
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();

  const { data: userInfo } = useGithubUser(import.meta.env.VITE_GITHUB_TOKEN);
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

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssueCreate userInfo={userInfo} assignees={assignees} labels={labels} milestones={milestones} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

import { useParams } from "react-router-dom";

import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { useGithubAssignees } from "@/shared/hooks/useGithubAssignees";
import { useGithubIssue } from "@/shared/hooks/useGithubIssue";
import { useGithubLabels } from "@/shared/hooks/useGithubLabels";
import { useGithubUser } from "@/shared/hooks/useGithubUser";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import IssueEdit from "./components/IssueEdit";

export default function IssuesEditPage() {
  const { id } = useParams<{ id: string }>();
  const { user, repo, HelmetTitle } = usePageInfoWithHelmet();

  const { data: issue } = useGithubIssue({
    id: id ? Number(id) : 0,
    owner: user,
    repo: repo,
  });
  const { data: assignees } = useGithubAssignees({
    owner: user,
    repo: repo,
  });
  const { data: labels } = useGithubLabels({
    owner: user,
    repo: repo,
  });

  const { data: userInfo } = useGithubUser(import.meta.env.VITE_GITHUB_TOKEN);

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssueEdit issue={issue} userInfo={userInfo} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

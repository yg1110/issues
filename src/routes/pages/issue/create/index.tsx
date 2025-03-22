import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { useGithubUser } from "@/shared/hooks/useGithubUser";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import IssueCreate from "./components/IssueCreate";

export default function IssuesCreatePage() {
  const { HelmetTitle } = usePageInfoWithHelmet();

  const { data: user } = useGithubUser(import.meta.env.VITE_GITHUB_TOKEN);

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssueCreate user={user} />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

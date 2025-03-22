import IssuesTabLabel from "@/shared/components/IssuesTabLabel";
import TabList from "@/shared/components/TabList";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import IssuesCreate from "./components/IssueCreate";

export default function IssuesCreatePage() {
  const { HelmetTitle } = usePageInfoWithHelmet();

  const tabs = [
    {
      label: <IssuesTabLabel />,
      contents: <IssuesCreate />,
    },
  ];

  return (
    <div>
      {HelmetTitle}
      <TabList tabs={tabs} />
    </div>
  );
}

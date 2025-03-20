import TabList from "../../../shared/components/TabList";
import IssuesTabContents from "./components/IssuesTabContents";
import IssuesTabLabel from "./components/IssuesTabLabel";

const tabs = [
  {
    label: <IssuesTabLabel />,
    contents: <IssuesTabContents />,
  },
];
export default function IssuesPage() {
  return (
    <div>
      <TabList tabs={tabs} />
    </div>
  );
}

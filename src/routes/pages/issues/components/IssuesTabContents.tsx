import ListView from "../../../../shared/components/ListView";

const issues = [];
export default function IssuesTabContents() {
  return <ListView title="이슈 목록" items={issues} />;
}

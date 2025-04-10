import IssueIcon from "../icons/IssueIcon";

export default function IssuesTabLabel() {
  return (
    <div className="flex items-center gap-[0.5rem]">
      <IssueIcon type="open" color="#9198a1" />
      Issues
    </div>
  );
}

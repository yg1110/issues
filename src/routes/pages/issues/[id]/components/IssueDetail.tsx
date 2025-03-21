import { GitHubIssue } from "../../../../../schemas/github-issue";
import IssueBody from "./IssueBody";
import IssueSideBar from "./IssueSideBar";
import IssueTitle from "./IssueTitle";

type Props = {
  issue?: GitHubIssue;
};

export default function IssueDetail({ issue }: Props) {
  if (!issue) return;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <IssueTitle title={issue.title} />
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <IssueBody {...issue} />
        <IssueSideBar {...issue} />
      </div>
    </div>
  );
}

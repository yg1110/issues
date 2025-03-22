import { GitHubComment } from "../../../../../schemas/github-comment";
import { GitHubIssue } from "../../../../../schemas/github-issue";
import { CommentComposer } from "./CommentComposer";
import IssueBody from "./IssueBody";
import IssueSideBar from "./IssueSideBar";
import IssueTitle from "./IssueTitle";

type Props = {
  issue?: GitHubIssue;
  comments?: GitHubComment[];
};

export default function IssueDetail({ issue, comments }: Props) {
  if (!issue) return;
  if (!comments) return;
  const writeCommand = (comment: string) => {
    console.log(comment);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <IssueTitle title={issue.title} />
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[80%] order-2 md:order-1">
          <IssueBody {...issue} />
          {comments?.map((comment) => <IssueBody key={comment.id} {...comment} />)}
          <CommentComposer avatarUrl={issue.user.avatar_url} username={issue.user.login} onSubmit={writeCommand} />
        </div>
        <IssueSideBar {...issue} />
      </div>
    </div>
  );
}

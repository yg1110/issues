import { GitHubComment } from "../../../../../schemas/github-comment";
import { GitHubIssue } from "../../../../../schemas/github-issue";
import { usePageInfoWithHelmet } from "../../../../../shared/hooks/usePageInfo";
import { useWriteGithubComment } from "../hooks/use-write-github-comment";
import { CommentComposer } from "./CommentComposer";
import IssueBody from "./IssueBody";
import IssueSideBar from "./IssueSideBar";
import IssueTitle from "./IssueTitle";

type Props = {
  issue?: GitHubIssue;
  comments?: GitHubComment[];
};

export default function IssueDetail({ issue, comments }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { mutate: writeGithubComment } = useWriteGithubComment();

  const writeCommand = (comment: string) => {
    writeGithubComment({
      owner: user,
      repo: repo,
      issueNumber: issue?.number || 0,
      token: import.meta.env.VITE_GITHUB_TOKEN,
      body: comment,
    });
  };

  if (!issue) return;
  if (!comments) return;
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

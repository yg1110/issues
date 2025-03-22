import { GitHubComment } from "@/schemas/github-comment";
import { GitHubIssue } from "@/schemas/github-issue";
import IssueSideBar from "@/shared/components/IssueSideBar";
import { useCreateGithubComment } from "@/shared/hooks/useCreateGithubComment";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import CommentEditor from "./CommentEditor";
import IssueBody from "./IssueBody";
import IssueTitle from "./IssueTitle";

type Props = {
  issue?: GitHubIssue;
  comments?: GitHubComment[];
};

export default function IssueDetail({ issue, comments }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { mutate: createGithubComment } = useCreateGithubComment();

  const writeCommand = (comment: string) => {
    createGithubComment({
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
        <div className="w-full md:w-[70%] order-2 md:order-1">
          <IssueBody {...issue} />
          {comments?.map((comment) => <IssueBody key={comment.id} {...comment} />)}
          <CommentEditor avatarUrl={issue.user.avatar_url} username={issue.user.login} onSubmit={writeCommand} />
        </div>
        <IssueSideBar {...issue} />
      </div>
    </div>
  );
}

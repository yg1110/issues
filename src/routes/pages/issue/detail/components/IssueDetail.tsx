import { useEffect, useState } from "react";

import { GitHubComment } from "@/schemas/github-comment";
import { GitHubIssue } from "@/schemas/github-issue";
import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser } from "@/schemas/github-user";
import IssueSideBar from "@/shared/components/IssueSideBar";
import { useCreateGithubComment } from "@/shared/hooks/useCreateGithubComment";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

import CommentEditorAndState from "./CommentEditorAndState";
import IssueBody from "./IssueBody";
import IssueTitle from "./IssueTitle";

type Props = {
  issue?: GitHubIssue;
  comments?: GitHubComment[];
  assignees?: GitHubSimpleUser[];
  labels?: GitHubLabel[];
  milestones?: GitHubMilestone[];
};

export default function IssueDetail({ issue, comments, assignees, labels, milestones }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { mutate: createGithubComment } = useCreateGithubComment();

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const writeCommand = (comment: string) => {
    createGithubComment({
      owner: user,
      repo: repo,
      issueNumber: issue?.number || 0,
      body: comment,
    });
  };

  useEffect(() => {
    if (!issue) return;
    setSelectedAssignees(issue.assignees?.map((assignee) => assignee.login) || []);
    setSelectedMilestone(issue.milestone ? issue.milestone.number : null);
    setSelectedLabel(issue.labels?.map((label) => label.name.toString()) || []);
  }, [issue]);

  if (!issue) return;
  if (!comments) return;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <IssueTitle title={issue.title} />
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[70%] order-2 md:order-1">
          <IssueBody {...issue} />
          {comments?.map((comment) => <IssueBody key={comment.id} {...comment} />)}
          <CommentEditorAndState
            issueNumber={issue.number}
            state={issue.state}
            avatarUrl={issue.user.avatar_url}
            username={issue.user.login}
            onSubmit={writeCommand}
          />
        </div>
        <IssueSideBar
          issueNumber={issue.number}
          currentAssignees={issue.assignees}
          currentMilestone={issue.milestone}
          currentLabels={issue.labels}
          assignees={assignees || []}
          milestones={milestones || []}
          labels={labels || []}
          selectedAssigneesState={[selectedAssignees, setSelectedAssignees]}
          selectedMilestoneState={[selectedMilestone, setSelectedMilestone]}
          selectedLabelState={[selectedLabel, setSelectedLabel]}
        />
      </div>
    </div>
  );
}

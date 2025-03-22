import { useEffect, useState } from "react";

import { GitHubIssue } from "@/schemas/github-issue";
import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser, GitHubUser } from "@/schemas/github-user";
import BodyEditor from "@/shared/components/BodyEditor";
import Button from "@/shared/components/Button";
import IssueSideBar from "@/shared/components/IssueSideBar";
import IssueTitle from "@/shared/components/IssueTitle";
import UserProfile from "@/shared/components/UserProfile";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";
import { useUpdateGithubIssue } from "@/shared/hooks/useUpdateGithubIssue";

interface Props {
  issue?: GitHubIssue;
  userInfo?: GitHubUser;
  assignees?: GitHubSimpleUser[];
  labels?: GitHubLabel[];
  milestones?: GitHubMilestone[];
}
export default function IssueEdit({ issue, userInfo, assignees, labels, milestones }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { mutate: updateGithubIssue } = useUpdateGithubIssue(issue?.number || 0);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleSubmit = () => {
    if (!user || !issue) return;
    updateGithubIssue({
      id: issue.number,
      owner: user,
      repo: repo,
      body: body,
      title: title,
    });
  };

  useEffect(() => {
    if (!issue) return;
    setTitle(issue.title);
    setBody(issue.body || "");
  }, [issue]);

  if (!userInfo || !issue) return;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[70%] order-1">
          <div className="flex items-start gap-4 bg-white rounded-md">
            {userInfo && <UserProfile user={userInfo} />}
            <div className="flex flex-col flex-1 gap-4">
              <IssueTitle label="Edit a title" required={true} value={title} onChange={handleTitleChange} />
              <BodyEditor label="Edit a description" required={true} value={body} onChange={handleBodyChange} />
              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <a href={`/${user}/${repo}/issue/${issue.number}`}>
                    <Button variant="outline">Cancel</Button>
                  </a>
                  <Button variant="secondary" disabled={!title || !body} onClick={handleSubmit}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <IssueSideBar
          currentAssignees={issue.assignees}
          currentMilestone={issue.milestone}
          currentLabels={issue.labels}
          assignees={assignees || []}
          milestones={milestones || []}
          labels={labels || []}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser, GitHubUser } from "@/schemas/github-user";
import BodyEditor from "@/shared/components/BodyEditor";
import Button from "@/shared/components/Button";
import IssueSideBar from "@/shared/components/IssueSideBar";
import IssueTitle from "@/shared/components/IssueTitle";
import UserProfile from "@/shared/components/UserProfile";
import { useCreateGithubIssue } from "@/shared/hooks/useCreateGithubIssue";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";
import { useGitHubMetaStore } from "@/store/githubMeta";

interface Props {
  userInfo?: GitHubUser;
}
export default function IssueCreate({ userInfo }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { assignees, labels, milestones } = useGitHubMetaStore();

  // 사이드바에서 선택된 정보를 저장하는 state
  const [currentAssignees, setCurrentAssignees] = useState<GitHubSimpleUser[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<GitHubMilestone | null>(null);
  const [currentLabels, setCurrentLabels] = useState<GitHubLabel[]>([]);

  // 직접 api에 보낼 정보를 저장하는 state
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate: createGithubIssue } = useCreateGithubIssue();

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleSubmit = () => {
    if (!user) return;
    createGithubIssue({
      owner: user,
      repo: repo,
      body: body,
      title: title,
      assignees: selectedAssignees,
      milestone: selectedMilestone,
      labels: selectedLabel,
    });
  };

  useEffect(() => {
    const currentAssignees = assignees?.filter((assignee) => selectedAssignees.includes(assignee.login)) || [];
    setCurrentAssignees(currentAssignees);
  }, [selectedAssignees]);

  useEffect(() => {
    const currentMilestone = milestones?.find((milestone) => milestone.number === selectedMilestone) || null;
    setCurrentMilestone(currentMilestone);
  }, [selectedMilestone]);

  useEffect(() => {
    const currentLabels = labels?.filter((label) => selectedLabel.includes(label.name)) || [];
    setCurrentLabels(currentLabels);
  }, [selectedLabel]);

  if (!userInfo) return;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[70%] order-1">
          <div className="flex items-start gap-4 bg-white rounded-md">
            {userInfo && <UserProfile user={userInfo} />}
            <div className="flex flex-col flex-1 gap-4">
              <IssueTitle label="Add a title" required={true} value={title} onChange={handleTitleChange} />
              <BodyEditor label="Add a description" required={true} value={body} onChange={handleBodyChange} />
              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <a href={`/${user}/${repo}/issues?state=open`}>
                    <Button variant="outline">Cancel</Button>
                  </a>
                  <Button variant="secondary" disabled={!title || !body} onClick={handleSubmit}>
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <IssueSideBar
          currentAssignees={currentAssignees}
          currentMilestone={currentMilestone}
          currentLabels={currentLabels}
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

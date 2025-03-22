import { useEffect, useState } from "react";

import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser } from "@/schemas/github-user";
import AssigneesDropdown from "@/shared/components/AssigneesDropdown";
import IssueLabel from "@/shared/components/IssueLabel";
import LabelsDropdown from "@/shared/components/LabelsDropdown";

import { usePageInfoWithHelmet } from "../hooks/usePageInfoWithHelmet";
import { useUpdateGithubIssue } from "../hooks/useUpdateGithubIssue";
import { useUpdateGithubLabels } from "../hooks/useUpdateGithubLabels";
import MilestoneIcon from "../icons/MilestoneIcon";
import MileStoneDropdown from "./MileStoneDropdown";

interface Props {
  issueNumber?: number;
  currentAssignees: GitHubSimpleUser[];
  currentMilestone: GitHubMilestone | null;
  currentLabels: GitHubLabel[];
  assignees: GitHubSimpleUser[];
  milestones: GitHubMilestone[];
  labels: GitHubLabel[];
}
export default function IssueSideBar({
  issueNumber,
  currentAssignees,
  currentMilestone,
  currentLabels,
  assignees,
  milestones,
  labels,
}: Props) {
  const { user, repo } = usePageInfoWithHelmet();

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const { mutate: updateGithubIssue } = useUpdateGithubIssue(issueNumber || 0);
  const { mutate: updateGithubLabels } = useUpdateGithubLabels();

  const handleUpdateAssignees = (assignees: string[]) => {
    setSelectedAssignees(assignees);
    if (!issueNumber) return;
    updateGithubIssue({
      id: issueNumber,
      owner: user,
      repo: repo,
      assignees: assignees,
    });
  };

  const handleUpdateLabels = (labels: string[]) => {
    setSelectedLabel(labels);
    if (!issueNumber) return;
    updateGithubLabels({
      owner: user,
      repo: repo,
      issueNumber: issueNumber,
      labels: labels,
    });
  };

  useEffect(() => {
    setSelectedAssignees(currentAssignees.map((assignee) => assignee.login));
    setSelectedMilestone(currentMilestone ? currentMilestone.id.toString() : null);
    setSelectedLabel(currentLabels.map((label) => label.name.toString()));
  }, [currentAssignees, currentMilestone, currentLabels]);

  const formattedAssigneesLabels = assignees.map((assignee) => ({
    id: assignee.id.toString(),
    name: assignee.login,
  }));
  const formattedLabels = labels.map((label) => ({
    id: label.id.toString(),
    name: label.name,
  }));
  const formattedMilestones = milestones.map((milestone) => ({
    id: milestone.id.toString(),
    name: milestone.title,
  }));

  console.log("selectedAssignees :>> ", selectedAssignees);
  return (
    <div className="w-full md:w-[30%] order-1 md:order-2 flex flex-col gap-4 md:gap-0">
      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-row gap-2 md:flex-col items-center md:items-baseline">
        <AssigneesDropdown
          labels={formattedAssigneesLabels}
          selected={selectedAssignees}
          onChange={handleUpdateAssignees}
        />
        {currentAssignees.length > 0 ? (
          <div className="flex flex-col gap-2">
            {currentAssignees.map((user) => (
              <a
                key={user.id}
                href={`${user.html_url}`}
                className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={user.avatar_url} alt={user.login} className="w-6 h-6 rounded-full" />
                <span className="text-sm">{user.login}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No assignees</p>
        )}
      </div>

      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-row gap-2 md:flex-col items-center md:items-baseline">
        <MileStoneDropdown options={formattedMilestones} selected={selectedMilestone} onChange={setSelectedMilestone} />
        {currentMilestone ? (
          <a
            href={currentMilestone.html_url}
            className="flex gap-1 items-center hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MilestoneIcon />
            {currentMilestone.title}
          </a>
        ) : (
          <p className="text-gray-400 text-sm">No milestone</p>
        )}
      </div>

      <div className="bg-white flex flex-row gap-2 md:flex-col items-center md:items-baseline">
        <LabelsDropdown labels={formattedLabels} selected={selectedLabel} onChange={handleUpdateLabels} />
        {currentLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2 items-center">
            {currentLabels.map((label) => (
              <IssueLabel key={label.id} text={label.name} color={`#${label.color}`} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No labels</p>
        )}
      </div>
    </div>
  );
}

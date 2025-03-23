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
  selectedAssigneesState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  selectedMilestoneState: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
  selectedLabelState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}
export default function IssueSideBar({
  issueNumber,
  currentAssignees,
  currentMilestone,
  currentLabels,
  assignees,
  milestones,
  labels,
  selectedAssigneesState,
  selectedMilestoneState,
  selectedLabelState,
}: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const [selectedAssignees, setSelectedAssignees] = selectedAssigneesState;
  const [selectedMilestone, setSelectedMilestone] = selectedMilestoneState;
  const [selectedLabel, setSelectedLabel] = selectedLabelState;

  const formattedAssigneesLabels = assignees.map((assignee) => ({
    id: assignee.login,
    name: assignee.login,
  }));
  const formattedLabels = labels.map((label) => ({
    id: label.id.toString(),
    name: label.name,
  }));
  const formattedMilestones = milestones.map((milestone) => ({
    id: milestone.number,
    name: milestone.title,
  }));

  const { mutate: updateGithubIssue } = useUpdateGithubIssue({
    issueNumber: issueNumber || 0,
    options: { shouldRedirect: false },
  });
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

  const handleUpdateMilestone = (milestone: number | null) => {
    setSelectedMilestone(milestone);
    if (!issueNumber || !milestone) return;
    updateGithubIssue({
      id: issueNumber,
      owner: user,
      repo: repo,
      milestone: milestone,
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

  return (
    <div className="w-full md:w-[30%] order-1 md:order-2 flex flex-col gap-4 md:gap-0">
      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-col gap-2 items-baseline">
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

      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-col gap-2 items-baseline">
        <MileStoneDropdown
          options={formattedMilestones}
          selected={selectedMilestone}
          onChange={handleUpdateMilestone}
        />
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

      <div className="bg-white flex flex-col gap-2 items-baseline">
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

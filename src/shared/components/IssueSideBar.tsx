import { useState } from "react";

import { GitHubLabel } from "@/schemas/github-label";
import { GitHubMilestone } from "@/schemas/github-milestone";
import { GitHubSimpleUser } from "@/schemas/github-user";
import AssigneesDropdown from "@/shared/components/AssigneesDropdown";
import IssueLabel from "@/shared/components/IssueLabel";
import LabelsDropdown from "@/shared/components/LabelsDropdown";

import MilestoneIcon from "../icons/MilestoneIcon";
import MileStoneDropdown from "./milestoneDropdown";

interface Props {
  assignees: GitHubSimpleUser[];
  milestone: GitHubMilestone | null;
  labels: GitHubLabel[];
}
export default function IssueSideBar({ assignees, milestone, labels }: Props) {
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const formattedAssigneesLabels = assignees.map((assignee) => ({
    id: assignee.id.toString(),
    name: assignee.login,
  }));
  const formattedLabels = labels.map((label) => ({
    id: label.id.toString(),
    name: label.name,
  }));
  const formattedMilestones = {
    id: milestone?.id.toString() || "",
    name: milestone?.title || "",
  };

  return (
    <div className="w-full md:w-[30%] order-1 md:order-2 flex flex-col gap-4 md:gap-0">
      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-row gap-2 md:flex-col items-center md:items-baseline">
        <AssigneesDropdown
          labels={formattedAssigneesLabels}
          selected={selectedAssignees}
          onChange={setSelectedAssignees}
        />
        {assignees.length > 0 ? (
          <div className="flex flex-col gap-2">
            {assignees.map((user) => (
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
        <MileStoneDropdown
          options={[formattedMilestones]}
          selected={selectedMilestone}
          onChange={setSelectedMilestone}
        />
        {milestone ? (
          <a
            href={milestone.html_url}
            className="flex gap-1 items-center hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MilestoneIcon />
            {milestone.title}
          </a>
        ) : (
          <p className="text-gray-400 text-sm">No milestone</p>
        )}
      </div>

      <div className="bg-white flex flex-row gap-2 md:flex-col items-center md:items-baseline">
        <LabelsDropdown labels={formattedLabels} selected={selectedLabel} onChange={setSelectedLabel} />
        {labels.length > 0 ? (
          <div className="flex flex-wrap gap-2 items-center">
            {labels.map((label) => (
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

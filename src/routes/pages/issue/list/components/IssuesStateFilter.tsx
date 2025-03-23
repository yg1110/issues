import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import AssigneesFilterDropdown from "@/shared/components/assigneesFilterDropdown";
import LabelsFilterDropdown from "@/shared/components/LabelsFilterDropdown";
import MileStoneFilterDropdown from "@/shared/components/MileStoneFilterDropdown";
import { useGitHubMetaStore } from "@/store/githubMeta";

import StateLabel from "./StateLabel";

type Props = {
  openCount: number;
  closedCount: number;
};

export default function IssuesStateFilter({ openCount, closedCount }: Props) {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") ?? "open";

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const { assignees, labels, milestones } = useGitHubMetaStore();

  const formattedAssigneesLabels =
    assignees?.map((assignee) => ({
      id: assignee.login,
      name: assignee.login,
    })) || [];
  const formattedLabels =
    labels?.map((label) => ({
      id: label.id.toString(),
      name: label.name,
    })) || [];
  const formattedMilestones =
    milestones?.map((milestone) => ({
      id: milestone.number,
      name: milestone.title,
    })) || [];

  const handleUpdateLabels = (labels: string[]) => {
    setSelectedLabel(labels);
  };

  const handleUpdateAssignees = (assignees: string[]) => {
    setSelectedAssignees(assignees);
  };

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex items-center">
        <li>
          <StateLabel count={openCount} state="open" selected={state === "open"} />
        </li>
        <li>
          <StateLabel count={closedCount} state="closed" selected={state === "closed"} />
        </li>
        <li>
          <AssigneesFilterDropdown
            labels={formattedAssigneesLabels || []}
            selected={selectedAssignees}
            onChange={handleUpdateAssignees}
          />
        </li>
        <li>
          <MileStoneFilterDropdown
            options={formattedMilestones || []}
            selected={selectedMilestone}
            onChange={setSelectedMilestone}
          />
        </li>
        <li>
          <LabelsFilterDropdown labels={formattedLabels || []} selected={selectedLabel} onChange={handleUpdateLabels} />
        </li>
      </ul>
    </div>
  );
}

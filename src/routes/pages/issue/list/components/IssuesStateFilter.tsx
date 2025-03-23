import { useSearchParams } from "react-router-dom";

import AssigneesFilterDropdown from "@/shared/components/assigneesFilterDropdown";
import LabelsFilterDropdown from "@/shared/components/LabelsFilterDropdown";
import MileStoneFilterDropdown from "@/shared/components/MileStoneFilterDropdown";
import { useGitHubMetaStore } from "@/store/githubMeta";
import { useIssueFilterStore } from "@/store/issueFilterStore";

import StateLabel from "./StateLabel";

type Props = {
  openCount: number;
  closedCount: number;
};

export default function IssuesStateFilter({ openCount, closedCount }: Props) {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") ?? "open";
  const {
    selectedAssignees,
    setSelectedAssignees,
    selectedMilestone,
    setSelectedMilestone,
    selectedLabel,
    setSelectedLabel,
  } = useIssueFilterStore();

  const { assignees, labels, milestones } = useGitHubMetaStore();

  const formattedAssignees =
    assignees?.map((assignee) => ({
      id: assignee.id,
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

  const handleUpdateAssignees = (assignees: string | null) => {
    setSelectedAssignees(assignees);
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <ul className="flex gap-2 order-1 md:order-none">
        <li>
          <StateLabel count={openCount} state="open" selected={state === "open"} />
        </li>
        <li>
          <StateLabel count={closedCount} state="closed" selected={state === "closed"} />
        </li>
      </ul>

      <ul className="flex flex-wrap gap-2 order-2 md:order-none">
        <li>
          <AssigneesFilterDropdown
            options={formattedAssignees || []}
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

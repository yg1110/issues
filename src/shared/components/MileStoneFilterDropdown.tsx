import Dropdown from "@/shared/components/Dropdown";

import TriangleDownIcon from "../icons/TriangleDownIcon";
import SingleSelector, { Option } from "./SingleSelector";

type Props = {
  options: Option[];
  selected: number | null;
  onChange: (selectedId: number | null) => void;
};

export default function MileStoneFilterDropdown({ options, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <button
          type="button"
          tabIndex={0}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-3 py-1 transition hover:bg-gray-200"
        >
          <span>Milestones</span>
          <TriangleDownIcon />
        </button>
      }
    >
      <SingleSelector title="Filter by milestone" options={options} selected={selected} onChange={onChange} />
    </Dropdown>
  );
}

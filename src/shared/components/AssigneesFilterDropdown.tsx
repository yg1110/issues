import Dropdown from "@/shared/components/Dropdown";

import TriangleDownIcon from "../icons/TriangleDownIcon";
import MultiSelector, { Label } from "./MultiSelector";

type Props = {
  labels: Label[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function AssigneesFilterDropdown({ labels, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <button
          type="button"
          tabIndex={0}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-3 py-1 transition hover:bg-gray-200"
        >
          <span>Author</span>
          <TriangleDownIcon />
        </button>
      }
      className="min-w-[200px]"
    >
      <MultiSelector
        title="Filter by assignees"
        placeholder="Filter assignees"
        labels={labels}
        selected={selected}
        onChange={onChange}
      />
    </Dropdown>
  );
}

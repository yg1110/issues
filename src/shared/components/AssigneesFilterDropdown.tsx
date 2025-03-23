import Dropdown from "@/shared/components/Dropdown";

import TriangleDownIcon from "../icons/TriangleDownIcon";
import SingleSelectorWithName, { Option } from "./SingleSelectorWithName";

type Props = {
  options: Option[];
  selected: string | null;
  onChange: (selected: string | null) => void;
};

export default function AssigneesFilterDropdown({ options, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <button
          type="button"
          tabIndex={0}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-3 py-1 transition hover:bg-gray-200"
        >
          <span>Assignees</span>
          <TriangleDownIcon />
        </button>
      }
      className="min-w-[200px]"
    >
      <SingleSelectorWithName
        options={options}
        selected={selected}
        onChange={onChange}
        placeholder="Filter by assignees"
      />
    </Dropdown>
  );
}

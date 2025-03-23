import Dropdown from "@/shared/components/Dropdown";

import TriangleDownIcon from "../icons/TriangleDownIcon";
import MultiSelector, { Label } from "./MultiSelector";

type Props = {
  labels: Label[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function LabelsFilterDropdown({ labels, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <button
          type="button"
          tabIndex={0}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-3 py-1 transition hover:bg-gray-200"
        >
          <span>Label</span>
          <TriangleDownIcon />
        </button>
      }
      className="min-w-[200px]"
    >
      <MultiSelector
        title="Filter by label"
        placeholder="Filter labels"
        labels={labels}
        selected={selected}
        onChange={onChange}
        footer={
          <a
            href="https://github.com/yg1110/issues/issues/labels"
            className="text-sm text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit labels
          </a>
        }
      />
    </Dropdown>
  );
}

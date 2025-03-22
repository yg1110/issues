import Dropdown from "@/shared/components/Dropdown";

import SettingIcon from "../icons/SettingIcon";
import MultiSelector, { Label } from "./MultiSelector";

type Props = {
  labels: Label[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function LabelsDropdown({ labels, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <div className="flex justify-between items-center w-full hover:bg-gray-100 p-1">
          <h3 className="font-medium">Labels</h3>
          <SettingIcon />
        </div>
      }
    >
      <MultiSelector
        title="Apply labels to this issue"
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

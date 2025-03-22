import Dropdown from "@/shared/components/Dropdown";

import SettingIcon from "../icons/SettingIcon";
import MultiSelector, { Label } from "./MultiSelector";

type Props = {
  labels: Label[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function AssigneesDropdown({ labels, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <div className="flex justify-between items-center w-full hover:bg-gray-100 p-1">
          <h3 className="font-medium">Assignees</h3>
          <SettingIcon />
        </div>
      }
    >
      <MultiSelector
        title="Assign up to 10 people to this issue"
        labels={labels}
        selected={selected}
        onChange={onChange}
      />
    </Dropdown>
  );
}

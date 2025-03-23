import Dropdown from "@/shared/components/Dropdown";

import SettingIcon from "../icons/SettingIcon";
import SingleSelector, { Option } from "./SingleSelector";

type Props = {
  options: Option[];
  selected: number | null;
  onChange: (selectedId: number | null) => void;
};

export default function MileStoneDropdown({ options, selected, onChange }: Props) {
  return (
    <Dropdown
      trigger={
        <div className="flex justify-between items-center w-full hover:bg-gray-100 p-1">
          <h3 className="font-medium">Milestone</h3>
          <SettingIcon />
        </div>
      }
    >
      <SingleSelector title="Set milestone" options={options} selected={selected} onChange={onChange} />
    </Dropdown>
  );
}

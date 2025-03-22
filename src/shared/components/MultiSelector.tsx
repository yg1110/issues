import React, { useState } from "react";

export type Label = {
  id: string;
  name: string;
};

type Props = {
  title?: string;
  labels: Label[];
  selected: string[];
  placeholder?: string;
  footer?: React.ReactNode;
  onChange: (selectedItems: string[]) => void;
};

export default function MultiSelector({
  title,
  placeholder = "Filter labels",
  labels,
  selected,
  footer,
  onChange,
}: Props) {
  const [filter, setFilter] = useState("");

  const filteredLabels = labels.filter((label) => label.name.toLowerCase().includes(filter.toLowerCase()));

  const toggleLabel = (name: string) => {
    const isChecked = selected.includes(name);
    if (isChecked) {
      onChange(selected.filter((item) => item !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-xl shadow-md">
      {title && <h1 className="text-lg font-semibold mb-3">{title}</h1>}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.68 11.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 0 1-1.06 1.06l-3.04-3.04zM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z" />
          </svg>
        </div>
      </div>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {filteredLabels.map((label) => (
          <li
            key={label.id}
            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => toggleLabel(label.name)}
          >
            <input
              type="checkbox"
              checked={selected.includes(label.name)}
              onChange={() => toggleLabel(label.name)}
              className="mt-1"
            />
            <div className="font-medium">{label.name}</div>
          </li>
        ))}
      </ul>
      {footer && <div className="mt-4 text-right">{footer}</div>}
    </div>
  );
}

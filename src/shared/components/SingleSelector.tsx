import { useState } from "react";

export type Option = {
  id: number;
  name: string;
  description?: string;
};

type Props = {
  title?: string;
  options: Option[];
  selected: number | null;
  placeholder?: string;
  footer?: React.ReactNode;
  onChange: (selectedId: number | null) => void;
};

export default function SingleSelector({
  title,
  options,
  selected,
  footer,
  placeholder = "filter milestones",
  onChange,
}: Props) {
  const [filter, setFilter] = useState("");

  const handleClick = (id: number) => {
    if (selected === id) {
      onChange(null);
    } else {
      onChange(id);
    }
  };

  const filtered = options.filter((opt) => opt.name.toLowerCase().includes(filter.toLowerCase()));

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
        {filtered.map((opt) => (
          <li
            key={opt.id}
            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClick(opt.id)}
          >
            <span className="mt-1">
              {selected === opt.id ? (
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="w-5 h-5 inline-block" />
              )}
            </span>
            <div>
              <div className="font-medium">{opt.name}</div>
              {opt.description && <div className="text-sm text-gray-500">{opt.description}</div>}
            </div>
          </li>
        ))}
      </ul>

      {footer && <div className="pt-3">{footer}</div>}
    </div>
  );
}

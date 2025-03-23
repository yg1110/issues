import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
};

export default function SearchInput({ value, onChange, placeholder = "🔍 Search Issues", delay = 300 }: Props) {
  const [internalValue, setInternalValue] = useState(value);
  const debouncedValue = useDebounce(internalValue, delay);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      className="w-full md:w-[220px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  );
}

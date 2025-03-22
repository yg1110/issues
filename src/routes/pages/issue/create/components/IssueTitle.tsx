interface Props {
  value: string;
  onChange: (value: string) => void;
}
export default function IssueTitle({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Add a title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

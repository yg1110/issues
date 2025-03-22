import MDEditor from "@uiw/react-md-editor";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BodyEditor({ value, onChange }: Props) {
  const handleChangeEditor = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Add a description</label>
      <div data-color-mode="light" className="w-full break-words">
        <MDEditor value={value} onChange={handleChangeEditor} />
      </div>
    </div>
  );
}

interface Props {
  title: string;
}
export default function IssueTitle({ title }: Props) {
  return (
    <div className="mb-3 pb-3 border-b border-gray-300">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}

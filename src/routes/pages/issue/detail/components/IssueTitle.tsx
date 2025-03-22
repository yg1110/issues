import { useParams } from "react-router-dom";

import Button from "@/shared/components/Button";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

interface Props {
  title: string;
}
export default function IssueTitle({ title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { user, repo } = usePageInfoWithHelmet();
  return (
    <div className="mb-5 pb-3 border-b border-gray-300 flex justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-2">
        <a href={`/${user}/${repo}/issue/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </a>
        <a href={`/${user}/${repo}/issue/create`}>
          <Button>New issue</Button>
        </a>
      </div>
    </div>
  );
}

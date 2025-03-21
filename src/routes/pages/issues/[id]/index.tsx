import { useParams } from "react-router-dom";

import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfo";

export default function IssuesDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { HelmetTitle } = usePageInfoWithHelmet();

  return (
    <div>
      {HelmetTitle}
      {id}
    </div>
  );
}

import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfo";

export default function NewIssuesPage() {
  const { HelmetTitle } = usePageInfoWithHelmet();

  return <div>{HelmetTitle}</div>;
}

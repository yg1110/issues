import { usePageInfoWithHelmet } from "../../../../shared/hooks/usePageInfoWithHelmet";

export default function NewIssuesPage() {
  const { HelmetTitle } = usePageInfoWithHelmet();

  return <div>{HelmetTitle}</div>;
}

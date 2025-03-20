import { useEffect, useState } from "react";

import { GitHubIssue } from "../../../../schemas/github-issue";
import ListView, { ListItem } from "../../../../shared/components/ListView";

type Props = {
  issues?: GitHubIssue[];
};
export default function IssuesTabContents({ issues }: Props) {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (!issues) return;
    const items = issues.map((issue) => ({
      title: issue.title,
      description: issue.user.login,
      link: issue.html_url,
    }));
    setItems(items);
  }, [issues]);

  if (!issues) return;
  return <ListView title="이슈 목록" items={items} />;
}

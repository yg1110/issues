import { useEffect, useState } from "react";

import { GitHubIssue } from "../../../../schemas/github-issue";
import IssueState from "../../../../shared/components/IssueState";
import ListView, { ListItem } from "../../../../shared/components/ListView";
import IssueDescription from "./IssueDescription";

type Props = {
  issues?: GitHubIssue[];
};

export default function IssuesTabContents({ issues }: Props) {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (!issues) return;
    const items = issues.map((issue) => ({
      title: issue.title,
      description: <IssueDescription user={issue.user} milestone={issue.milestone} />,
      link: issue.html_url,
      icon: <IssueState state={issue.state} stateReason={issue.state_reason} />,
      labels: issue.labels,
    }));
    setItems(items);
  }, [issues]);

  if (!issues) return;
  return <ListView title="이슈 목록" items={items} />;
}

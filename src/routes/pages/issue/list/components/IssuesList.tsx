import { useEffect, useState } from "react";

import { GitHubIssue } from "../../../../../schemas/github-issue";
import Button from "../../../../../shared/components/Button";
import IssueState from "../../../../../shared/components/IssueState";
import ListView, { ListItem } from "../../../../../shared/components/ListView";
import { useInfoStore } from "../../../../../store/info";
import IssueDescription from "./IssueDescription";

type Props = {
  issues?: GitHubIssue[];
};

export default function IssuesList({ issues }: Props) {
  const { user, repo } = useInfoStore();
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (!issues) return;
    const items = issues.map((issue) => ({
      id: issue.number,
      title: issue.title,
      description: <IssueDescription user={issue.user} milestone={issue.milestone} />,
      link: issue.html_url,
      icon: <IssueState state={issue.state} stateReason={issue.state_reason} />,
      labels: issue.labels,
    }));
    setItems(items);
  }, [issues]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <a href={`/${user}/${repo}/issues/new`}>
          <Button>New issue</Button>
        </a>
      </div>
      <ListView title="이슈 목록" items={items} />
    </div>
  );
}

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { GitHubIssue } from "@/schemas/github-issue";
import Button from "@/shared/components/Button";
import IssueState from "@/shared/components/IssueState";
import ListView, { ListItem } from "@/shared/components/ListView";
import { useInfoStore } from "@/store/info";

import IssueDescription from "./IssueDescription";

type Props = {
  issues?: GitHubIssue[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
};

export default function IssuesList({ issues, fetchNextPage, hasNextPage, isLoading }: Props) {
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
        <a href={`/${user}/${repo}/issue/create`}>
          <Button>New issue</Button>
        </a>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center text-sm text-gray-500 py-4">Loading more...</p>}
      >
        <ListView title="이슈 목록" items={items} />
      </InfiniteScroll>

      {isLoading && <p className="text-center text-sm text-gray-500 py-4">Loading more...</p>}
    </div>
  );
}

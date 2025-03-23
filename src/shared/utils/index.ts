export const buildGithubIssuesQueryString = (params: {
  page: number;
  per_page: number;
  state?: "open" | "closed";
  assignee?: string | null;
  milestone?: number | null;
  labels?: string[];
}) => {
  const query = new URLSearchParams();

  query.append("page", String(params.page));
  query.append("per_page", String(params.per_page));

  if (params.state) query.append("state", params.state);
  if (params.assignee) query.append("assignee", params.assignee);
  if (params.milestone !== null && params.milestone !== undefined) query.append("milestone", String(params.milestone));
  if (params.labels && params.labels.length > 0) query.append("labels", params.labels.join(","));

  return query.toString();
};

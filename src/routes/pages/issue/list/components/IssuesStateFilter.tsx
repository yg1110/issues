import { useSearchParams } from "react-router-dom";

import { useInfoStore } from "@/store/info";

type Props = {
  openCount: number;
  closedCount: number;
};

export default function IssuesStateFilter({ openCount, closedCount }: Props) {
  const { user, repo } = useInfoStore();
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") ?? "open";
  const selectedClassName = "text-blue-600";
  const notSelectedClassName = "text-gray-600 hover:text-blue-600";
  const openClassName = `flex items-center px-4 py-2 text-sm font-medium ${
    state === "open" ? selectedClassName : notSelectedClassName
  }`;
  const closedClassName = `flex items-center px-4 py-2 text-sm font-medium ${
    state === "closed" ? selectedClassName : notSelectedClassName
  }`;

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex">
        <li>
          <a href={`/${user}/${repo}/issues?state=open`} aria-current="true" className={openClassName}>
            <span>Open</span>
            <span
              className="ml-2 text-xs bg-gray-100 text-gray-800 font-semibold px-2 py-0.5 rounded-full"
              aria-hidden="true"
            >
              {openCount}
            </span>
            <span className="sr-only">({openCount})</span>
          </a>
        </li>

        <li>
          <a href={`/${user}/${repo}/issues?state=closed`} className={closedClassName}>
            <span>Closed</span>
            <span
              className="ml-2 text-xs bg-gray-100 text-gray-800 font-semibold px-2 py-0.5 rounded-full"
              aria-hidden="true"
            >
              {closedCount}
            </span>
            <span className="sr-only">({closedCount})</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

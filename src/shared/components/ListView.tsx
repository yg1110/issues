import { GitHubLabel } from "@/schemas/github-label";
import { GitHubSimpleUser } from "@/schemas/github-user";
import { useInfoStore } from "@/store/info";

import IssueLabel from "./IssueLabel";

export interface ListItem {
  id: number;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  link: string;
  labels?: GitHubLabel[];
  icon?: React.ReactNode;
  assignee: GitHubSimpleUser | null;
}

type Props = {
  title: string | React.ReactNode;
  items: ListItem[];
};

export default function ListView({ title, items }: Props) {
  const { user, repo } = useInfoStore();
  const hasItems = items.length > 0;
  return (
    <div className="bg-white border border-gray-300 rounded-md min-h-[60vh]">
      <div className="px-4 py-3 border-b border-gray-300 font-semibold text-gray-800 bg-[#f6f8fa]">{title}</div>

      {hasItems ? (
        items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex justify-between items-center border-b border-gray-300 last:border-none hover:bg-gray-100 transition"
          >
            <div className="flex items-start px-4 py-3 ">
              {item.icon}
              <div className="ml-2">
                <h3 className="font-semibold hover:underline hover:text-blue-600">
                  <a href={`/${user}/${repo}/issue/${item.id}`}>{item.title}</a>
                </h3>

                <div className="text-gray-500 text-sm">{item.description}</div>
                {item.labels && (
                  <div className="flex gap-1 mt-2">
                    {item.labels.map((label) => (
                      <IssueLabel key={label.id} text={label.name} color={`#${label.color}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {item.assignee && (
              <img src={item.assignee.avatar_url} alt={item.assignee.login} className="w-6 h-6 rounded-full mx-4" />
            )}
          </div>
        ))
      ) : (
        <div className="p-[2rem] text-center">
          <h3 className="text-lg font-bold">No results</h3>
          <p className="text-sm mt-1 text-gray-500">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}

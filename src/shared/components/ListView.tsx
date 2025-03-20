import { GitHubLabel } from "../../schemas/github-issue";
import IssueLabel from "./IssueLabel";

export interface ListItem {
  title: string;
  description: string;
  link: string;
  labels?: GitHubLabel[];
  icon?: React.ReactNode;
}

type Props = {
  title: string;
  items: ListItem[];
};

export default function ListView({ title, items }: Props) {
  return (
    <div className="bg-white border border-gray-300 rounded-md">
      <div className="px-4 py-3 border-b border-gray-300 font-semibold text-gray-800 bg-[#f6f8fa]">{title}</div>

      {items.map((item, index) => (
        <a
          key={`${item.title}-${index}`}
          href={item.link}
          className="flex items-start px-4 py-3 border-b border-gray-300 last:border-none hover:bg-gray-100 transition"
        >
          {item.icon}
          <div className="ml-2">
            <h3 className="text-bold font-semibold hover:underline">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            {item.labels && (
              <div className="flex gap-1 mt-2">
                {item.labels.map((label) => (
                  <IssueLabel key={label.id} text={label.name} color={`#${label.color}`} />
                ))}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

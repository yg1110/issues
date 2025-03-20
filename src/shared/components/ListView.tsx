import IssueIcon from "../icons/IssueIcon";

export interface ListItem {
  title: string;
  description: string;
  link: string;
}

type Props = {
  title: string;
  items: ListItem[];
};

export default function ListView({ title, items }: Props) {
  return (
    <div className="bg-white border border-gray-300 rounded-md">
      <div className="px-4 py-3 border-b border-gray-300 font-semibold text-gray-800 bg-[#f6f8fa]">
        {title}
      </div>

      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="flex items-start px-4 py-3 border-b border-gray-300 last:border-none hover:bg-gray-100 transition"
        >
          <div className="mt-1">
            <IssueIcon color="#1a7f37" />
          </div>
          <div className="ml-2">
            <h3 className="text-bold font-semibold hover:underline">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

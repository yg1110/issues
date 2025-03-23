import { useInfoStore } from "@/store/info";

type Props = {
  count: number;
  selected: boolean;
  state: "open" | "closed";
};

export default function StateLabel({ count, state, selected }: Props) {
  const { user, repo } = useInfoStore();

  const selectedClassName = "text-blue-600";
  const notSelectedClassName = "text-gray-600 hover:text-blue-600";
  const className = `flex items-center px-4 py-2 text-sm font-medium ${
    selected ? selectedClassName : notSelectedClassName
  }`;
  const title = state === "open" ? "Open" : "Closed";
  return (
    <a href={`/${user}/${repo}/issues?state=${state}`} aria-current="true" className={className}>
      <span>{title}</span>
      <span
        className="text-xs ml-2 bg-[#818b981f] text-gray-800 font-semibold px-2 py-0.5 rounded-full"
        aria-hidden="true"
      >
        {count}
      </span>
    </a>
  );
}

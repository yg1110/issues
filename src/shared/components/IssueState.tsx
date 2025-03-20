import IssueIcon from "../icons/IssueIcon";

interface Props {
  state: "open" | "closed";
  stateReason?: string | null;
}

export default function IssueState({ state, stateReason }: Props) {
  if (state === "open") {
    return (
      <div className="mt-1">
        <IssueIcon color="#3fb950" type="open" />
      </div>
    );
  }
  if (state === "closed") {
    if (stateReason === "not_planned") {
      return (
        <div className="mt-1">
          <IssueIcon color="#f0f0f0" type="not_planned" />
        </div>
      );
    }
    return (
      <div className="mt-1">
        <IssueIcon color="#ab7df8" type="closed" />
      </div>
    );
  }
  return null;
}

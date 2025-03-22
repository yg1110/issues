import { GitHubLabel, GitHubMilestone } from "@/schemas/github-issue";
import { GitHubSimpleUser } from "@/schemas/github-user";
import IssueLabel from "@/shared/components/IssueLabel";
import MilestoneIcon from "@/shared/icons/MilestoneIcon";

interface Props {
  assignees: GitHubSimpleUser[];
  milestone: GitHubMilestone | null;
  labels: GitHubLabel[];
}
export default function IssueSideBar({ assignees, milestone, labels }: Props) {
  return (
    <div className="w-full md:w-[20%] order-1 md:order-2 flex flex-col gap-4 md:gap-0">
      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-row md:flex-col items-center md:items-baseline">
        <h3 className="font-medium w-25 shrink-0">Assignees</h3>
        {assignees.length > 0 ? (
          <div className="flex flex-col gap-2">
            {assignees.map((user) => (
              <a
                key={user.id}
                href={`${user.html_url}`}
                className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={user.avatar_url} alt={user.login} className="w-6 h-6 rounded-full" />
                <span className="text-sm">{user.login}</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No assignees</p>
        )}
      </div>

      <div className="bg-white md:pb-4 md:mb-4 md:border-b md:border-[#d1d9e0b3] flex flex-row md:flex-col items-center md:items-baseline">
        <h3 className="font-medium w-25 shrink-0">Milestone</h3>
        {milestone ? (
          <a
            href={milestone.html_url}
            className="flex gap-1 items-center hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MilestoneIcon />
            {milestone.title}
          </a>
        ) : (
          <p className="text-gray-400 text-sm">No milestone</p>
        )}
      </div>

      <div className="bg-white flex flex-row md:flex-col items-center md:items-baseline">
        <h3 className="font-medium w-25 shrink-0">Labels</h3>
        {labels.length > 0 ? (
          <div className="flex flex-wrap gap-2 items-center">
            {labels.map((label) => (
              <IssueLabel key={label.id} text={label.name} color={`#${label.color}`} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No labels</p>
        )}
      </div>
    </div>
  );
}

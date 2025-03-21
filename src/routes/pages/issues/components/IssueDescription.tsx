import { GitHubMilestone, GitHubUser } from "../../../../schemas/github-issue";
import MilestoneIcon from "../../../../shared/icons/MilestoneIcon";

type Props = {
  user: GitHubUser;
  milestone: GitHubMilestone | null;
};

export default function IssueDescription({ user, milestone }: Props) {
  const authorUrl = `https://github.com/${user.login}/issues/issues?q=is%3Aissue%20state%3Aopen%20author%3A${user.login}`;
  const milestoneUrl = milestone ? `https://github.com/${user.login}/issues/milestone/${milestone.number}` : "";

  return (
    <div className="flex items-center gap-1">
      <a href={authorUrl} className="hover:text-blue-600 font-medium" target="_blank" rel="noopener noreferrer">
        {user.login}
      </a>

      {milestone && (
        <>
          <span>·</span>
          <a
            href={milestoneUrl}
            className="flex gap-1 items-center hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MilestoneIcon />
            {milestone.title}
          </a>
        </>
      )}
    </div>
  );
}

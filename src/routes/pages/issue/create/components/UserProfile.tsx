import { GitHubUser } from "@/schemas/github-user";

interface Props {
  user: GitHubUser;
}
export default function UserProfile({ user }: Props) {
  return (
    <a href={`https://github.com/${user.login}`} className="shrink-0 hidden md:block">
      <img className="rounded-full w-8 h-8" src={user.avatar_url} alt={user.login} />
    </a>
  );
}

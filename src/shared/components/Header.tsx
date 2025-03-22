import { useInfoStore } from "../../store/info";
import GithubIcon from "../icons/GithubIcon";
import SlashIcon from "../icons/SlashIcon";

export default function Header() {
  const { user, repo } = useInfoStore();
  const ownerLink = `https://github.com/${user}`;
  const repoLink = `https://github.com/${user}/${repo}`;
  return (
    <header className="p-[1rem] flex items-center gap-[0.5rem] sticky top-0 bg-white z-1">
      <a href={`${user}/${repo}/issues`}>
        <GithubIcon />
      </a>
      <nav>
        <ul className="flex items-center text-gray-600 text-sm">
          <a
            href={ownerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-900"
          >
            <span className="font-medium">{user}</span>
          </a>
          <SlashIcon />
          <a href={repoLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900">
            {repo}
          </a>
        </ul>
      </nav>
    </header>
  );
}

import GithubIcon from "../icons/GithubIcon";
import SlashIcon from "../icons/SlashIcon";

export default function Header() {
  const ownerLink = `https://github.com/${import.meta.env.VITE_GITHUB_OWNER}`;
  const repoLink = `https://github.com/${import.meta.env.VITE_GITHUB_OWNER}}/${
    import.meta.env.VITE_GITHUB_REPO
  }`;
  return (
    <header className="p-[1rem] flex items-center gap-[0.5rem] sticky top-0 bg-white z-1">
      <a href="/">
        <GithubIcon />
      </a>
      <nav>
        <ul className="flex items-center text-gray-600 text-sm">
          <a href={ownerLink} className="flex items-center hover:text-gray-900">
            <span className="font-medium">
              {import.meta.env.VITE_GITHUB_OWNER}
            </span>
          </a>
          <SlashIcon />
          <a href={repoLink} className="font-semibold text-gray-900">
            {import.meta.env.VITE_GITHUB_REPO}
          </a>
        </ul>
      </nav>
    </header>
  );
}

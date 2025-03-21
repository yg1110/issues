import ReactMarkdown from "react-markdown";

import { GitHubUser } from "../../../../../schemas/github-issue";

interface Props {
  number: number;
  body: string | null;
  user: GitHubUser;
  created_at: string;
}
export default function IssueBody({ number, body, user, created_at }: Props) {
  return (
    <div className="w-full md:w-[80%] order-2 md:order-1 whitespace-pre-line bg-white space-y-6">
      {body ? (
        <div className="bg-white rounded-md border border-gray-200 mb-6">
          <div className="flex items-start gap-3 bg-[#54aeff66] p-2">
            <a href={`/${user.login}`} className="shrink-0">
              <img src={user.avatar_url} alt={`@${user.login}`} className="w-6 h-6 rounded-full" />
            </a>
            <div className="flex flex-col text-sm">
              <div className="flex items-center gap-1">
                <a href={`https://github.com/${user.login}`} className="text-gray-800 font-medium hover:underline">
                  {user.login}
                </a>
                <span className="text-gray-500">opened</span>
                <a href={`https://github.com/${user.login}/issues/${number}`} className="text-gray-500 hover:underline">
                  {new Date(created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </a>
              </div>
            </div>
          </div>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert p-4">
            {body ? (
              <ReactMarkdown>{body}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">No description provided.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 italic">No description provided.</p>
      )}
    </div>
  );
}

import MDEditor from "@uiw/react-md-editor";

import { GitHubUser } from "../../../../../schemas/github-issue";

interface Props {
  body: string | null;
  user: GitHubUser;
  created_at: string;
}

export default function IssueBody({ body, user, created_at }: Props) {
  return (
    <div className="whitespace-pre-line bg-white space-y-6">
      {body ? (
        <div className="flex w-full gap-4">
          <a href={`https://github.com/${user.login}`} className="shrink-0">
            <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
          </a>
          <div className="flex-1 min-w-0 bg-white rounded-md border border-gray-200 mb-6">
            <div className="flex items-start gap-3 bg-[#ddf4ff] p-2">
              <div className="flex flex-col text-sm">
                <div className="flex items-center gap-1">
                  <a href={`https://github.com/${user.login}`} className="text-gray-800 font-medium hover:underline">
                    {user.login}
                  </a>
                  <span className="text-gray-500">opened</span>
                  <p className="text-gray-500">
                    {new Date(created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full p-4 overflow-x-auto">
              <div data-color-mode="light" className="w-full break-words">
                <MDEditor.Markdown
                  source={body}
                  data-color-mode="light"
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 italic">No description provided.</p>
      )}
    </div>
  );
}

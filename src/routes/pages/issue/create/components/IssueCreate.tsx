import { useState } from "react";

import { GitHubUser } from "@/schemas/github-user";
import BodyEditor from "@/shared/components/BodyEditor";
import Button from "@/shared/components/Button";
import IssueTitle from "@/shared/components/IssueTitle";
import UserProfile from "@/shared/components/UserProfile";
import { useCreateGithubIssue } from "@/shared/hooks/useCreateGithubIssue";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";

interface Props {
  userInfo?: GitHubUser;
}
export default function IssueCreate({ userInfo }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const { mutate: createGithubIssue } = useCreateGithubIssue();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleSubmit = () => {
    if (!user) return;
    createGithubIssue({
      owner: user,
      repo: repo,
      body: body,
      title: title,
      token: import.meta.env.VITE_GITHUB_TOKEN,
    });
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (!userInfo) return;
  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[80%] order-1">
          <div className="flex items-start gap-4 bg-white rounded-md">
            {userInfo && <UserProfile user={userInfo} />}
            <div className="flex flex-col flex-1 gap-4">
              <IssueTitle value={title} onChange={handleTitleChange} />
              <BodyEditor value={body} onChange={handleBodyChange} />

              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <a href={`/${user}/${repo}/issues`} className="text-blue-500">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </a>
                  <Button variant="secondary" disabled={!title || !body} onClick={handleSubmit}>
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

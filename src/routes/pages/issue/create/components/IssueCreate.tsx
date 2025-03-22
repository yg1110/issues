import { useState } from "react";

import { GitHubUser } from "@/schemas/github-user";
import Button from "@/shared/components/Button";

import BodyEditor from "./BodyEditor";
import IssueTitle from "./IssueTitle";
import UserProfile from "./UserProfile";

interface Props {
  user?: GitHubUser;
}
export default function IssueCreate({ user }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleSubmit = () => {
    console.log("title :>> ", title);
    console.log("body :>> ", body);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-2">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-[80%] order-1">
          <div className="flex items-start gap-4 bg-white rounded-md">
            {user && <UserProfile user={user} />}
            <div className="flex flex-col flex-1 gap-4">
              <IssueTitle value={title} onChange={handleTitleChange} />
              <BodyEditor value={body} onChange={handleBodyChange} />

              <div className="flex items-center justify-end">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
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

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

import Button from "@/shared/components/Button";
import { usePageInfoWithHelmet } from "@/shared/hooks/usePageInfoWithHelmet";
import { useUpdateGithubIssue } from "@/shared/hooks/useUpdateGithubIssue";
import IssueStateIcon from "@/shared/icons/IssueStateIcon";

interface Props {
  issueNumber: number;
  state: "open" | "closed";
  avatarUrl: string;
  username: string;
  onSubmit: (text: string) => void;
}
export default function CommentEditorAndState({ issueNumber, state, avatarUrl, username, onSubmit }: Props) {
  const { user, repo } = usePageInfoWithHelmet();
  const [comment, setComment] = useState<string>("");

  const { mutate: updateGithubIssue } = useUpdateGithubIssue({
    issueNumber: issueNumber || 0,
    options: { shouldRedirect: false },
  });

  const onChangeComment = (value: string | undefined) => {
    setComment(value || "");
  };

  const handleUpdateIssueState = (state: "open" | "closed") => {
    if (!issueNumber) return;
    updateGithubIssue({
      id: issueNumber,
      owner: user,
      repo: repo,
      state: state,
    });
  };

  return (
    <div className="flex gap-4 rounded-md bg-white">
      <a href={`/${username}`} className="shrink-0">
        <img src={avatarUrl} alt={username} className="w-10 h-10 rounded-full" />
      </a>

      <div className="flex-1 space-y-3">
        <h2 className="text-sm font-semibold" id="comment-composer-heading">
          Add a comment
        </h2>

        <div data-color-mode="light" className="w-full break-words">
          <MDEditor value={comment} onChange={onChangeComment} />
        </div>

        <div className="flex justify-end gap-2">
          {state === "open" ? (
            <Button
              variant="outline"
              onClick={() => handleUpdateIssueState("closed")}
              icon={<IssueStateIcon color="#8250df" />}
            >
              Close issue
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => handleUpdateIssueState("open")}
              icon={<IssueStateIcon type="open" color="#1a7f37" />}
            >
              Reopen issue
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => {
              onSubmit(comment);
              setComment("");
            }}
            disabled={comment.trim() === ""}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}

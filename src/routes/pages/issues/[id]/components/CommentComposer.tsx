import { useState } from "react";

export function CommentComposer({
  avatarUrl,
  username,
  onSubmit,
}: {
  avatarUrl: string;
  username: string;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-4 rounded-md bg-white">
      <a href={`/${username}`} className="shrink-0">
        <img src={avatarUrl} alt={username} className="w-10 h-10 rounded-full" />
      </a>

      <div className="flex-1 space-y-3">
        <h2 className="text-sm font-semibold" id="comment-composer-heading">
          Add a comment
        </h2>

        <textarea
          className="w-full min-h-[100px] border border-gray-200 rounded-md p-2 text-sm resize-y"
          placeholder="Use Markdown to format your comment"
          aria-labelledby="comment-composer-heading"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              onSubmit(text);
              setText("");
            }}
            disabled={text.trim() === ""}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

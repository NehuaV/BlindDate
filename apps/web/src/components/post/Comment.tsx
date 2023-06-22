import { FiMessageSquare, FiSend, FiThumbsUp } from "react-icons/fi";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";
import comment from "@/utils/comment";
import { useState } from "react";
import { env } from "@/env.mjs";
import { useUser } from "@auth0/nextjs-auth0/client";
import reactToComment from "@/utils/reactToComment";
import { GetReactionsByCommentId } from "@/hooks/GetReactionsByCommentId";
import CommentFooter from "./CommentFooter";

export default function Comment({ postID }: { postID: string }) {
  const URL = env.NEXT_PUBLIC_GATEWAY + `/comment/byPostID/${postID}`;
  const { data: comments, error, mutate, isLoading } = useSWR(URL, fetcher);
  const user = useUser();
  const [content, setContent] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const submitComment = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const URL = env.NEXT_PUBLIC_GATEWAY + "/comment";

    await comment(URL, {
      content,
      userEmail: user.user?.email,
      postID,
    });

    mutate();
  };

  return (
    <>
      <form
        onSubmit={submitComment}
        className="flex items-center bg-slate-100 p-4"
      >
        <FiMessageSquare
          style={{
            height: "2rem",
            width: "2rem",
            display: "inline-block",
            marginRight: "0.5rem",
          }}
        />
        <input
          type={"text"}
          className="m-2 h-12 w-full shadow-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button type="submit" className="hover:bg-blue-100">
          <FiSend
            style={{
              height: "2rem",
              width: "2rem",
              display: "inline-block",
              marginRight: "0.5rem",
            }}
          />
        </button>
      </form>
      <section>
        {comments ? (
          comments?.comments.map((comment: any, index: number) => {
            return (
              <article
                className="mb-6 rounded-lg border shadow-md"
                key={comment.id}
              >
                <header className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <span className="ml-2 font-semibold">
                      {comment?.user.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Created at:{" "}
                    {new Intl.DateTimeFormat("nl-NL").format(
                      new Date(comment?.created_at)
                    )}
                  </span>
                </header>
                <main className="p-4">
                  <p className="text-gray-800">{comment.content}</p>
                </main>
                <CommentFooter comment={comment} />
              </article>
            );
          })
        ) : error ? (
          <div className="text-red-500">Error: {error?.message}</div>
        ) : (
          <div className="text-gray-500">Loading...</div>
        )}
      </section>
    </>
  );
}

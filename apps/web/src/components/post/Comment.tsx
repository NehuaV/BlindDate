import { FiMessageSquare, FiSend, FiThumbsUp } from "react-icons/fi";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import comment from "@/utils/comment";
import { useState } from "react";
import { env } from "@/env.mjs";

export default function Comment() {
  const { query, isReady } = useRouter();
  const { postID } = query;
  const URL = env.NEXT_PUBLIC_GATEWAY + `comment/byPostID/${postID}`;
  const { data: comments, error } = useSWR(isReady ? URL : null, fetcher);

  const [content, setContent] = useState("");

  if (error) return <div>Error: {error?.message}</div>;

  const submitComment = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const URL = env.NEXT_PUBLIC_GATEWAY + "/comment";
    if (URL) {
      const created_at = new Date().toISOString();
      await comment(URL, {
        content,
        created_at,
        postID,
      });
    }
    window.location.reload();
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
          comments?.comments.map((comment: any) => {
            return (
              <article className="border-1 mb-2 border" key={comment.id}>
                <header className="flex gap-4 border-b-2 p-2">
                  <span>User {comment?.userId}</span>
                  <span>
                    Created at:{" "}
                    {new Intl.DateTimeFormat("nl-NL").format(
                      new Date(comment?.created_at)
                    )}
                  </span>
                </header>
                <main className="border-b-2 p-2">{comment.content}</main>
                <footer className="flex gap-4 p-2">
                  <button>Like</button>
                  <button>Dislike</button>
                </footer>
              </article>
            );
          })
        ) : (
          <div className="sr-only">Loading...</div>
        )}
      </section>
    </>
  );
}

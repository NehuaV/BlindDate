import { FiMessageSquare, FiSend } from "react-icons/fi";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Comment() {
  const { query, isReady } = useRouter();
  const { postID } = query;
  const URL =
    process.env.NEXT_PUBLIC_COMMENT_SERVICE_URL + `/byPostID/${postID}`;
  const { data: comments, error } = useSWR(isReady ? URL : null, fetcher);

  if (error) return <div>Error: {error?.message}</div>;

  return (
    <>
      <section className="flex items-center bg-slate-100 p-4">
        <FiMessageSquare
          style={{
            height: "2rem",
            width: "2rem",
            display: "inline-block",
            marginRight: "0.5rem",
          }}
        />
        <input type={"text"} className="m-2 h-12 w-full shadow-sm"></input>
        <FiSend
          style={{
            height: "2rem",
            width: "2rem",
            display: "inline-block",
          }}
        />
      </section>
      <section>
        {comments ? (
          comments?.map((comment: any) => {
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

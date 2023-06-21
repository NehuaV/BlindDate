import { useUser } from "@auth0/nextjs-auth0/client";
import { env } from "@/env.mjs";
import { GetReactionsByCommentId } from "@/hooks/GetReactionsByCommentId";
import reactToComment from "@/utils/reactToComment";

export default function CommentFooter(comment: any) {
  const user = useUser();
  const { data, isLoading, error, mutate } = GetReactionsByCommentId(
    comment.comment.id
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const handleReaction = async (reaction: string, commentId: string) => {
    const URL = env.NEXT_PUBLIC_GATEWAY + "/comment/react";

    const data = {
      commentId: commentId,
      userEmail: user.user!.email,
      reaction: reaction,
    };

    try {
      await reactToComment(URL, data); // Pass the data object to the react function
    } catch (error) {
      console.error("Error reacting to post:", error);
    }

    mutate();
  };

  console.log(data.reactions);

  return (
    <footer className="flex gap-4 p-2">
      <button onClick={() => handleReaction("LIKE", comment.comment.id)}>
        {data.reactions.likes} Like
      </button>
      <button onClick={() => handleReaction("DISLIKE", comment.comment.id)}>
        {data.reactions.dislikes} Dislike
      </button>
    </footer>
  );
}

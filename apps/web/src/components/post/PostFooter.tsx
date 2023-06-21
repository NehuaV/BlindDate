import {
  FiThumbsUp,
  FiThumbsDown,
  FiMessageSquare,
  FiArchive,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { env } from "@/env.mjs";
import react from "@/utils/react";
import { GetReactionsByPostId } from "@/hooks/GetReactionsByPostId";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function PostFooter(postId: any) {
  const id = postId.postId;
  const {
    data: reactions,
    isLoading,
    error,
    mutate,
  } = GetReactionsByPostId(id);
  const user = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  const handleReaction = async (reaction: string) => {
    const URL = env.NEXT_PUBLIC_GATEWAY + "/post/react";
    if (!URL) {
      console.error("URL is not defined.");
      return;
    }

    const data = {
      postId: id,
      userEmail: user.user!.email,
      reaction: reaction,
    };

    try {
      await react(URL, data); // Pass the data object to the react function
    } catch (error) {
      console.error("Error reacting to post:", error);
    }

    mutate();
  };

  return (
    <>
      <footer className="m-4 flex justify-between gap-4 align-middle">
        <div className="flex justify-center gap-4 align-middle">
          <button
            className="hover:bg-blue-100"
            onClick={() => handleReaction("LIKE")}
          >
            <FiThumbsUp
              style={{
                height: "2rem",
                width: "2rem",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            />
            {reactions.reactions.likes}
          </button>
          <button
            className="hover:bg-blue-100"
            onClick={() => handleReaction("DISLIKE")}
          >
            <FiThumbsDown
              style={{
                height: "2rem",
                width: "2rem",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            />
            {reactions.reactions.dislikes}
          </button>
          <button className="hover:bg-blue-100">
            <FiMessageSquare
              style={{
                height: "2rem",
                width: "2rem",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            />
            Comment
          </button>
        </div>
        <button className="hover:bg-blue-100">
          <FiArchive
            style={{
              height: "2rem",
              width: "2rem",
              display: "inline-block",
              marginRight: "0.5rem",
            }}
          />
          Save
        </button>
      </footer>
    </>
  );
}

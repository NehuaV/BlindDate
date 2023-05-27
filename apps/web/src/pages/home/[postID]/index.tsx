import { useRouter } from "next/router";

import Post from "@/components/post/Post";
import PostLayout from "@/layouts/PostLayout";
import Comment from "@/components/post/Comment";
import { GetPostById } from "@/hooks/GetPostById";
import { PostSchema } from "@/types/post";

export default function PostPage() {
  const router = useRouter();
  const { postID } = router.query;

  // Fetch the post using the postID
  const { data: post, isLoading, error } = GetPostById(postID as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !post) {
    return <div>Error: {error ? error.message : "Post not found"}</div>;
  }

  return (
    <div className="shadow-lg">
      <section>
        <Post post={post.post} />
      </section>
      <Comment postID={post.post.id} />
    </div>
  );
}

PostPage.GetLayout = function GetLayout(page: React.ReactNode) {
  return <PostLayout>{page}</PostLayout>;
};

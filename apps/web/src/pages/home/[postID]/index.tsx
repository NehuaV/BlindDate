import { useRouter } from "next/router";

import Post from "@/components/post/Post";
import PostLayout from "@/layouts/PostLayout";
import Comment from "@/components/post/Comment";
import { GetPostById } from "@/hooks/GetPostById";
import { PostSchema } from "@/types/post";

export default function PostPage() {
  const router = useRouter();
  const isReady = router.isReady;

  if (!isReady) {
    return <div>Loading...</div>;
  }

  const { postID } = router.query;

  return (
    <div className="shadow-lg">
      <section>
        <Post postID={postID as string} />
      </section>
      <Comment postID={postID as string} />
    </div>
  );
}

PostPage.GetLayout = function GetLayout(page: React.ReactNode) {
  return <PostLayout>{page}</PostLayout>;
};

import { GetPosts } from "@/hooks/GetPosts";
import { PostSchema } from "src/types/post";
import PostPreview from "@/components/PostPreview";

interface FeedProps {
  selectedFilter: string;
}

export default function Feed({ selectedFilter }: FeedProps) {
  const { data: posts, isLoading, error } = GetPosts();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading || !posts) return <div>Loading...</div>;

  let sortedPosts = [...posts.posts];

  switch (selectedFilter) {
    //TODO: Implement sorting by Most Popular
    case "Newest":
      sortedPosts.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      break;
    case "Active":
      sortedPosts = sortedPosts
        .filter((post) => post.status === "ACTIVE")
        .sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
      break;
    case "Urgent":
      sortedPosts = sortedPosts
        .filter((post) => post.status === "URGENT")
        .sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
      break;
    case "Closed":
      sortedPosts = sortedPosts
        .filter((post) => post.status === "CLOSED")
        .sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
      break;
    default:
      break;
  }

  return (
    <>
      {sortedPosts.map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          title={post.title}
          username={post.authorUsername}
          created_at={post.created_at}
          status={post.status}
          picture={post.picture}
        />
      ))}
    </>
  );
}

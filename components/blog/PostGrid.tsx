import PostCard from "./PostCard";

interface PostGridProps {
  posts: any[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts?.length) {
    return (
      <p className="text-center text-evergreen/50 py-12">
        No posts found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

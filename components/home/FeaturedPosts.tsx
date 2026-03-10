import PostGrid from "@/components/blog/PostGrid";

interface FeaturedPostsProps {
  posts: any[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-heading text-3xl md:text-4xl text-evergreen mb-8">
        Featured
      </h2>
      <PostGrid posts={posts} />
    </section>
  );
}

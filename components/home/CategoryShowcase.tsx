import Link from "next/link";
import PostCard from "@/components/blog/PostCard";

interface CategoryShowcaseProps {
  title: string;
  posts: any[];
  categorySlug: string;
}

export default function CategoryShowcase({
  title,
  posts,
  categorySlug,
}: CategoryShowcaseProps) {
  if (!posts?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl md:text-3xl text-evergreen">
          {title}
        </h2>
        <Link
          href={`/blog?category=${categorySlug}`}
          className="text-sm font-medium text-emerald hover:text-emerald/80 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

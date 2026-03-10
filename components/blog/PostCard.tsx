import Link from "next/link";
import ImageWithBlur from "@/components/ui/ImageWithBlur";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: {
    title: string;
    slug: { current: string };
    mainImage?: any;
    excerpt?: string;
    postType: string;
    publishedAt: string;
    categories?: { title: string; slug: { current: string }; color?: string }[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithBlur
          image={post.mainImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.categories?.map((cat) => (
            <Tag
              key={cat.slug.current}
              label={cat.title}
              color={cat.color}
            />
          ))}
        </div>
        <h3 className="font-heading text-lg text-evergreen group-hover:text-emerald transition-colors mb-1">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-evergreen/60 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <time className="text-xs text-evergreen/40">
          {formatDate(post.publishedAt)}
        </time>
      </div>
    </Link>
  );
}

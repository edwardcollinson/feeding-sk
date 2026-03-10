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

const postTypeBadge: Record<string, { label: string; bg: string; text: string }> = {
  recipe: {
    label: "Recipe",
    bg: "bg-emerald/15",
    text: "text-emerald",
  },
  review: {
    label: "Review",
    bg: "bg-bubblegum/15",
    text: "text-bubblegum",
  },
  lifestyle: {
    label: "Lifestyle",
    bg: "bg-sky-blue/20",
    text: "text-steel-blue",
  },
};

export default function PostCard({ post }: PostCardProps) {
  const badge = postTypeBadge[post.postType?.toLowerCase()] ?? {
    label: post.postType,
    bg: "bg-emerald/15",
    text: "text-emerald",
  };

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group relative flex flex-col bg-offwhite rounded-3xl overflow-hidden
        shadow-[0_2px_12px_rgba(4,42,43,0.06)]
        hover:shadow-[0_12px_40px_rgba(4,42,43,0.12)]
        transform-gpu transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:scale-[1.015]
        ring-1 ring-evergreen/[0.04]"
    >
      {/* ---------- Image container ---------- */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithBlur
          image={post.mainImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out
            group-hover:scale-110"
        />

        {/* Gradient overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0
            bg-gradient-to-t from-evergreen/50 via-evergreen/10 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Post-type badge */}
        <span
          className={`absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1
            rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider
            backdrop-blur-md ${badge.bg} ${badge.text}
            ring-1 ring-white/25 shadow-sm`}
        >
          {badge.label}
        </span>
      </div>

      {/* ---------- Content ---------- */}
      <div className="flex flex-1 flex-col p-5 pt-4 gap-3">
        {/* Category tags */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {post.categories.map((cat) => (
              <Tag
                key={cat.slug.current}
                label={cat.title}
                color={cat.color}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className="font-heading text-lg leading-snug text-evergreen
            group-hover:text-emerald transition-colors duration-300"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm leading-relaxed text-evergreen/55 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Footer: date + read-more arrow */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-evergreen/[0.06]">
          <time
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide
              text-evergreen/40 uppercase"
          >
            <svg
              className="w-3.5 h-3.5 text-emerald/60"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {formatDate(post.publishedAt)}
          </time>

          <span
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald
              opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300"
          >
            Read
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

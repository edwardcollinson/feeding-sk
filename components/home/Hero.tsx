import Link from "next/link";
import ImageWithBlur from "@/components/ui/ImageWithBlur";

interface HeroProps {
  post?: {
    title: string;
    slug: { current: string };
    mainImage?: any;
    excerpt?: string;
  };
}

export default function Hero({ post }: HeroProps) {
  if (!post) {
    return (
      <section className="relative h-[70vh] bg-evergreen flex items-center justify-center">
        <div className="text-center text-offwhite">
          <h1 className="font-heading text-5xl md:text-7xl mb-4">
            Feeding SK
          </h1>
          <p className="text-lg md:text-xl text-offwhite/80 max-w-lg mx-auto">
            Recipes, SF eats & lifestyle
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh]">
      <ImageWithBlur
        image={post.mainImage}
        alt={post.mainImage?.alt || post.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-evergreen/70 via-evergreen/20 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto max-w-7xl w-full px-6 pb-12 md:pb-16">
          <h1 className="font-heading text-4xl md:text-6xl text-offwhite mb-4 max-w-2xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-offwhite/80 text-lg md:text-xl max-w-xl mb-6">
              {post.excerpt}
            </p>
          )}
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center rounded-full bg-emerald text-white px-6 py-3 font-semibold hover:bg-emerald/90 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}

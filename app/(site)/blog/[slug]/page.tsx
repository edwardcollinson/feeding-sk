import { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageWithBlur from "@/components/ui/ImageWithBlur";
import Tag from "@/components/ui/Tag";
import RecipeDetails from "@/components/blog/RecipeDetails";
import RestaurantDetails from "@/components/blog/RestaurantDetails";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import PostGrid from "@/components/blog/PostGrid";
import ShareButtons from "@/components/blog/ShareButtons";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { getPostBySlug, getRelatedPosts, getPostSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^\/+/, "");
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  const categories = post.categories?.map((cat: any) => cat.title) || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      url: `${SITE_URL}/blog/${slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      authors: ["SK"],
      section: categories[0],
      tags: categories,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^\/+/, "");
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const firstCategorySlug = post.categories?.[0]?.slug?.current;
  const relatedPosts = await getRelatedPosts(
    post._id,
    firstCategorySlug,
    3
  );

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const ogImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;
  const categoryNames = post.categories?.map((cat: any) => cat.title) || [];

  // JSON-LD structured data
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": post.postType === "recipe" ? "Recipe" : "Article",
    headline: post.title,
    description: post.excerpt || "",
    url: postUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    keywords: categoryNames.join(", "),
    author: { "@type": "Person", name: "SK" },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  if (post.postType === "recipe") {
    jsonLd.prepTime = post.prepTime ? `PT${post.prepTime}M` : undefined;
    jsonLd.cookTime = post.cookTime ? `PT${post.cookTime}M` : undefined;
    jsonLd.recipeYield = post.servings ? `${post.servings} servings` : undefined;
    jsonLd.recipeIngredient = post.ingredients?.map(
      (ing: any) =>
        [ing.amount, ing.unit, ing.name].filter(Boolean).join(" ")
    );
  }

  if (post.postType === "review" && post.restaurantInfo) {
    jsonLd["@type"] = "Review";
    jsonLd.itemReviewed = {
      "@type": "Restaurant",
      name: post.restaurantInfo.name,
      address: post.restaurantInfo.address,
      servesCuisine: post.restaurantInfo.cuisine,
    };
    if (post.restaurantInfo.rating) {
      jsonLd.reviewRating = {
        "@type": "Rating",
        ratingValue: post.restaurantInfo.rating,
        bestRating: 5,
      };
    }
  }

  if (ogImageUrl) {
    jsonLd.image = ogImageUrl;
  }

  // Breadcrumb JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="pb-16">
        {/* Hero image */}
        {post.mainImage && (
          <div className="relative w-full h-[50vh] md:h-[60vh]">
            <ImageWithBlur
              image={post.mainImage}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-evergreen/60 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 -mt-24 relative z-10">
          {/* Meta */}
          <div className="bg-offwhite rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.categories?.map((cat: any) => (
                <Tag
                  key={cat.slug.current}
                  label={cat.title}
                  href={`/blog?category=${cat.slug.current}`}
                  color={cat.color}
                />
              ))}
            </div>

            <h1 className="font-heading text-3xl md:text-5xl text-evergreen mb-3">
              {post.title}
            </h1>

            {post.publishedAt && (
              <time className="text-sm text-evergreen/50">
                {formatDate(post.publishedAt)}
              </time>
            )}

            <div className="mt-4">
              <ShareButtons
                url={postUrl}
                title={post.title}
                imageUrl={ogImageUrl}
                description={post.excerpt}
              />
            </div>

            {/* Recipe details */}
            {post.postType === "recipe" && (
              <div className="mt-8">
                <RecipeDetails
                  prepTime={post.prepTime}
                  cookTime={post.cookTime}
                  servings={post.servings}
                  ingredients={post.ingredients}
                />
              </div>
            )}

            {/* Restaurant details */}
            {post.postType === "review" && post.restaurantInfo && (
              <div className="mt-8">
                <RestaurantDetails info={post.restaurantInfo} />
              </div>
            )}

            {/* Body */}
            <div className="mt-8">
              <PortableTextRenderer value={post.body} />
            </div>

            {/* Instructions for recipes */}
            {post.postType === "recipe" && post.instructions && (
              <div className="mt-8">
                <h2 className="font-heading text-2xl mb-4">Instructions</h2>
                <PortableTextRenderer value={post.instructions} />
              </div>
            )}

            {/* Share buttons (bottom) */}
            <div className="mt-10 pt-6 border-t border-evergreen/10">
              <ShareButtons
                url={postUrl}
                title={post.title}
                imageUrl={ogImageUrl}
                description={post.excerpt}
              />
            </div>

            {/* ShopMy links */}
            {post.shopMyLinks && post.shopMyLinks.length > 0 && (
              <div className="mt-10 p-6 bg-sky-blue/10 rounded-2xl">
                <h3 className="font-heading text-lg mb-3">Shop This Post</h3>
                <div className="flex flex-wrap gap-3">
                  {post.shopMyLinks.map((link: any, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-emerald text-white px-4 py-2 text-sm font-medium hover:bg-emerald/90 transition-colors"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mx-auto max-w-3xl px-6 mt-12">
          <NewsletterSignup />
        </div>

        {/* Related posts */}
        {relatedPosts?.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 mt-16">
            <h2 className="font-heading text-2xl text-evergreen mb-6">
              More Like This
            </h2>
            <PostGrid posts={relatedPosts} />
          </div>
        )}
      </article>
    </>
  );
}

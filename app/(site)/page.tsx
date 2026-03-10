import Hero from "@/components/home/Hero";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import InstagramFeed from "@/components/home/InstagramFeed";
import ShopMyEmbed from "@/components/home/ShopMyEmbed";
import { getSiteSettings, getLatestPostsByType } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, latestRecipes, latestReviews] = await Promise.all([
    getSiteSettings(),
    getLatestPostsByType("recipe", 3),
    getLatestPostsByType("review", 3),
  ]);

  return (
    <>
      <Hero post={settings?.heroPost} />

      <FeaturedPosts posts={settings?.featuredPosts} />

      <CategoryShowcase
        title="Recipes"
        posts={latestRecipes}
        categorySlug="recipe"
      />

      <CategoryShowcase
        title="SF Eats"
        posts={latestReviews}
        categorySlug="review"
      />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <NewsletterSignup />
      </div>

      <InstagramFeed />

      <ShopMyEmbed
        profileUrl={settings?.shopMyProfileUrl}
        title="SK's Favorites"
      />
    </>
  );
}

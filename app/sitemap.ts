import { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsForSitemap();

  const postEntries: MetadataRoute.Sitemap = posts.map(
    (post: { slug: string; _updatedAt: string }) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/links`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...postEntries];
}

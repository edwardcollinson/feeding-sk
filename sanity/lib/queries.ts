import { client } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function safeFetch(query: string, params: Record<string, unknown> = {}, fallback: any = null): Promise<any> {
  try {
    return await client.fetch(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.warn("Sanity fetch failed (is the project configured?):", (error as Error).message);
    return fallback;
  }
}

// ── Site Settings ──
export async function getSiteSettings() {
  return safeFetch(
    `*[_type == "siteSettings"][0]{
      siteTitle,
      tagline,
      description,
      logo,
      heroPost->{
        title,
        slug,
        mainImage,
        excerpt,
        postType,
        publishedAt
      },
      featuredPosts[]->{
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        postType,
        publishedAt,
        categories[]->{title, slug, color}
      },
      instagramHandle,
      shopMyProfileUrl,
      newsletterHeading,
      newsletterText
    }`,
    {},
    null
  );
}

// ── Posts ──
export async function getAllPosts(
  category?: string,
  page = 1,
  pageSize = 9
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const categoryFilter = category
    ? `&& count(categories[@->slug.current == "${category}"]) > 0`
    : "";

  const posts = await safeFetch(
    `*[_type == "post" ${categoryFilter}] | order(publishedAt desc) [${start}...${end}]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      postType,
      publishedAt,
      categories[]->{title, slug, color}
    }`,
    {},
    []
  );

  const total = await safeFetch(
    `count(*[_type == "post" ${categoryFilter}])`,
    {},
    0
  );

  return { posts, total };
}

export async function getPostBySlug(slug: string) {
  return safeFetch(
    `*[_type == "post" && (slug.current == $slug || slug.current == "/" + $slug)][0]{
      _id,
      title,
      slug,
      postType,
      mainImage,
      excerpt,
      publishedAt,
      body,
      categories[]->{title, slug, color},
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
      restaurantInfo,
      shopMyLinks,
      seo
    }`,
    { slug },
    null
  );
}

export async function getRelatedPosts(
  postId: string,
  categorySlug?: string,
  limit = 3
) {
  const categoryFilter = categorySlug
    ? `&& count(categories[@->slug.current == "${categorySlug}"]) > 0`
    : "";

  return safeFetch(
    `*[_type == "post" && _id != $postId ${categoryFilter}] | order(publishedAt desc) [0...${limit}]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      postType,
      publishedAt,
      categories[]->{title, slug, color}
    }`,
    { postId },
    []
  );
}

export async function getPostSlugs() {
  return safeFetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": select(slug.current match "/*" => string::split(slug.current, "/")[1], slug.current)
    }`,
    {},
    []
  );
}

export async function getLatestPostsByType(
  postType: string,
  limit = 3
) {
  return safeFetch(
    `*[_type == "post" && postType == $postType] | order(publishedAt desc) [0...${limit}]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      postType,
      publishedAt,
      categories[]->{title, slug, color}
    }`,
    { postType },
    []
  );
}

// ── Categories ──
export async function getAllCategories() {
  return safeFetch(
    `*[_type == "category"] | order(title asc){
      _id,
      title,
      slug,
      description,
      color
    }`,
    {},
    []
  );
}

// ── Author ──
export async function getAuthor() {
  return safeFetch(
    `*[_type == "author"][0]{
      name,
      bio,
      image,
      instagram,
      email
    }`,
    {},
    null
  );
}

// ── Links ──
export async function getActiveLinks() {
  return safeFetch(
    `*[_type == "linkInBio" && isActive == true] | order(order asc){
      _id,
      title,
      url,
      icon,
      description,
      order
    }`,
    {},
    []
  );
}

// ── Sitemap ──
export async function getAllPostsForSitemap() {
  return safeFetch(
    `*[_type == "post" && defined(slug.current)]{
      "slug": select(slug.current match "/*" => string::split(slug.current, "/")[1], slug.current),
      publishedAt,
      _updatedAt
    }`,
    {},
    []
  );
}

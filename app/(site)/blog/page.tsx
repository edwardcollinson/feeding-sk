import { Metadata } from "next";
import PostGrid from "@/components/blog/PostGrid";
import CategoryFilter from "@/components/blog/CategoryFilter";
import { getAllPosts, getAllCategories } from "@/sanity/lib/queries";
import { POSTS_PER_PAGE } from "@/lib/constants";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Recipes, SF restaurant reviews, and lifestyle posts by Feeding SK.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [{ posts, total }, categories] = await Promise.all([
    getAllPosts(category, currentPage, POSTS_PER_PAGE),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-heading text-4xl md:text-5xl text-evergreen mb-8">
        Blog
      </h1>

      <div className="mb-8">
        <CategoryFilter categories={categories} />
      </div>

      <PostGrid posts={posts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {currentPage > 1 && (
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage - 1}`}
              className="rounded-full px-4 py-2 text-sm font-medium bg-evergreen/5 text-evergreen hover:bg-evergreen/10 transition-colors"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?${category ? `category=${category}&` : ""}page=${p}`}
              className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-emerald text-white"
                  : "bg-evergreen/5 text-evergreen hover:bg-evergreen/10"
              }`}
            >
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}page=${currentPage + 1}`}
              className="rounded-full px-4 py-2 text-sm font-medium bg-evergreen/5 text-evergreen hover:bg-evergreen/10 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Category {
  title: string;
  slug: { current: string };
}

function CategoryFilterInner({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  function handleFilter(slug: string) {
    if (slug === active) {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${slug}`);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => router.push("/blog")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !active
            ? "bg-emerald text-white"
            : "bg-evergreen/5 text-evergreen/70 hover:bg-evergreen/10"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug.current}
          onClick={() => handleFilter(cat.slug.current)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === cat.slug.current
              ? "bg-emerald text-white"
              : "bg-evergreen/5 text-evergreen/70 hover:bg-evergreen/10"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <CategoryFilterInner categories={categories} />
    </Suspense>
  );
}

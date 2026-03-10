"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ImageWithBlur from "@/components/ui/ImageWithBlur";

interface HeroProps {
  post?: {
    title: string;
    slug: { current: string };
    mainImage?: any;
    excerpt?: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Scroll indicator that bounces at the bottom of the hero           */
/* ------------------------------------------------------------------ */
function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
      <span className="text-offwhite/60 text-xs tracking-[0.25em] uppercase font-body">
        Scroll
      </span>
      <svg
        className="w-5 h-5 text-offwhite/60 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Branded hero (no featured post)                                   */
/* ------------------------------------------------------------------ */
function BrandedHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-evergreen">
      {/* Animated gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute -top-1/4 -left-1/4 h-[80%] w-[80%] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #3CB961 0%, transparent 70%)",
            animation: "float-slow 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[70%] w-[70%] rounded-full opacity-25 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #F16A87 0%, transparent 70%)",
            animation: "float-slow 14s ease-in-out infinite alternate-reverse",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 h-[40%] w-[40%] rounded-full opacity-15 blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, #9ED0E6 0%, transparent 70%)",
            animation: "float-slow 10s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Brand mark */}
        <div
          className="mb-6 transition-all duration-1000 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="inline-block rounded-full border border-offwhite/20 px-5 py-2 text-xs tracking-[0.3em] uppercase text-offwhite/70 backdrop-blur-sm">
            @feedingsk
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-offwhite mb-4 transition-all duration-1000 delay-200 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <span className="block">Feeding</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3CB961, #9ED0E6, #F16A87)",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 6s ease-in-out infinite",
            }}
          >
            SK
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="max-w-md text-lg md:text-xl text-offwhite/60 font-body transition-all duration-1000 delay-500 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Recipes, SF eats &amp; lifestyle
        </p>

        {/* Decorative divider */}
        <div
          className="mt-8 h-px w-16 transition-all duration-1000 delay-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            backgroundImage: "linear-gradient(90deg, #3CB961, #F16A87)",
          }}
        />
      </div>

      <ScrollIndicator />

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes float-slow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(40px, -30px) scale(1.1);
          }
        }
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured post hero                                                */
/* ------------------------------------------------------------------ */
export default function Hero({ post }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!post) return <BrandedHero />;

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      <ImageWithBlur
        image={post.mainImage}
        alt={post.mainImage?.alt || post.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Animated gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(4,42,43,0.4) 0%, rgba(60,185,97,0.15) 40%, rgba(241,106,135,0.15) 70%, rgba(4,42,43,0.6) 100%)",
          backgroundSize: "300% 300%",
          animation: "overlay-shift 10s ease-in-out infinite",
        }}
      />

      {/* Darkening gradient from the bottom for readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-evergreen/80 via-evergreen/30 to-transparent"
      />

      {/* Top-left brand watermark */}
      <div
        className="absolute top-6 left-6 z-10 transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-offwhite/50 font-body">
          @feedingsk
        </span>
      </div>

      {/* Glassmorphism card */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 md:pb-24">
          <div
            className="max-w-2xl rounded-2xl border border-offwhite/10 p-8 md:p-10 backdrop-blur-md transition-all duration-1000 ease-out"
            style={{
              background:
                "linear-gradient(135deg, rgba(4,42,43,0.5) 0%, rgba(4,42,43,0.3) 100%)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {/* Category / label */}
            <span
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-all duration-700 delay-300 ease-out"
              style={{
                background: "rgba(60,185,97,0.2)",
                color: "#3CB961",
                opacity: mounted ? 1 : 0,
              }}
            >
              Featured
            </span>

            {/* Title */}
            <h1
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4 leading-tight transition-all duration-700 delay-200 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="mb-8 max-w-xl text-base md:text-lg text-offwhite/70 leading-relaxed font-body transition-all duration-700 delay-400 ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(15px)",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* CTA button */}
            <Link
              href={`/blog/${post.slug.current.replace(/^\/+/, "")}`}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(60,185,97,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* Shine sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
              />
              <span className="relative z-10">Read More</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <ScrollIndicator />

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes overlay-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

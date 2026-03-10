"use client";

import Link from "next/link";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/links", label: "Links" },
  { href: "/shop", label: "Shop" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-evergreen text-offwhite">
      {/* ---- Decorative gradient top border ---- */}
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background:
            "linear-gradient(90deg, #3CB961 0%, #9ED0E6 40%, #F16A87 100%)",
        }}
      />

      {/* ---- Faint radial glow for depth ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, #3CB961 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-10">
        {/* ---- Main grid ---- */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-3xl tracking-tight mb-3">
              Feeding SK
            </h3>
            <p className="text-offwhite/60 text-sm leading-relaxed max-w-xs">
              Recipes, SF eats &amp; lifestyle content crafted with love and a
              serious appetite.
            </p>

            {/* Tiny fork-and-knife decorative divider */}
            <p
              aria-hidden="true"
              className="mt-4 text-offwhite/20 text-xs tracking-[0.35em] select-none"
            >
              &mdash;&mdash;&mdash;
            </p>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] mb-4 text-bubblegum">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-offwhite/70 transition-colors duration-200 hover:text-emerald"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-px w-0 bg-emerald transition-all duration-200 group-hover:w-3"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] mb-4 text-bubblegum">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com/feedingsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-offwhite/70 transition-colors duration-200 hover:text-bubblegum"
                >
                  {/* Instagram icon */}
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  @feedingsk
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@feedingsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-offwhite/70 transition-colors duration-200 hover:text-bubblegum"
                >
                  {/* TikTok icon */}
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.89c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.7 4.59c1.73-1.73 2.49-4.02 2.49-6.28V9.4a8.16 8.16 0 004.74 1.52V7.45a4.85 4.85 0 01-1.49-.76z" />
                  </svg>
                  @feedingsk
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top column */}
          <div className="flex flex-col items-start lg:items-end justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-offwhite/40 text-xs uppercase tracking-widest transition-colors duration-300 hover:text-emerald cursor-pointer"
            >
              Back to top
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-offwhite/15 transition-all duration-300 group-hover:border-emerald/40 group-hover:-translate-y-0.5">
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-offwhite/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-offwhite/30">
            &copy; {new Date().getFullYear()} Feeding SK. All rights reserved.
          </p>
          <p className="text-[11px] text-offwhite/20">
            Made with care in San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
}

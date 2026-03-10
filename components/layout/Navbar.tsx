"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/links", label: "Links" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-offwhite/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(4,42,43,0.08)]" : "shadow-none"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group relative flex items-center gap-2">
          {/* Decorative leaf dot */}
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 transition-colors duration-300 group-hover:bg-emerald/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-emerald transition-transform duration-300 group-hover:rotate-12"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3.5 1-7.5-1-10.5C8.5 8.5 5 7.5 2 8" />
              <path d="M12 2c3 3 4.5 7 4.5 11" />
            </svg>
          </span>
          <span className="font-heading text-2xl tracking-tight text-evergreen transition-colors duration-300 group-hover:text-emerald">
            Feeding
            <span className="text-bubblegum"> SK</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-active={active ? "true" : undefined}
                  className={`nav-link-desktop relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-emerald"
                      : "text-evergreen/70 hover:text-evergreen"
                  }`}
                >
                  {link.label}

                  {/* Active indicator dot */}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-bubblegum" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA button - desktop */}
        <div className="hidden md:block">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-5 py-2 text-sm font-semibold text-offwhite shadow-sm transition-all duration-200 hover:bg-emerald/90 hover:shadow-md active:scale-[0.97]"
          >
            Shop
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-evergreen/5"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="flex h-5 w-6 flex-col items-center justify-center">
            <span
              className={`block h-[2px] w-6 rounded-full bg-evergreen transition-all duration-300 ease-out ${
                isOpen
                  ? "translate-y-[5px] rotate-45"
                  : ""
              }`}
            />
            <span
              className={`mt-[4px] block h-[2px] rounded-full bg-evergreen transition-all duration-300 ease-out ${
                isOpen
                  ? "w-0 opacity-0"
                  : "w-6 opacity-100"
              }`}
            />
            <span
              className={`mt-[4px] block h-[2px] w-6 rounded-full bg-evergreen transition-all duration-300 ease-out ${
                isOpen
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Desktop hover underline styles — injected via a <style> tag
          so we can target the :hover pseudo-class directly */}
      <style>{`
        .nav-link-desktop {
          position: relative;
          display: inline-block;
        }
        .nav-link-desktop::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          width: 0;
          border-radius: 9999px;
          background: #3CB961;
          opacity: 0.6;
          transition: width 0.3s ease;
        }
        .nav-link-desktop:hover::after {
          width: 100%;
        }
        .nav-link-desktop[data-active="true"]::after {
          width: 0;
        }
      `}</style>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-evergreen/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-40 h-full w-[80%] max-w-sm bg-offwhite shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-8 pt-24 pb-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li
                  key={link.href}
                  className={`transition-all duration-500 ease-out ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${100 + i * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-colors duration-200 ${
                      active
                        ? "bg-emerald/10 text-emerald"
                        : "text-evergreen/80 hover:bg-evergreen/5 hover:text-evergreen"
                    }`}
                  >
                    {active && (
                      <span className="h-2 w-2 rounded-full bg-bubblegum" />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <div
            className={`mt-auto transition-all duration-500 ease-out ${
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? `${100 + navLinks.length * 60 + 80}ms` : "0ms",
            }}
          >
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-6 py-3.5 text-base font-semibold text-offwhite shadow-md transition-all duration-200 hover:bg-emerald/90 active:scale-[0.97]"
            >
              Visit Shop
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {/* Decorative bottom element */}
          <div
            className={`mt-6 flex items-center justify-center gap-1.5 transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "600ms" : "0ms" }}
          >
            <span className="h-1 w-1 rounded-full bg-emerald/30" />
            <span className="h-1 w-1 rounded-full bg-bubblegum/30" />
            <span className="h-1 w-1 rounded-full bg-emerald/30" />
          </div>
        </div>
      </div>
    </header>
  );
}

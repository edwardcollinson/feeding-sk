"use client";

import { useState, useEffect } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unavailable"
  >("idle");
  const [isFocused, setIsFocused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.unavailable) {
          setStatus("unavailable");
        } else {
          setStatus("success");
          setEmail("");
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl">
      {/* Gradient background from emerald to evergreen */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald via-emerald/80 to-evergreen" />

      {/* Decorative grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top-left decorative blob */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-sky-blue/20 blur-3xl" />

      {/* Bottom-right decorative blob */}
      <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-bubblegum/15 blur-3xl" />

      {/* Floating decorative food emojis */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <span className="absolute top-6 left-[8%] animate-bounce text-2xl opacity-30 [animation-delay:0s] [animation-duration:3s]">
          🍋
        </span>
        <span className="absolute top-10 right-[12%] animate-bounce text-xl opacity-25 [animation-delay:0.5s] [animation-duration:3.5s]">
          🌿
        </span>
        <span className="absolute bottom-8 left-[15%] animate-bounce text-xl opacity-20 [animation-delay:1s] [animation-duration:4s]">
          🍊
        </span>
        <span className="absolute bottom-6 right-[8%] animate-bounce text-2xl opacity-25 [animation-delay:1.5s] [animation-duration:3.2s]">
          🥑
        </span>
        <span className="absolute top-1/2 left-[4%] animate-bounce text-lg opacity-15 [animation-delay:0.7s] [animation-duration:4.5s]">
          🫐
        </span>
        <span className="absolute top-1/3 right-[5%] animate-bounce text-lg opacity-15 [animation-delay:2s] [animation-duration:3.8s]">
          🍓
        </span>
      </div>

      {/* Decorative ring accents */}
      <div className="absolute -top-8 right-1/4 h-24 w-24 rounded-full border border-offwhite/10" />
      <div className="absolute -bottom-6 left-1/3 h-16 w-16 rounded-full border border-offwhite/10" />

      {/* Content */}
      <div className="relative z-10 px-6 py-14 text-center sm:px-10 md:px-16 md:py-20">
        {/* Decorative top dots */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-bubblegum/60" />
          <span className="inline-block h-1.5 w-6 rounded-full bg-offwhite/30" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-blue/60" />
        </div>

        <h2 className="font-heading text-4xl leading-tight text-offwhite drop-shadow-sm md:text-5xl">
          Stay Hungry
        </h2>
        <p className="mx-auto mb-10 mt-3 max-w-lg text-base leading-relaxed text-offwhite/75 md:text-lg">
          Get new recipes, restaurant recs, and lifestyle inspo delivered
          straight to your inbox — no spam, just the good stuff.
        </p>

        {status === "unavailable" ? (
          <div className="relative mx-auto max-w-md">
            <div className="rounded-2xl border border-offwhite/20 bg-offwhite/10 px-8 py-8 backdrop-blur-sm">
              <p className="text-xl font-semibold text-offwhite">
                Newsletter Coming Soon!
              </p>
              <p className="mt-2 text-sm text-offwhite/60">
                Follow us on Instagram for the latest updates.
              </p>
              <a
                href="https://instagram.com/feedingsk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-bubblegum px-6 py-3 text-sm font-semibold text-white hover:bg-bubblegum/90 transition-colors"
              >
                Follow @feedingsk
              </a>
            </div>
          </div>
        ) : status === "success" ? (
          <div className="relative mx-auto max-w-md">
            {/* Celebratory confetti dots */}
            {showConfetti && (
              <div className="pointer-events-none absolute -inset-8" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute inline-block rounded-full"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      backgroundColor: [
                        "#3CB961",
                        "#F16A87",
                        "#9ED0E6",
                        "#FFFDF9",
                        "#3CB961",
                        "#F16A87",
                      ][i % 6],
                      animation: `confettiFall ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s forwards`,
                      opacity: 0,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-offwhite/20 bg-offwhite/10 px-8 py-8 backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-offwhite/20">
                <svg
                  className="h-7 w-7 text-offwhite"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="text-xl font-semibold text-offwhite">
                You&apos;re in!
              </p>
              <p className="mt-1 text-sm text-offwhite/60">
                Check your inbox for a warm welcome.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <div
              className={`relative flex flex-1 overflow-hidden rounded-full transition-shadow duration-300 ${
                isFocused
                  ? "shadow-[0_0_0_3px_rgba(255,253,249,0.25),0_0_20px_rgba(60,185,97,0.3)]"
                  : "shadow-[0_0_0_1px_rgba(255,253,249,0.15)]"
              }`}
            >
              {/* Mail icon inside input */}
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="h-4 w-4 text-evergreen/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 rounded-full bg-offwhite py-4 pl-11 pr-5 text-sm text-evergreen placeholder:text-evergreen/35 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-bubblegum px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-bubblegum/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-bubblegum/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite focus-visible:ring-offset-2 focus-visible:ring-offset-emerald active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Joining...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </span>
            </button>
          </form>
        )}

        {status === "error" && (
          <div className="mx-auto mt-4 max-w-md">
            <p className="inline-flex items-center gap-2 rounded-full bg-bubblegum/20 px-4 py-2 text-sm text-offwhite backdrop-blur-sm">
              <svg
                className="h-4 w-4 text-bubblegum"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {/* Decorative bottom dots */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-1.5">
          <span className="inline-block h-1 w-1 rounded-full bg-offwhite/20" />
          <span className="inline-block h-1 w-1 rounded-full bg-offwhite/30" />
          <span className="inline-block h-1 w-1 rounded-full bg-offwhite/20" />
        </div>
      </div>

    </section>
  );
}

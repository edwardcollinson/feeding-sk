import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-6 text-6xl">🍽️</span>
      <h1 className="font-heading text-5xl text-evergreen mb-4">
        Page Not Found
      </h1>
      <p className="mx-auto max-w-md text-lg text-evergreen/60 mb-8">
        Looks like this page wandered off the menu. Let&apos;s get you back to
        something delicious.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-emerald/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-evergreen/20 px-6 py-3 text-sm font-semibold text-evergreen hover:bg-evergreen/5 transition-colors"
        >
          Browse the Blog
        </Link>
      </div>
    </div>
  );
}

export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero image placeholder */}
      <div className="w-full h-[50vh] md:h-[60vh] bg-evergreen/5" />

      <div className="mx-auto max-w-3xl px-6 -mt-24 relative z-10">
        <div className="bg-offwhite rounded-2xl p-6 md:p-10 shadow-lg">
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <div className="h-6 w-20 rounded-full bg-evergreen/5" />
            <div className="h-6 w-16 rounded-full bg-evergreen/5" />
          </div>

          {/* Title */}
          <div className="h-10 w-full rounded-lg bg-evergreen/10 mb-2" />
          <div className="h-10 w-3/4 rounded-lg bg-evergreen/10 mb-3" />

          {/* Date */}
          <div className="h-4 w-32 rounded bg-evergreen/5 mb-8" />

          {/* Body lines */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-evergreen/5"
                style={{ width: `${75 + Math.random() * 25}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

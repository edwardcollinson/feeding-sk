export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 animate-pulse">
      {/* Title */}
      <div className="h-10 w-32 rounded-lg bg-evergreen/10 mb-8" />

      {/* Category filter placeholder */}
      <div className="mb-8 flex gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-evergreen/5" />
        ))}
      </div>

      {/* Post grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-evergreen/5" />
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-full bg-evergreen/5" />
              </div>
              <div className="h-5 w-full rounded bg-evergreen/10" />
              <div className="h-4 w-5/6 rounded bg-evergreen/5" />
              <div className="h-3 w-24 rounded bg-evergreen/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

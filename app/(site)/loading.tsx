export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 animate-pulse">
      {/* Hero placeholder */}
      <div className="h-8 w-48 rounded-lg bg-evergreen/10 mb-4" />
      <div className="h-4 w-96 max-w-full rounded bg-evergreen/5 mb-12" />

      {/* Content blocks */}
      <div className="space-y-6">
        <div className="h-64 w-full rounded-2xl bg-evergreen/5" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-evergreen/5" />
          <div className="h-4 w-5/6 rounded bg-evergreen/5" />
          <div className="h-4 w-4/6 rounded bg-evergreen/5" />
        </div>
      </div>
    </div>
  );
}

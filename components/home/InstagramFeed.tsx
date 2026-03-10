"use client";

import Script from "next/script";

export default function InstagramFeed() {
  const widgetId = process.env.NEXT_PUBLIC_ELFSIGHT_WIDGET_ID;

  if (!widgetId) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-heading text-3xl text-evergreen mb-8 text-center">
        Follow Along
      </h2>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
      />
      <div className={`elfsight-app-${widgetId}`} />
    </section>
  );
}

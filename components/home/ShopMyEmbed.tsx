interface ShopMyEmbedProps {
  profileUrl?: string;
  title?: string;
}

export default function ShopMyEmbed({
  profileUrl,
  title = "SK's Favorites",
}: ShopMyEmbedProps) {
  if (!profileUrl) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-heading text-3xl text-evergreen mb-8 text-center">
        {title}
      </h2>
      <div className="rounded-2xl overflow-hidden border border-evergreen/10">
        <iframe
          src={profileUrl}
          title={title}
          className="w-full min-h-[600px] border-0"
          loading="lazy"
        />
      </div>
    </section>
  );
}

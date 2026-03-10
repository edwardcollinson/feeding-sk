import { Metadata } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop SK's favorite products and recommendations.",
};

export default async function ShopPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-heading text-4xl md:text-5xl text-evergreen mb-4 text-center">
        Shop My Favorites
      </h1>
      <p className="text-center text-evergreen/60 mb-10 max-w-lg mx-auto">
        Everything I use and love — kitchen essentials, pantry staples, and more.
      </p>

      {settings?.shopMyProfileUrl ? (
        <div className="rounded-2xl overflow-hidden border border-evergreen/10">
          <iframe
            src={settings.shopMyProfileUrl}
            title="Shop SK's Favorites"
            className="w-full min-h-[800px] border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="text-center py-20 text-evergreen/40">
          <p>Shop coming soon!</p>
        </div>
      )}
    </div>
  );
}

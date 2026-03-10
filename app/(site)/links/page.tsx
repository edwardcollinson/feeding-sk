import { Metadata } from "next";
import { getActiveLinks, getAuthor } from "@/sanity/lib/queries";
import ImageWithBlur from "@/components/ui/ImageWithBlur";
import LinkCard from "@/components/links/LinkCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Links",
  description: "All of SK's important links in one place.",
};

export default async function LinksPage() {
  const [links, author] = await Promise.all([
    getActiveLinks(),
    getAuthor(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald/5 to-offwhite">
      <div className="mx-auto max-w-md px-6 py-12">
        {/* Profile header */}
        <div className="text-center mb-8">
          {author?.image && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-emerald/20">
              <ImageWithBlur
                image={author.image}
                alt={author.name || "SK"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="font-heading text-2xl text-evergreen">
            {author?.name || "Feeding SK"}
          </h1>
          <p className="text-sm text-evergreen/50">
            {author?.instagram || "@feedingsk"}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links?.map((link: any) => (
            <LinkCard key={link._id} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

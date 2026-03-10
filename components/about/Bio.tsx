import ImageWithBlur from "@/components/ui/ImageWithBlur";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";

interface BioProps {
  author: {
    name: string;
    bio: any;
    image?: any;
    instagram?: string;
  };
}

export default function Bio({ author }: BioProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {author.image && (
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
          <ImageWithBlur
            image={author.image}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <h1 className="font-heading text-4xl md:text-5xl text-evergreen mb-4">
          Hey, I&apos;m {author.name}
        </h1>
        <div className="text-evergreen/70 space-y-4">
          <PortableTextRenderer value={author.bio} />
        </div>
        {author.instagram && (
          <a
            href={`https://instagram.com/${author.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-emerald font-semibold hover:text-emerald/80 transition-colors"
          >
            {author.instagram} on Instagram
          </a>
        )}
      </div>
    </section>
  );
}

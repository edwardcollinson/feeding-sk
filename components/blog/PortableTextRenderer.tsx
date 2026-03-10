import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).auto("format").quality(80).width(1200).url()}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="rounded-xl w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-evergreen/50 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value?.href?.startsWith("/")
        ? undefined
        : "noopener noreferrer";
      const target = value?.href?.startsWith("/") ? undefined : "_blank";
      return (
        <a
          href={value?.href}
          rel={rel}
          target={target}
          className="text-emerald underline underline-offset-2 hover:text-bubblegum transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald pl-4 italic text-evergreen/70">
        {children}
      </blockquote>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}

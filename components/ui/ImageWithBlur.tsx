import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ImageWithBlurProps {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ImageWithBlur({
  image,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
}: ImageWithBlurProps) {
  if (!image) return null;

  const src = urlFor(image).auto("format").quality(80).url();

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={fill ? undefined : (width || 800)}
      height={fill ? undefined : (height || 600)}
      fill={fill}
      className={className}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      priority={priority}
    />
  );
}

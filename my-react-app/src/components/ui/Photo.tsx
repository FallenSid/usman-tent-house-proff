import { imageSrcSet, imageUrl, photos, type ImageKey } from "@/data/images";
import { cn } from "@/utils/cn";

interface PhotoProps {
  name: ImageKey;
  /** The `sizes` attribute — tells the browser how wide the image will render. */
  sizes: string;
  alt?: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  eager?: boolean;
  widths?: number[];
}

/** Single place that renders photographs: srcset, lazy-loading and intrinsic size. */
export function Photo({ name, sizes, alt, className, eager = false, widths }: PhotoProps) {
  const photo = photos[name];
  return (
    <img
      src={imageUrl(name, 800)}
      srcSet={imageSrcSet(name, widths)}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

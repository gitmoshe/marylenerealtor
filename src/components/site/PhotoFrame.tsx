import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  photo: Photo;
  /** Tailwind aspect ratio class, e.g. "aspect-[3/4]". Frame crops, image never does. */
  className?: string;
  imgClassName?: string;
  /** Focus the crop — useful for compact head-and-shoulders versions. */
  position?: "center" | "top";
  priority?: boolean;
  /** Responsive `sizes` hint so phones download the 800px variant. */
  sizes?: string;
  /** Compact slots (thumbnails) never need the full-resolution file. */
  compact?: boolean;
};

/**
 * Swappable image slot: one source in, no baked-in cropping.
 * Replacing the photo in src/lib/photos.ts updates every usage.
 */
export function PhotoFrame({
  photo,
  className,
  imgClassName,
  position = "center",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  compact = false,
}: PhotoFrameProps) {
  const small = photo.srcSmall;
  const src = compact && small ? small : photo.src;
  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={src}
        {...(small && !compact
          ? { srcSet: `${small} 800w, ${photo.src} 1600w`, sizes }
          : {})}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover",
          position === "top" ? "object-top" : "object-center",
          imgClassName,
        )}
      />
    </div>
  );
}

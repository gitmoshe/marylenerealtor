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
}: PhotoFrameProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
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

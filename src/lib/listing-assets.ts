import listingA from "@/assets/listing-a.jpg?w=1600&format=webp";
import listingASm from "@/assets/listing-a.jpg?w=700&format=webp";
import listingB from "@/assets/listing-b.jpg?w=1600&format=webp";
import listingBSm from "@/assets/listing-b.jpg?w=700&format=webp";
import listingC from "@/assets/listing-c.jpg?w=1600&format=webp";
import listingCSm from "@/assets/listing-c.jpg?w=700&format=webp";
import listingD from "@/assets/listing-d.jpg?w=1600&format=webp";
import listingDSm from "@/assets/listing-d.jpg?w=700&format=webp";
import property1 from "@/assets/property-1.jpg?w=1600&format=webp";
import property1Sm from "@/assets/property-1.jpg?w=700&format=webp";
import property2 from "@/assets/property-2.jpg?w=1600&format=webp";
import property2Sm from "@/assets/property-2.jpg?w=700&format=webp";
import property3 from "@/assets/property-3.jpg?w=1600&format=webp";
import property3Sm from "@/assets/property-3.jpg?w=700&format=webp";
import coastline from "@/assets/coastline.jpg?w=1600&format=webp";
import coastlineSm from "@/assets/coastline.jpg?w=700&format=webp";
import cenote from "@/assets/cenote.jpg?w=1600&format=webp";
import cenoteSm from "@/assets/cenote.jpg?w=700&format=webp";
import heroVilla from "@/assets/hero-villa.jpg?w=1920&format=webp";
import heroVillaSm from "@/assets/hero-villa.jpg?w=700&format=webp";

/**
 * Bundled placeholder imagery, emitted as compressed WebP at two widths.
 * Listings stored in the database reference these with an "asset:<key>"
 * string; uploaded images are stored as normal URLs.
 */
export const listingAssets: Record<string, string> = {
  "listing-a": listingA,
  "listing-b": listingB,
  "listing-c": listingC,
  "listing-d": listingD,
  "property-1": property1,
  "property-2": property2,
  "property-3": property3,
  coastline,
  cenote,
  "hero-villa": heroVilla,
};

/** 700px card variants — never load a hero-sized file inside a grid tile. */
export const listingAssetsSmall: Record<string, string> = {
  "listing-a": listingASm,
  "listing-b": listingBSm,
  "listing-c": listingCSm,
  "listing-d": listingDSm,
  "property-1": property1Sm,
  "property-2": property2Sm,
  "property-3": property3Sm,
  coastline: coastlineSm,
  cenote: cenoteSm,
  "hero-villa": heroVillaSm,
};

export const listingAssetKeys = Object.keys(listingAssets);

/** Turn a stored image reference into a usable src. */
export function resolveListingImage(ref: string, size: "full" | "card" = "full"): string {
  const table = size === "card" ? listingAssetsSmall : listingAssets;
  if (!ref) return table["listing-a"] ?? "";
  if (ref.startsWith("asset:")) {
    return table[ref.slice(6)] ?? table["listing-a"] ?? "";
  }
  // Admin uploads are stored as "<name>.webp" plus a "<name>-card.webp" variant.
  if (size === "card" && ref.startsWith("/api/public/listing-image/") && ref.endsWith(".webp")) {
    return ref.replace(/\.webp$/, "-card.webp");
  }
  return ref;
}

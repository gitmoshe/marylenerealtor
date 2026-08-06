import listingA from "@/assets/listing-a.jpg";
import listingB from "@/assets/listing-b.jpg";
import listingC from "@/assets/listing-c.jpg";
import listingD from "@/assets/listing-d.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import coastline from "@/assets/coastline.jpg";
import cenote from "@/assets/cenote.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

/**
 * Bundled placeholder imagery. Listings stored in the database reference these
 * with an "asset:<key>" string; uploaded images are stored as normal URLs.
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

export const listingAssetKeys = Object.keys(listingAssets);

/** Turn a stored image reference into a usable src. */
export function resolveListingImage(ref: string): string {
  if (!ref) return listingAssets["listing-a"] ?? "";
  if (ref.startsWith("asset:")) {
    return listingAssets[ref.slice(6)] ?? listingAssets["listing-a"] ?? "";
  }
  return ref;
}

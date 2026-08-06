/**
 * Listing types and helpers.
 *
 * The listings themselves now live in the database (table: listings) and are
 * loaded through src/lib/listings.functions.ts. Everything on the public site
 * — the portfolio grid, filters, detail pages, the homepage featured row and
 * the sitemap — renders from that data.
 */

export const listingLocations = [
  "Tulum",
  "Playacar",
  "Playa del Carmen",
  "Cancún",
  "Puerto Aventuras",
  "Akumal",
  "Riviera Maya",
] as const;

export const listingTypes = [
  "Pre-construction",
  "Villa",
  "Condo",
  "Land",
  "Branded Residence",
] as const;

export const listingTiers = ["master-broker", "portfolio", "sold"] as const;

export type ListingLocation = (typeof listingLocations)[number];
export type ListingType = (typeof listingTypes)[number];
export type ListingTier = (typeof listingTiers)[number];

export type Listing = {
  id?: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  type: string;
  tier: string;
  status: string;
  delivery: string;
  /** USD, number — formatted for display by formatPrice(). */
  priceFrom: number;
  bedrooms: string;
  sizeRange: string;
  /** Maximum three. */
  highlights: string[];
  description: string;
  /** Either an "asset:<key>" reference or a URL. Resolve with resolveListingImage(). */
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  featured: boolean;
  collections: string[];
  sortOrder?: number;
};

/** Locations, types and collections actually present in a set of listings. */
export function usedLocationsIn(items: Listing[]): string[] {
  return listingLocations.filter((l) => items.some((x) => x.location === l));
}

export function usedTypesIn(items: Listing[]): string[] {
  return listingTypes.filter((t) => items.some((x) => x.type === t));
}

export function collectionsIn(items: Listing[]): string[] {
  return Array.from(new Set(items.flatMap((l) => l.collections)));
}

/** "From $595,000 USD", or "Price on request" when priceFrom is 0. */
export function formatPrice(priceFrom: number, onRequest = "Price on request"): string {
  if (!priceFrom) return onRequest;
  return `From $${priceFrom.toLocaleString("en-US")} USD`;
}

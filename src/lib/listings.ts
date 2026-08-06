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
 * SINGLE SOURCE OF TRUTH FOR THE PORTFOLIO.
 *
 * Every listing is one record below. The portfolio grid, the filters, the
 * detail page at /portfolio/[slug], the homepage featured row and the sitemap
 * all read from this array — add a record and it appears everywhere.
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
  slug: string;
  name: string;
  developer: string;
  location: ListingLocation;
  type: ListingType;
  tier: ListingTier;
  status: string;
  delivery: string;
  /** USD, number — formatted for display by formatPrice(). */
  priceFrom: number;
  bedrooms: string;
  sizeRange: string;
  /** Maximum three. */
  highlights: string[];
  description: string;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  featured: boolean;
  collections: string[];
};

const PLACEHOLDER =
  "Full details for this development are being prepared. Enquire for the current price list, availability and payment plans.";

export const listings: Listing[] = [
  {
    slug: "latitud-365",
    name: "LATITUD 365",
    developer: "LATITUD Properties",
    location: "Riviera Maya",
    type: "Pre-construction",
    tier: "master-broker",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Master-broker mandate", "Selling now", "Riviera Maya"],
    description: PLACEHOLDER,
    heroImage: listingA,
    gallery: [listingB, listingC, listingD, property1],
    featured: true,
    collections: ["Signature"],
  },
  {
    slug: "viceroy-playa-del-carmen-residences",
    name: "Viceroy Playa del Carmen Residences",
    developer: "Viceroy Hotels & Resorts",
    location: "Playa del Carmen",
    type: "Branded Residence",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 4",
    sizeRange: "To be confirmed",
    highlights: ["Branded residence", "Hotel services", "Playa del Carmen"],
    description: PLACEHOLDER,
    heroImage: listingB,
    gallery: [listingA, property1, property3],
    featured: true,
    collections: ["Branded Residences"],
  },
  {
    slug: "la-reserva",
    name: "La Reserva",
    developer: "To be confirmed",
    location: "Tulum",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Pre-construction pricing", "Tulum", "Nature-led masterplan"],
    description: PLACEHOLDER,
    heroImage: listingC,
    gallery: [cenote, property2, listingA],
    featured: true,
    collections: ["Tulum Collection"],
  },
  {
    slug: "azulik-residences",
    name: "Azulik Residences",
    developer: "Azulik",
    location: "Tulum",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 595000,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Signature architecture", "Tulum", "From $595,000 USD"],
    description: PLACEHOLDER,
    heroImage: property2,
    gallery: [cenote, listingC, listingA],
    featured: true,
    collections: ["Tulum Collection"],
  },
  {
    slug: "macondo",
    name: "Macondo",
    developer: "To be confirmed",
    location: "Playacar",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "Dec 2027",
    priceFrom: 0,
    bedrooms: "2 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Playacar", "Delivery Dec 2027", "Gated community"],
    description: PLACEHOLDER,
    heroImage: listingD,
    gallery: [property1, listingA, property3],
    featured: false,
    collections: ["Playacar Collection"],
  },
  {
    slug: "bakaba",
    name: "Bakaba",
    developer: "To be confirmed",
    location: "Playacar",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "2 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Playacar", "Pre-construction pricing", "Golf community"],
    description: PLACEHOLDER,
    heroImage: property1,
    gallery: [listingD, listingA, property3],
    featured: false,
    collections: ["Playacar Collection"],
  },
  {
    slug: "soleii-fase-i",
    name: "Soleii Fase I",
    developer: "To be confirmed",
    location: "Playacar",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Playacar", "First phase", "Pre-construction pricing"],
    description: PLACEHOLDER,
    heroImage: listingA,
    gallery: [listingD, property1, coastline],
    featured: false,
    collections: ["Playacar Collection"],
  },
  {
    slug: "casa-de-piedra",
    name: "Casa de Piedra",
    developer: "To be confirmed",
    location: "Playacar",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "2 – 4",
    sizeRange: "To be confirmed",
    highlights: ["Playacar", "Limited residences", "Stone and timber palette"],
    description: PLACEHOLDER,
    heroImage: property3,
    gallery: [listingD, listingA, property1],
    featured: false,
    collections: ["Playacar Collection"],
  },
  {
    slug: "sonni",
    name: "Sonni",
    developer: "To be confirmed",
    location: "Playa del Carmen",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Playa del Carmen", "Walkable location", "Pre-construction pricing"],
    description: PLACEHOLDER,
    heroImage: heroVilla,
    gallery: [listingB, property1, listingA],
    featured: false,
    collections: [],
  },
  {
    slug: "tierra-madre",
    name: "Tierra Madre",
    developer: "To be confirmed",
    location: "Riviera Maya",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Riviera Maya", "Nature-led masterplan", "Pre-construction pricing"],
    description: PLACEHOLDER,
    heroImage: cenote,
    gallery: [listingC, property2, listingA],
    featured: false,
    collections: [],
  },
  {
    slug: "junglar-kaybe",
    name: "Junglar Kaybe",
    developer: "To be confirmed",
    location: "Riviera Maya",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Riviera Maya", "Jungle setting", "Boutique scale"],
    description: PLACEHOLDER,
    heroImage: listingC,
    gallery: [cenote, property2, listingA],
    featured: false,
    collections: [],
  },
  {
    slug: "nautila-beachfront",
    name: "Nautila Beachfront",
    developer: "To be confirmed",
    location: "Riviera Maya",
    type: "Pre-construction",
    tier: "portfolio",
    status: "Selling now",
    delivery: "July 2027",
    priceFrom: 0,
    bedrooms: "1 – 3",
    sizeRange: "To be confirmed",
    highlights: ["Beachfront", "Delivery July 2027", "Riviera Maya"],
    description: PLACEHOLDER,
    heroImage: coastline,
    gallery: [listingB, property3, listingA],
    featured: false,
    collections: ["Beachfront"],
  },
  {
    slug: "amanai-villas-golf",
    name: "Amanai Villas & Golf",
    developer: "To be confirmed",
    location: "Riviera Maya",
    type: "Villa",
    tier: "portfolio",
    status: "Selling now",
    delivery: "To be confirmed",
    priceFrom: 0,
    bedrooms: "3 – 4",
    sizeRange: "To be confirmed",
    highlights: ["Golf community", "Private villas", "Riviera Maya"],
    description: PLACEHOLDER,
    heroImage: listingD,
    gallery: [property1, listingA, coastline],
    featured: false,
    collections: ["Golf"],
  },
];

/** Every collection tag currently in use, in first-appearance order. */
export const listingCollections: string[] = Array.from(
  new Set(listings.flatMap((l) => l.collections)),
);

/** Only the locations, types and tiers actually present in the data. */
export const usedLocations = listingLocations.filter((l) =>
  listings.some((x) => x.location === l),
);
export const usedTypes = listingTypes.filter((t) => listings.some((x) => x.type === t));
export const usedTiers = listingTiers.filter((t) => listings.some((x) => x.tier === t));

export const featuredListings = listings.filter((l) => l.featured);

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

/** "From $595,000 USD", or "Price on request" when priceFrom is 0. */
export function formatPrice(priceFrom: number, onRequest = "Price on request"): string {
  if (!priceFrom) return onRequest;
  return `From $${priceFrom.toLocaleString("en-US")} USD`;
}

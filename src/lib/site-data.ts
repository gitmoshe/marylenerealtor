import property1 from "@/assets/property-1.jpg?w=1600&format=webp";
import property2 from "@/assets/property-2.jpg?w=1600&format=webp";
import property3 from "@/assets/property-3.jpg?w=1600&format=webp";
import coastline from "@/assets/coastline.jpg?w=1600&format=webp";
import cenote from "@/assets/cenote.jpg?w=1600&format=webp";

export type Film = {
  id: string;
  title: string;
  /** Small tracked-caps caption, e.g. "VILLA TOUR — TULUM" */
  caption: string;
  description: string;
  category: "Property Tours" | "Riviera Life" | "Client Stories";
  format: "16:9" | "9:16";
  /** Standard iframe embed URL — paste a YouTube or Vimeo embed link */
  embed: string;
};

export const films: Film[] = [
  {
    id: "f1",
    title: "Pelegrina Condominiums",
    caption: "Condo Tour — Tulum",
    description: "A vertical walk through Pelegrina, one of Tulum's newest condominium addresses.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/Qum3Z75CjB4",
  },
  {
    id: "f2",
    title: "Junglar",
    caption: "Villa Tour — Tulum",
    description: "Eight villas inside Kaybé, Tulum's most complete gated community.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/XJg1SC4GbKU",
  },
  {
    id: "f3",
    title: "Kaybé",
    caption: "Community Tour — Tulum",
    description: "The gated masterplan behind Junglar, where Mayan-inspired architecture is set into the jungle.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/_XtDFY95p_k",
  },
  {
    id: "f4",
    title: "Paravian",
    caption: "Development Tour — Playa del Carmen",
    description: "A residential development on the central downtown corridor of Playa del Carmen.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/eA3Meeu9C00",
  },
  {
    id: "f5",
    title: "Palmara",
    caption: "Development Tour — Playa del Carmen",
    description: "A residential development in Playa del Carmen, close to schools and the coast's main tourism hubs.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/5Rl_5E_XJJ4",
  },
  {
    id: "f6",
    title: "Valenia",
    caption: "Community Tour — Playa del Carmen",
    description: "A gated residential community of twelve private sections, with a clubhouse and pool, ten minutes from the beach.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/j_z_Z8VFMJI",
  },
  {
    id: "f7",
    title: "Villas Kaybé",
    caption: "Villa Tour — Tulum",
    description: "A furnished villa inside Kaybé, filmed room by room with the jungle at the windows.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://youtube.com/shorts/zXKnetyIL-w",
  },
  {
    id: "f8",
    title: "A Table in Playa",
    caption: "Riviera Life — Playa del Carmen",
    description: "Where I take clients when the paperwork is finally signed.",
    category: "Riviera Life",
    format: "9:16",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f9",
    title: "Maison Riviera — Pre-construction",
    caption: "Development Tour — Playa del Carmen",
    description: "Walking the plans, the plot and the rooftop line before it exists.",
    category: "Property Tours",
    format: "16:9",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const filmCategories = ["Property Tours", "Riviera Life", "Client Stories"] as const;

export const testimonials = [
  {
    quote:
      "Marylene understood what we were looking for before we could name it ourselves. Everything was handled in French, precisely, without a single loose end.",
    name: "C. Dubois",
    origin: "Montréal",
  },
  {
    quote:
      "We bought a condo we had only seen through her videos. Two years later it still looks exactly as she showed us, and it has never sat empty.",
    name: "J. & M. Harrow",
    origin: "Chicago",
  },
  {
    quote:
      "She manages our house as though it were her own. We arrive twice a year and find nothing to ask for.",
    name: "A. Lefèvre",
    origin: "Bordeaux",
  },
];

export const areas = [
  {
    name: "Playa del Carmen",
    label: "The Heart",
    image: property1,
    copy: "Walkable, cosmopolitan and unhurried. Fifth Avenue for the evening, quiet residential streets a block behind it, and the best liquidity on the coast for resale.",
  },
  {
    name: "Tulum",
    label: "The Design Capital",
    image: property2,
    copy: "Architecture in conversation with the jungle. Slower, more deliberate, and now served by its own international airport — which has changed what a Tulum address means.",
  },
  {
    name: "Puerto Morelos",
    label: "The Marina",
    image: coastline,
    copy: "A gated marina community with dolphins in the lagoon and a golf course inside the gate. Families settle here and rarely leave.",
  },
  {
    name: "Akumal",
    label: "The Reef",
    image: cenote,
    copy: "Turtles in the bay, a protected reef offshore and a village that has resisted scale. Small, green and increasingly difficult to buy into.",
  },
  {
    name: "Cancún",
    label: "The Gateway",
    image: property3,
    copy: "Direct flights from thirty cities, established towers with real rental histories, and the infrastructure the rest of the coast depends upon.",
  },
];

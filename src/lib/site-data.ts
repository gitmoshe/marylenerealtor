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
    title: "Casa Lumière — Beachfront Penthouse",
    caption: "Villa Tour — Playa del Carmen",
    description: "Three terraces, one uninterrupted sightline to the water.",
    category: "Property Tours",
    format: "16:9",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f2",
    title: "Morning in Tulum",
    caption: "Riviera Life — Tulum",
    description: "First light on the beach road, before the town wakes.",
    category: "Riviera Life",
    format: "9:16",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f3",
    title: "Villa Selva — Full Tour",
    caption: "Villa Tour — Tulum",
    description: "A jungle house built around a courtyard and a single old tree.",
    category: "Property Tours",
    format: "16:9",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f4",
    title: "The Dubois Family Finds Home",
    caption: "Client Story — Lyon to Playa",
    description: "Six months of searching, told in ninety seconds.",
    category: "Client Stories",
    format: "9:16",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f5",
    title: "Cenotes of the Yucatán",
    caption: "Riviera Life — Yucatán",
    description: "The freshwater world beneath the limestone, half an hour inland.",
    category: "Riviera Life",
    format: "16:9",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f6",
    title: "Résidence Turquoise — Lagoon Views",
    caption: "Condo Tour — Puerto Morelos",
    description: "A marina-side residence with dolphins below the terrace.",
    category: "Property Tours",
    format: "9:16",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "f7",
    title: "Buying from Montréal",
    caption: "Client Story — Montréal",
    description: "How a purchase was completed entirely by film and video call.",
    category: "Client Stories",
    format: "16:9",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import coastline from "@/assets/coastline.jpg";
import cenote from "@/assets/cenote.jpg";
import heroVilla from "@/assets/hero-villa.jpg";

export type Property = {
  slug: string;
  name: string;
  location: "Playa del Carmen" | "Tulum" | "Cancún" | "Puerto Aventuras";
  type: "Villa" | "Condo" | "Land" | "Pre-construction";
  intent: "Buy" | "Invest";
  price: string;
  line: string;
  image: string;
  specs: { label: string; value: string }[];
  description: string;
};

export const properties: Property[] = [
  {
    slug: "casa-lumiere",
    name: "Casa Lumière",
    location: "Playa del Carmen",
    type: "Condo",
    intent: "Buy",
    price: "$685,000 USD",
    line: "Beachfront penthouse with a private rooftop terrace.",
    image: property1,
    specs: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3.5" },
      { label: "Interior", value: "2,150 ft²" },
      { label: "Terrace", value: "940 ft²" },
      { label: "Delivery", value: "Immediate" },
      { label: "Reference", value: "MR-101" },
    ],
    description:
      "A top-floor residence facing open Caribbean water, finished in chukum, pale limestone and tzalam wood. The terrace carries a plunge pool, a shaded dining pavilion and an uninterrupted horizon.",
  },
  {
    slug: "villa-selva",
    name: "Villa Selva",
    location: "Tulum",
    type: "Villa",
    intent: "Buy",
    price: "$1,240,000 USD",
    line: "Organic architecture folded into the jungle canopy.",
    image: property2,
    specs: [
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4" },
      { label: "Interior", value: "3,400 ft²" },
      { label: "Lot", value: "8,600 ft²" },
      { label: "Delivery", value: "Immediate" },
      { label: "Reference", value: "MR-114" },
    ],
    description:
      "Curved stucco walls, a palapa roof and a black-bottom pool set against dense selva. Designed for shade and airflow, with a service casita and full off-grid backup.",
  },
  {
    slug: "residence-turquoise",
    name: "Résidence Turquoise",
    location: "Cancún",
    type: "Condo",
    intent: "Invest",
    price: "$920,000 USD",
    line: "Double-height living rooms above the lagoon.",
    image: property3,
    specs: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3" },
      { label: "Interior", value: "2,680 ft²" },
      { label: "Yield", value: "7.2% est." },
      { label: "Delivery", value: "Immediate" },
      { label: "Reference", value: "MR-122" },
    ],
    description:
      "A corner residence in an established hotel-zone tower, with concierge, beach club access and a proven short-stay rental history. Turnkey and fully furnished.",
  },
  {
    slug: "terrenos-akumal",
    name: "Terrenos Akumal",
    location: "Puerto Aventuras",
    type: "Land",
    intent: "Invest",
    price: "$395,000 USD",
    line: "Half a hectare of titled land minutes from the reef.",
    image: coastline,
    specs: [
      { label: "Surface", value: "5,000 m²" },
      { label: "Title", value: "Escritura" },
      { label: "Services", value: "At the lot line" },
      { label: "Zoning", value: "Residential" },
      { label: "Access", value: "Paved" },
      { label: "Reference", value: "MR-130" },
    ],
    description:
      "Level, cleared land with mature vegetation retained along the boundary. Suitable for a single private residence or a boutique four-key development.",
  },
  {
    slug: "cenote-house",
    name: "Cenote House",
    location: "Tulum",
    type: "Villa",
    intent: "Buy",
    price: "$2,150,000 USD",
    line: "A private cenote at the centre of the plan.",
    image: cenote,
    specs: [
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "5.5" },
      { label: "Interior", value: "5,100 ft²" },
      { label: "Lot", value: "14,000 ft²" },
      { label: "Delivery", value: "Immediate" },
      { label: "Reference", value: "MR-141" },
    ],
    description:
      "An architect-signed residence built around a natural freshwater cenote, with gallery corridors, a wellness pavilion and staff quarters. Rare, and rarely available.",
  },
  {
    slug: "maison-riviera",
    name: "Maison Riviera",
    location: "Playa del Carmen",
    type: "Pre-construction",
    intent: "Invest",
    price: "From $480,000 USD",
    line: "Twelve residences, delivering 2027.",
    image: heroVilla,
    specs: [
      { label: "Bedrooms", value: "2 – 3" },
      { label: "Interior", value: "1,450 ft² +" },
      { label: "Payment", value: "36 months" },
      { label: "Yield", value: "8.0% est." },
      { label: "Delivery", value: "Q1 2027" },
      { label: "Reference", value: "MR-150" },
    ],
    description:
      "A limited collection three streets from the sea, with a rooftop pool, a residents' lounge and interest-free construction payments. Early-phase pricing while it lasts.",
  },
];

export const locations = ["Playa del Carmen", "Tulum", "Cancún", "Puerto Aventuras"] as const;
export const propertyTypes = ["Villa", "Condo", "Land", "Pre-construction"] as const;
export const intents = ["Buy", "Invest"] as const;

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
    caption: "Condo Tour — Puerto Aventuras",
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
      "We bought a condo we had only seen through her films. Two years later it still looks exactly as she showed us, and it has never sat empty.",
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
    name: "Puerto Aventuras",
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

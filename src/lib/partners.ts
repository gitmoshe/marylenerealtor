/**
 * Developments & partners shown in the Portfolio logo strip.
 *
 * `logo` is optional: leave it empty and the strip renders an elegant
 * tracked-caps text wordmark instead. Drop in an image later by setting
 * `logo` to an imported asset URL or an "asset:<key>" reference.
 */
export type Partner = {
  name: string;
  /** Optional image URL or asset reference. Empty = text wordmark placeholder. */
  logo?: string;
  /** Optional portfolio slug to link the logo to. */
  slug?: string;
};

export const partners: Partner[] = [
  { name: "LATITUD 365", slug: "latitud-365" },
  { name: "Viceroy", slug: "viceroy-playa-del-carmen-residences" },
  { name: "La Reserva", slug: "la-reserva" },
  { name: "Bakaba", slug: "bakaba" },
  { name: "Macondo", slug: "macondo" },
  { name: "Casa de Piedra", slug: "casa-de-piedra" },
  { name: "Sonni", slug: "sonni" },
  { name: "Soleii", slug: "soleii-fase-i" },
  { name: "Nautila", slug: "nautila-beachfront" },
  { name: "Amanai", slug: "amanai-villas-golf" },
  { name: "Junglar Kaybe", slug: "junglar-kaybe" },
];

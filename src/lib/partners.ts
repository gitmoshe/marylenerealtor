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
  { name: "LATITUD 365" },
  { name: "Viceroy", slug: "viceroy-playa-del-carmen" },
  { name: "La Reserva", slug: "la-reserva" },
  { name: "Bakaba", slug: "bakaba" },
  { name: "Macondo", slug: "macondo-playacar" },
  { name: "Sonni", slug: "sonni" },
  { name: "Amanai", slug: "amanai-villas-golf" },
  { name: "Junglar Kaybe", slug: "junglar-kaybe" },
];

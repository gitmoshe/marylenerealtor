import terraceAsset from "@/assets/marylene-terrace.jpg.asset.json";
import poolAsset from "@/assets/marylene-pool.png.asset.json";
import portraitAsset from "@/assets/marylene-portrait.jpg.asset.json";

export type Photo = {
  src: string;
  alt: string;
};

/**
 * Single source of truth for Marylene's photography.
 * One image source per slot — swap the `src` here when the
 * professional shoot arrives and every page updates.
 */
export const photos = {
  /** Homepage intro editorial — candid terrace image beside the pull-quote. */
  intro: {
    src: terraceAsset.url,
    alt: "Marylene Maglio seated on a shaded terrace daybed with jungle behind",
  },
  /** Homepage Riviera Maya teaser — tropical pool and greenery. */
  riviera: {
    src: poolAsset.url,
    alt: "Marylene Maglio standing at the edge of a jungle pool in the Riviera Maya",
  },
  /** Primary portrait — About hero and any compact head-and-shoulders use. */
  portrait: {
    src: portraitAsset.url,
    alt: "Portrait of Marylene Maglio, Riviera Maya realtor",
  },
} satisfies Record<string, Photo>;

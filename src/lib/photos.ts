import terraceAsset from "@/assets/marylene-terrace.webp.asset.json";
import terraceSmall from "@/assets/marylene-terrace-sm.webp.asset.json";
import poolAsset from "@/assets/marylene-pool.webp.asset.json";
import poolSmall from "@/assets/marylene-pool-sm.webp.asset.json";
import portraitAsset from "@/assets/marylene-portrait-pool.webp.asset.json";
import portraitSmall from "@/assets/marylene-portrait-pool-sm.webp.asset.json";
import contactAsset from "@/assets/marylene-contact.webp.asset.json";
import contactSmall from "@/assets/marylene-contact-sm.webp.asset.json";

export type Photo = {
  /** Full-resolution source (~1600px wide, WebP). */
  src: string;
  /** Compressed 800px variant served to phones and compact slots. */
  srcSmall?: string;
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
    srcSmall: terraceSmall.url,
    alt: "Marylene Maglio seated on a shaded terrace daybed with jungle behind",
  },
  /** Homepage Riviera Maya teaser — tropical pool and greenery. */
  riviera: {
    src: poolAsset.url,
    srcSmall: poolSmall.url,
    alt: "Marylene Maglio standing at the edge of a jungle pool in the Riviera Maya",
  },
  /** Primary portrait — About hero and any compact head-and-shoulders use. */
  portrait: {
    src: portraitAsset.url,
    srcSmall: portraitSmall.url,
    alt: "Portrait of Marylene Maglio, Riviera Maya realtor",
  },
  /** Contact page portrait — candid street-style photo. */
  contact: {
    src: contactAsset.url,
    srcSmall: contactSmall.url,
    alt: "Marylene Maglio in a camel safari dress and sunglasses on a Riviera Maya terrace",
  },
} satisfies Record<string, Photo>;

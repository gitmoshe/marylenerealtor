import { Link } from "@tanstack/react-router";
import { resolveListingImage } from "@/lib/listing-assets";
import { partners as defaultPartners, type Partner } from "@/lib/partners";
import { cn } from "@/lib/utils";

/**
 * Greyscale logo strip of developments and partners.
 * Renders a tracked-caps wordmark whenever a logo image is missing.
 */
export function PartnerStrip({
  items = defaultPartners,
  className,
}: {
  items?: Partner[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14",
        className,
      )}
    >
      {items.map((p) => {
        const inner = p.logo ? (
          <img
            src={resolveListingImage(p.logo)}
            alt={p.name}
            width={240}
            height={80}
            loading="lazy"
            className="h-7 w-auto object-contain grayscale opacity-45 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-8"
          />
        ) : (
          <span className="label-caps text-[0.6rem] text-ink/45 transition-colors duration-500 group-hover:text-ink sm:text-[0.65rem]">
            {p.name}
          </span>
        );

        return (
          <li key={p.name}>
            {p.slug ? (
              <Link
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className="group flex items-center"
              >
                {inner}
              </Link>
            ) : (
              <span className="group flex items-center">{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Container, Overline, Section } from "@/components/site/ui";
import {
  formatPrice,
  listingCollections,
  listings,
  usedLocations,
  usedTiers,
  usedTypes,
} from "@/lib/listings";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type PortfolioSearch = { location?: string; collection?: string };

export const Route = createFileRoute("/portfolio/")({
  validateSearch: (search: Record<string, unknown>): PortfolioSearch => ({
    location: typeof search.location === "string" ? search.location : undefined,
    collection: typeof search.collection === "string" ? search.collection : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Portfolio — Riviera Maya Property | Marylene Maglio, Realtor" },
      {
        name: "description",
        content:
          "Pre-construction, villas, condos and branded residences across Tulum, Playacar, Playa del Carmen and Cancún with realtor Marylene Maglio, plus property management once you own.",
      },
      { property: "og:title", content: "Portfolio — Riviera Maya | Marylene Realtor" },
      {
        property: "og:description",
        content:
          "A curated portfolio of Riviera Maya developments and residences, with property management for owners.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function FilterRow({
  label,
  options,
  value,
  onChange,
  optionLabel,
}: {
  label: string;
  options: readonly string[];
  value: string | null;
  onChange: (v: string | null) => void;
  optionLabel?: (v: string) => string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="label-caps w-24 shrink-0 text-[0.6rem] text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            "label-caps py-1 text-[0.65rem] transition-colors duration-300 hover:text-gold",
            value === null ? "text-gold" : "text-ink/70",
          )}
        >
          {t("portfolio.filter.all")}
        </button>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(value === o ? null : o)}
            className={cn(
              "label-caps py-1 text-[0.65rem] transition-colors duration-300 hover:text-gold",
              value === o ? "text-gold" : "text-ink/70",
            )}
          >
            {optionLabel ? optionLabel(o) : o}
          </button>
        ))}
      </div>
    </div>
  );
}

function PortfolioPage() {
  const { t } = useI18n();
  const search = Route.useSearch();

  const initialLocation =
    search.location && (usedLocations as readonly string[]).includes(search.location)
      ? search.location
      : null;
  const initialCollection =
    search.collection && listingCollections.includes(search.collection)
      ? search.collection
      : null;

  const [location, setLocation] = useState<string | null>(initialLocation);
  const [type, setType] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [collection, setCollection] = useState<string | null>(initialCollection);

  const results = useMemo(
    () =>
      listings.filter(
        (l) =>
          (!location || l.location === location) &&
          (!type || l.type === type) &&
          (!tier || l.tier === tier) &&
          (!collection || l.collections.includes(collection)),
      ),
    [location, type, tier, collection],
  );

  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("portfolio.hero.overline")}</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("portfolio.hero.titleLine1")}
              <span className="block italic">{t("portfolio.hero.titleLine2")}</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("portfolio.hero.subtitle")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-16 pb-0 md:pt-20">
        <Container>
          <Reveal className="space-y-5 border-y border-border py-8">
            <FilterRow
              label={t("portfolio.filter.location")}
              options={usedLocations}
              value={location}
              onChange={setLocation}
            />
            <FilterRow
              label={t("portfolio.filter.type")}
              options={usedTypes}
              value={type}
              onChange={setType}
              optionLabel={(o) => {
                const key = `properties.type.${o}`;
                const val = t(key);
                return val === key ? o : val;
              }}
            />
            <FilterRow
              label={t("portfolio.filter.tier")}
              options={usedTiers}
              value={tier}
              onChange={setTier}
              optionLabel={(o) => t(`portfolio.tier.${o}`)}
            />
            {listingCollections.length > 0 && (
              <FilterRow
                label={t("portfolio.filter.collection")}
                options={listingCollections}
                value={collection}
                onChange={setCollection}
              />
            )}
          </Reveal>
          <p className="label-caps mt-6 text-[0.6rem] text-muted-foreground">
            {results.length}{" "}
            {results.length === 1 ? t("portfolio.count.singular") : t("portfolio.count.plural")}
          </p>
        </Container>
      </Section>

      <Section className="pt-14">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2">
            {results.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 2) * 120}>
                <Link to="/portfolio/$slug" params={{ slug: l.slug }} className="group block">
                  <div className="hover-zoom">
                    <img
                      src={l.heroImage}
                      alt={l.name}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <div className="min-w-0">
                      <p className="label-caps text-[0.62rem] text-lagoon">
                        {l.location} · {t(`properties.type.${l.type}`) === `properties.type.${l.type}` ? l.type : t(`properties.type.${l.type}`)}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl transition-colors duration-300 group-hover:text-gold">
                        {l.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">{l.highlights.join(" · ")}</p>
                    </div>
                    <p className="shrink-0 font-serif text-lg">
                      {formatPrice(l.priceFrom, t("portfolio.priceOnRequest"))}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {results.length === 0 && (
            <p className="py-16 text-center font-serif text-2xl text-muted-foreground">
              {t("portfolio.empty")}
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ListingChips } from "@/components/site/listing-sections";
import { PartnerStrip } from "@/components/site/PartnerStrip";
import { useMemo, useState } from "react";
import { Play } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import {
  childSlugsIn,
  formatPrice,
  isCollection,
  usedLocationsIn,
  usedTypesIn,
  type Listing,
} from "@/lib/listings";
import { resolveListingImage } from "@/lib/listing-assets";
import { fetchListings } from "@/lib/listings.functions";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type PortfolioSearch = { location?: string; collection?: string };

const PRICE_BUCKETS = ["under-500k", "500k-1m", "1m-plus"] as const;
const DELIVERY_BUCKETS = ["ready", "2026", "2027-plus"] as const;

/** Collection rows below the grid, in editorial order. */
const COLLECTION_ROWS = ["Playacar Collection", "Tulum Collection"] as const;

function priceBucket(l: Listing): string | null {
  if (!l.priceFrom) return null;
  if (l.priceFrom < 500_000) return "under-500k";
  if (l.priceFrom < 1_000_000) return "500k-1m";
  return "1m-plus";
}

function deliveryBucket(l: Listing): string | null {
  const d = l.delivery.toLowerCase();
  if (d.includes("ready") || d.includes("immediate") || d.includes("delivered")) return "ready";
  const year = d.match(/20\d{2}/);
  if (!year) return null;
  const y = Number(year[0]);
  if (y <= 2025) return "ready";
  if (y === 2026) return "2026";
  return "2027-plus";
}

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
          "One broker, the whole Riviera Maya: pre-construction, villas, condos and branded residences in Tulum, Playacar, Playa del Carmen and Cancún with realtor Marylene Maglio.",
      },
      { property: "og:title", content: "Portfolio — Riviera Maya | Marylene Realtor" },
      {
        property: "og:description",
        content:
          "A selection from Marylene's portfolio, with access to the entire Riviera Maya inventory.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  loader: () => fetchListings(),
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

function PriceTag({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  if (listing.tier === "sold") {
    return (
      <span className="label-caps inline-block shrink-0 border border-gold/60 px-3 py-1.5 text-[0.55rem] text-gold">
        {t("portfolio.soldOut")}
      </span>
    );
  }
  return (
    <p className="shrink-0 font-serif text-lg">
      {formatPrice(listing.priceFrom, t("portfolio.priceOnRequest"), listing.currency)}
    </p>
  );
}

function ListingCard({ listing, compact = false }: { listing: Listing; compact?: boolean }) {
  const { t } = useI18n();
  const typeKey = `properties.type.${listing.type}`;
  const typeLabel = t(typeKey) === typeKey ? listing.type : t(typeKey);
  return (
    <Link to="/portfolio/$slug" params={{ slug: listing.slug }} className="group block">
      <div className="hover-zoom relative">
        <img
          src={resolveListingImage(listing.heroImage, "card")}
          alt={listing.name}
          width={1280}
          height={960}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        {listing.videoUrl && (
          <span
            className="absolute bottom-4 right-4 inline-flex h-9 w-9 items-center justify-center border border-ivory/70 bg-ink/40 text-ivory backdrop-blur-sm"
            aria-hidden="true"
          >
            <Play size={14} strokeWidth={1.25} className="ml-0.5" />
          </span>
        )}
      </div>

      <ListingChips listing={listing} className="mt-4" />

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="label-caps text-[0.62rem] text-lagoon">
            {listing.location} · {typeLabel}
          </p>
          <h3
            className={cn(
              "mt-3 font-serif transition-colors duration-300 group-hover:text-gold",
              compact ? "text-xl" : "text-2xl",
            )}
          >
            {listing.name}
          </h3>
          {!compact && (
            <p className="mt-2 text-sm text-muted-foreground">{listing.highlights.join(" · ")}</p>
          )}
        </div>
        {isCollection(listing) ? (
          <span className="label-caps shrink-0 border border-gold/60 px-3 py-1.5 text-[0.55rem] text-gold">
            {(listing.subListings ?? []).length}+ {t("portfolio.count.plural")}
          </span>
        ) : (
          <PriceTag listing={listing} />
        )}
      </div>

    </Link>
  );
}

function PortfolioPage() {
  const { t } = useI18n();
  const search = Route.useSearch();
  const listings = Route.useLoaderData() as Listing[];
  const usedLocations = useMemo(() => usedLocationsIn(listings), [listings]);
  const usedTypes = useMemo(() => usedTypesIn(listings), [listings]);

  /** Listings grouped under a collection hub stay off the main grid unless featured. */
  const visible = useMemo(() => {
    const children = childSlugsIn(listings);
    return listings.filter((l) => !children.has(l.slug) || l.featured);
  }, [listings]);

  const initialLocation =
    search.location && usedLocations.includes(search.location)
      ? search.location
      : null;

  const [location, setLocation] = useState<string | null>(initialLocation);
  const [type, setType] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<string | null>(null);

  const masterBroker = useMemo(
    () => visible.filter((l) => l.tier === "master-broker"),
    [visible],
  );

  const results = useMemo(
    () =>
      visible.filter(
        (l: Listing) =>
          (!location || l.location === location) &&
          (!type || l.type === type) &&
          (!price || priceBucket(l) === price) &&
          (!delivery || deliveryBucket(l) === delivery),
      ),
    [visible, location, type, price, delivery],
  );

  const collectionRows = COLLECTION_ROWS.map((c) => ({
    tag: c,
    items: listings.filter((l: Listing) => l.collections.includes(c)),
  })).filter((row) => row.items.length > 0);

  /** Live portfolio counts shown in the header band's right column. */
  const tf = (key: string, fallback: string) => (t(key) === key ? fallback : t(key));
  const counts: { value: number; label: string }[] = useMemo(() => {
    const children = childSlugsIn(listings);
    const developments = listings.filter((l) => !isCollection(l) && !children.has(l.slug)).length;
    const destinations = new Set(listings.map((l) => l.location).filter(Boolean)).size;
    const currencies = new Set(listings.map((l) => l.currency).filter(Boolean)).size;
    return [
      { value: developments, label: tf("portfolio.counts.developments", "Developments") },
      { value: destinations, label: tf("portfolio.counts.destinations", "Destinations") },
      { value: currencies, label: tf("portfolio.counts.currencies", "Currencies") },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, t]);

  return (
    <>
      {/* 1 — Header band */}
      <Section className="pt-28 pb-0 md:pt-32">
        <Container>
          <Reveal className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <Overline>{t("portfolio.hero.overline")}</Overline>
              <GoldRule className="mt-5" />
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                {t("portfolio.band.title")}
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t("portfolio.band.copy")}
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-x-6 border-t border-gold/40 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {counts.map((c) => (
                <div key={c.label}>
                  <dt className="font-serif text-4xl leading-none sm:text-5xl">{c.value}</dt>
                  <dd className="label-caps mt-3 text-[0.55rem] text-muted-foreground">
                    {c.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* 1b — Developments & partners */}
      <Section className="pt-10 pb-0 md:pt-12">
        <Container>
          <Reveal className="border-y border-border py-10">
            <p className="label-caps text-center text-[0.55rem] text-muted-foreground">
              {t("portfolio.partners.title")}
            </p>
            <PartnerStrip className="mt-8" />
          </Reveal>
        </Container>
      </Section>

      {/* 2 — Master broker */}
      {masterBroker.length > 0 && (
        <Section className="pt-12 pb-0 md:pt-14">
          <Container>
            <Reveal className="border border-gold/40 p-8 sm:p-12">
              <span className="label-caps inline-block border border-gold px-3 py-1.5 text-[0.55rem] text-gold">
                {t("portfolio.masterBroker.chip")}
              </span>
              <h2 className="mt-6 font-serif text-3xl sm:text-4xl">
                {t("portfolio.masterBroker.title")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t("portfolio.masterBroker.copy")}
              </p>
              <div className="mt-10 grid gap-12 sm:grid-cols-2">
                {masterBroker.map((l: Listing) => (
                  <ListingCard key={l.slug} listing={l} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 3 — Filters */}
      <Section className="pt-10 pb-0 md:pt-12">
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
              label={t("portfolio.filter.price")}
              options={PRICE_BUCKETS}
              value={price}
              onChange={setPrice}
              optionLabel={(o) => t(`portfolio.price.${o}`)}
            />
            <FilterRow
              label={t("portfolio.filter.delivery")}
              options={DELIVERY_BUCKETS}
              value={delivery}
              onChange={setDelivery}
              optionLabel={(o) => t(`portfolio.delivery.${o}`)}
            />
          </Reveal>
          <p className="label-caps mt-6 text-[0.6rem] text-muted-foreground">
            {results.length}{" "}
            {results.length === 1 ? t("portfolio.count.singular") : t("portfolio.count.plural")}
          </p>
        </Container>
      </Section>

      {/* 4 — Full grid */}
      <Section className="pt-10 pb-0">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2">
            {results.map((l: Listing, i: number) => (
              <Reveal key={l.slug} delay={(i % 2) * 120}>
                <ListingCard listing={l} />
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

      {/* 5 — Collection rows */}
      {collectionRows.map((row) => (
        <Section key={row.tag} className="pt-10 pb-0 md:pt-[72px]">
          <Container>
            <Reveal>
              <Overline>{t("portfolio.collections.overline")}</Overline>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
                {t(`portfolio.collection.${row.tag}`) === `portfolio.collection.${row.tag}`
                  ? row.tag
                  : t(`portfolio.collection.${row.tag}`)}
              </h2>
            </Reveal>
            <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0">
              {row.items.map((l: Listing) => (
                <div key={l.slug} className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
                  <ListingCard listing={l} compact />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* 6 — Closing CTA */}
      <Section className="mt-14 bg-ink text-ivory md:mt-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              {t("portfolio.cta.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/70">
              {t("portfolio.cta.copy")}
            </p>
            <ButtonLink to="/contact" className="mt-10">
              {t("portfolio.cta.button")}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

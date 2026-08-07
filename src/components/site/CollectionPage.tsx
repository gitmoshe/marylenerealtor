import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { ListingChips } from "@/components/site/listing-sections";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { formatPrice, type Listing } from "@/lib/listings";
import { resolveListingImage } from "@/lib/listing-assets";
import { useI18n } from "@/lib/i18n";

/**
 * Collection page type — used for any listing that groups other listings
 * through subListings (e.g. LATITUD 365, the master-broker collection).
 */
export function CollectionPage({ listing, subs }: { listing: Listing; subs: Listing[] }) {
  const { t } = useI18n();
  const developments = subs.filter((s) => s.type !== "Resale");
  const resales = subs.filter((s) => s.type === "Resale");

  return (
    <>
      {/* ---------------------------------- hero --------------------------------- */}
      <section className="relative">
        <img
          src={resolveListingImage(listing.heroImage)}
          alt={listing.name}
          width={1600}
          height={1000}
          className="ken-burns h-[70vh] w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/25 to-ink/85"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10">
          <Container>
            <span className="label-caps inline-block border border-gold px-3 py-1.5 text-[0.55rem] text-gold">
              {t("portfolio.masterBroker.chip")}
            </span>
            <GoldRule className="mt-6" />
            <h1 className="mt-5 font-serif text-5xl text-ivory sm:text-6xl md:text-7xl">
              {listing.name}
            </h1>
            <p className="label-caps mt-5 text-[0.6rem] text-ivory/70">
              {t("collection.subtitle")}
            </p>
          </Container>
        </div>
      </section>

      {/* --------------------------------- intro --------------------------------- */}
      <Section>
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("collection.overline")}</Overline>
            <p className="mt-8 font-serif text-2xl leading-[1.4] sm:text-3xl">
              {t("collection.intro")}
            </p>
            {listing.developerBlurb && (
              <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                {listing.developerBlurb}
              </p>
            )}
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------ developments ----------------------------- */}
      {developments.length > 0 && (
        <Section className="pt-0">
          <Container>
            <Reveal>
              <Overline>{t("collection.developments")}</Overline>
              <GoldRule className="mt-6" />
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {developments.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 100}>
                  <ChildCard listing={s} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* --------------------------------- resales -------------------------------- */}
      {resales.length > 0 && (
        <Section className="border-t border-border bg-secondary/40">
          <Container>
            <Reveal>
              <Overline>{t("collection.resales.overline")}</Overline>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl">{t("collection.resales.title")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t("collection.resales.copy")}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {resales.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 2) * 120}>
                  <ChildCard listing={s} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ----------------------------------- CTA ---------------------------------- */}
      <Section className="bg-ink text-ivory">
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

function ChildCard({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const typeKey = `properties.type.${listing.type}`;
  const typeLabel = t(typeKey) === typeKey ? listing.type : t(typeKey);
  return (
    <Link to="/portfolio/$slug" params={{ slug: listing.slug }} className="group block">
      <div className="hover-zoom">
        <img
          src={resolveListingImage(listing.heroImage, "card")}
          alt={listing.name}
          width={900}
          height={675}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <p className="label-caps mt-4 text-[0.58rem] text-lagoon">
        {listing.location} · {typeLabel}
      </p>
      <h3 className="mt-2 font-serif text-2xl transition-colors duration-300 group-hover:text-gold">
        {listing.name}
      </h3>
      <ListingChips listing={listing} className="mt-3" />
      <p className="mt-3 font-serif text-lg">
        {formatPrice(listing.priceFrom, t("portfolio.priceOnRequest"), listing.currency)}
      </p>
    </Link>
  );
}

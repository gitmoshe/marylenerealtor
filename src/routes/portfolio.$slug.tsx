import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ButtonAnchor, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import {
  DetailSection,
  FloorPlanTabs,
  MasonryGallery,
  PriceTable,
  ProgressTimeline,
} from "@/components/site/listing-sections";
import { CollectionPage } from "@/components/site/CollectionPage";
import { VideoFacade } from "@/components/site/VideoFacade";
import { LazyMap } from "@/components/site/LazyMap";
import { isCollection, type Listing } from "@/lib/listings";
import { resolveListingImage } from "@/lib/listing-assets";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";
import { fetchListings } from "@/lib/listings.functions";
import { useI18n } from "@/lib/i18n";
import { usePricing } from "@/lib/use-pricing";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }): Promise<{ listing: Listing; others: Listing[]; subs: Listing[] }> => {
    const all = await fetchListings();
    const listing = all.find((l) => l.slug === params.slug);
    if (!listing) throw notFound();
    const subSlugs = listing.subListings ?? [];
    return {
      listing,
      others: all.filter((l) => l.slug !== params.slug && !subSlugs.includes(l.slug)),
      subs: all.filter((l) => subSlugs.includes(l.slug)),
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Listing unavailable — Riviera Maya | Marylene Maglio, Realtor" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const l = loaderData.listing;
    const heroImageUrl = absoluteUrl(resolveListingImage(l.heroImage));
    const hasPrice = typeof l.priceFrom === "number" && l.priceFrom > 0;
    return {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { title: `${l.name}, ${l.location} — Riviera Maya | Marylene Realtor` },
        {
          name: "description",
          content: `${l.name} in ${l.location}, Riviera Maya — ${l.type}, ${l.status}. For sale with realtor Marylene Maglio, property management available.`,
        },
        { property: "og:title", content: `${l.name}, ${l.location}` },
        { property: "og:description", content: l.highlights.join(" · ") },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/portfolio/${params.slug}` },
        { property: "og:image", content: heroImageUrl },
        { name: "twitter:image", content: heroImageUrl },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/portfolio/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: l.name,
            description: l.description,
            image: heroImageUrl,
            offers: {
              "@type": "Offer",
              price: hasPrice ? l.priceFrom.toString() : "Pricing on request",
              priceCurrency: l.currency || "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ListingDetail,
});

/** Three distance chips per area — editorial, factual, never hype. */
const distancesByLocation: Record<string, string[]> = {
  Tulum: ["Tulum airport — 25 min", "Beach — 10 min", "Cenotes — 15 min"],
  Playacar: ["Cancún airport — 50 min", "Beach — 5 min", "Fifth Avenue — 10 min"],
  "Playa del Carmen": ["Cancún airport — 45 min", "Beach — 8 min", "Fifth Avenue — 5 min"],
  Cancún: ["Cancún airport — 20 min", "Beach — 5 min", "Downtown — 15 min"],
  "Puerto Morelos": ["Cancún airport — 25 min", "Beach — 5 min", "Playa del Carmen — 30 min"],
  Akumal: ["Cancún airport — 75 min", "Beach — 5 min", "Tulum — 20 min"],
  "Riviera Maya": ["Cancún airport — 45 min", "Caribbean sea — 10 min", "Playa del Carmen — 20 min"],
};

function scrollToFile() {
  document.getElementById("full-file")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function EnquireStickyBar({ listing }: { listing: Listing }) {
  const { t } = useI18n();
  const { price } = usePricing();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const prefill = encodeURIComponent(
    t("detail.sticky.prefill").replace("{name}", listing.name),
  );
  const whatsappHref = `https://wa.me/529984002988?text=${prefill}`;

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      {show && (
        <div className="fixed inset-x-0 top-[4.5rem] z-40 border-b border-gold/20 bg-ivory/95 px-6 py-3 shadow-sm backdrop-blur sm:px-10 lg:top-[7rem]">
          <Container className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-ink">{listing.name}</p>
              <p className="label-caps mt-0.5 text-[0.55rem] text-muted-foreground break-words">
                {listing.location} ·{" "}
                {price(listing.priceFrom, listing.currency)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/contact"
                className="label-caps hidden text-[0.58rem] text-ink/70 transition-colors duration-300 hover:text-gold sm:inline"
              >
                {t("detail.sticky.contact")}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={t("detail.sticky.enquire")}
                className="label-caps inline-flex items-center gap-2 bg-gold px-5 py-3 text-[0.58rem] text-ivory transition-colors duration-500 hover:bg-ink"
              >
                <MessageCircle strokeWidth={1.5} className="size-4" />
                {t("contact.whatsapp")}
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

function ListingDetail() {
  const { listing, others, subs } = Route.useLoaderData() as {
    listing: Listing;
    others: Listing[];
    subs: Listing[];
  };
  const { t, lang } = useI18n();
  const { price, moneyText } = usePricing();
  const reference = listing.slug.toUpperCase().replace(/-/g, " ");

  if (isCollection(listing)) {
    return <CollectionPage listing={listing} subs={subs} />;
  }


  const typeLabel =
    t(`properties.type.${listing.type}`) === `properties.type.${listing.type}`
      ? listing.type
      : t(`properties.type.${listing.type}`);

  const ficha = listing.ficha ?? {};
  const specs = [
    { label: t("portfolio.field.developer"), value: listing.developerName || listing.developer },
    { label: t("portfolio.field.status"), value: listing.status },
    { label: t("detail.spec.delivery"), value: ficha.delivery || listing.delivery },
    { label: t("portfolio.field.bedrooms"), value: listing.bedrooms },
    { label: t("portfolio.field.size"), value: listing.sizeRange },
    { label: t("detail.spec.units"), value: ficha.units },
    { label: t("detail.spec.levels"), value: ficha.levels },
    { label: t("detail.spec.unitTypes"), value: ficha.unitTypes },
    { label: t("detail.spec.parking"), value: ficha.parking },
    { label: t("detail.spec.phases"), value: ficha.phases },
    { label: t("detail.spec.hoa"), value: ficha.hoa ? moneyText(ficha.hoa, listing.currency) : undefined },
    { label: t("detail.spec.priceRange"), value: ficha.priceRange ? moneyText(ficha.priceRange, listing.currency) : undefined },
    {
      label: t("portfolio.field.priceFrom"),
      value: price(listing.priceFrom, listing.currency),
    },
  ].filter((f) => Boolean(f.value));

  const priceRows = (listing.priceList ?? []).slice(0, 6).map((row) => ({ ...row, price: moneyText(row.price, listing.currency) }));
  const distances = distancesByLocation[listing.location] ?? distancesByLocation["Riviera Maya"]!;
  const mapQuery = encodeURIComponent(`${listing.name}, ${listing.location}, Quintana Roo, Mexico`);

  return (
    <>
      {/* ------------------------------ cinematic hero ----------------------------- */}
      <section className="relative">
        <img
          src={resolveListingImage(listing.heroImage)}
          alt={listing.name}
          width={1600}
          height={1000}
          className="ken-burns h-[78vh] w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/80"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <Overline tone="ivory" className="text-ivory/80">
                  {listing.location} · {typeLabel}
                </Overline>
                <GoldRule className="mt-4" />
                <h1 className="mt-5 font-serif text-5xl text-ivory sm:text-6xl md:text-7xl">
                  {listing.name}
                </h1>
                <p className="mt-4 font-serif text-2xl text-gold">
                  {price(listing.priceFrom, listing.currency)}
                </p>
              </div>
              {listing.developerLogo && (
                <img
                  src={resolveListingImage(listing.developerLogo)}
                  alt={listing.developerName || listing.developer}
                  loading="lazy"
                  className="h-10 w-auto opacity-70 brightness-0 invert grayscale sm:h-12"
                />
              )}
            </div>
          </Container>
        </div>
      </section>

      <EnquireStickyBar listing={listing} />

      {/* ------------------------- the residence + specs -------------------------- */}
      <Section>
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("detail.residence.overline")}</Overline>
            <GoldRule className="mt-6" />
            {listing.highlights.length > 0 && (
              <p className="mt-8 font-serif text-2xl leading-[1.4] sm:text-3xl">
                {moneyText(listing.highlights.slice(0, 3).join(" · "), listing.currency)}
              </p>
            )}
            {listing.description && (
              <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                {moneyText(listing.description, listing.currency)}
              </p>
            )}
          </Reveal>

          {specs.length > 0 && (
            <Reveal delay={120} className="mt-10">
              <Overline>{t("detail.specs.overline")}</Overline>
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {specs.map((f) => (
                  <div key={f.label} className="border border-border bg-card px-4 py-3">
                    <dt className="label-caps text-[0.55rem] text-muted-foreground">{f.label}</dt>
                    <dd className="mt-1.5 font-serif text-lg leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* --------------------------------- video --------------------------------- */}
      {listing.videoUrl && (
        <Section className="pt-0">
          <Container>
            <Reveal>
              <DetailSection overline={t("portfolio.detail.film")}>
                <div className="bg-ivory p-3 sm:p-6">
                  <div className="aspect-video w-full overflow-hidden bg-ink">
                    <VideoFacade url={listing.videoUrl} title={listing.name} />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <p className="label-caps text-[0.58rem] text-muted-foreground">
                      {t("portfolio.detail.filmedBy")}
                    </p>
                    {listing.virtualTourUrl && (
                      <ButtonAnchor
                        href={listing.virtualTourUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        className="px-6 py-3 text-[0.58rem]"
                      >
                        {t("detail.virtualTour")}
                      </ButtonAnchor>
                    )}
                  </div>
                </div>
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* -------------------------------- gallery -------------------------------- */}
      {listing.gallery.length > 0 && (
        <Section className="pt-0">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.gallery.overline")}>
                <MasonryGallery images={listing.gallery} alt={listing.name} />
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ------------------------------ floor plans ------------------------------ */}
      {(listing.floorPlans ?? []).length > 0 && (
        <Section className="border-t border-border bg-secondary/40 pt-14">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.plans.overline")}>
                <FloorPlanTabs
                  plans={listing.floorPlans!}
                  requestLabel={t("detail.plans.request")}
                  onRequest={scrollToFile}
                />
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ------------------------------- masterplan ------------------------------- */}
      {listing.masterplanImage && (
        <Section className="pt-14">
          <Container className="max-w-none">
            <Reveal>
              <Overline className="px-2">{t("detail.masterplan.overline")}</Overline>
              <img
                src={resolveListingImage(listing.masterplanImage)}
                alt={`${listing.name} — ${t("detail.masterplan.overline")}`}
                width={1920}
                height={1080}
                loading="lazy"
                className="mt-8 w-full object-cover"
              />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ---------------------------- residences & pricing ------------------------ */}
      {priceRows.length > 0 && (
        <Section className="pt-14">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.pricing.overline")}>
                <PriceTable
                  rows={priceRows}
                  headings={{
                    type: t("detail.pricing.type"),
                    size: t("detail.pricing.size"),
                    from: t("detail.pricing.from"),
                    availability: t("detail.pricing.availability"),
                  }}
                />
                <div className="mt-10 border border-border bg-card p-8 text-center">
                  <p className="text-sm text-muted-foreground">{t("detail.pricing.ctaNote")}</p>
                  <button
                    type="button"
                    onClick={scrollToFile}
                    className="label-caps mt-6 bg-gold px-8 py-4 text-[0.62rem] text-ivory transition-colors duration-500 hover:bg-ink"
                  >
                    {t("detail.pricing.cta")}
                  </button>
                </div>
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* --------------------------- finishes & amenities ------------------------- */}
      {((listing.amenities ?? []).length > 0 || listing.paymentPlanSummary) && (
        <Section className="pt-14">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.amenities.overline")}>
                <div className="grid gap-14 md:grid-cols-2">
                  {(listing.amenities ?? []).length > 0 && (
                    <ul className="space-y-4">
                      {listing.amenities!.map((a) => (
                        <li key={a} className="border-b border-border pb-4 text-sm">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  {listing.paymentPlanSummary && (
                    <div>
                      <p className="font-serif text-2xl">{t("detail.payment.title")}</p>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {moneyText(listing.paymentPlanSummary, listing.currency)}
                      </p>
                    </div>
                  )}
                </div>
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ---------------------------- construction progress ----------------------- */}
      {(listing.progress ?? []).length > 0 && (
        <Section className="border-t border-border bg-secondary/40 pt-14">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.progress.overline")}>
                <ProgressTimeline
                  updates={listing.progress!}
                  prefix={t("detail.progress.prefix")}
                  intro={t("detail.progress.intro")}
                  delivery={/to be confirmed/i.test(listing.delivery) ? undefined : listing.delivery}
                  deliveryLabel={t("detail.progress.delivery")}
                />
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ------------------------------ the developer ----------------------------- */}
      {(listing.developerName || listing.developerBlurb || listing.developerLogo) && (
        <Section className="pt-14">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.developer.overline")}>
                <div className="flex flex-wrap items-center gap-10">
                  {listing.developerLogo && (
                    <img
                      src={resolveListingImage(listing.developerLogo)}
                      alt={listing.developerName || listing.developer}
                      loading="lazy"
                      className="h-12 w-auto grayscale"
                    />
                  )}
                  <div className="max-w-xl">
                    <p className="font-serif text-3xl">
                      {listing.developerName || listing.developer}
                    </p>
                    {listing.developerBlurb && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {moneyText(listing.developerBlurb, listing.currency)}
                      </p>
                    )}
                  </div>
                </div>
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* -------------------------------- location -------------------------------- */}
      <Section className="pt-14">
        <Container>
          <Reveal>
            <DetailSection overline={t("detail.location.overline")}>
              <LazyMap
                title={`${listing.name} — ${t("detail.map.title")}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                {distances.map((d) => (
                  <span
                    key={d}
                    className="label-caps border border-border px-4 py-2 text-[0.55rem] text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </DetailSection>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------- sub-listings -------------------------------- */}
      {subs.length > 0 && (
        <Section className="pt-0">
          <Container>
            <Reveal>
              <DetailSection overline={t("detail.collection.overline")}>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {subs.map((s) => (
                    <Link key={s.slug} to="/portfolio/$slug" params={{ slug: s.slug }} className="group">
                      <div className="hover-zoom">
                        <img
                          src={resolveListingImage(s.heroImage, "card")}
                          alt={s.name}
                          width={800}
                          height={600}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                      <p className="label-caps mt-4 text-[0.55rem] text-lagoon">{s.location}</p>
                      <h3 className="mt-2 font-serif text-xl group-hover:text-gold">{s.name}</h3>
                    </Link>
                  ))}
                </div>
              </DetailSection>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ------------------------------- the full file ---------------------------- */}
      <Section id="full-file" className="border-t border-border pt-14">
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Overline>{t("detail.file.overline")}</Overline>
            <GoldRule className="mt-6" />
            <p className="mt-8 font-serif text-3xl">{t("detail.file.title")}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("brochure.copy")}
            </p>
            <Link
              to="/contact"
              className="link-underline mt-8 inline-block text-xs leading-relaxed text-muted-foreground hover:text-gold"
            >
              {t("brochure.similar")}
            </Link>
          </Reveal>

          <Reveal delay={140} className="md:col-span-7">
            <form
              className="border border-border bg-card p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const get = (k: string) => String(fd.get(k) ?? "").trim();
                const subject = `Brochure request: ${listing.name} (${reference})`;
                const body = [
                  `Name: ${get("name")}`,
                  `Email: ${get("email")}`,
                  `Phone / WhatsApp: ${get("phone")}`,
                  `Preferred language: ${get("preferredLanguage")}`,
                  "",
                  get("message"),
                ].join("\n");
                window.location.href = `mailto:info@marylenerealtor.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("properties.enquire.name")} name="name" />
                <Field label={t("properties.enquire.email")} name="email" type="email" />
                <Field label={t("brochure.phone")} name="phone" type="tel" />
                <div>
                  <label
                    htmlFor="preferredLanguage"
                    className="label-caps text-[0.58rem] text-muted-foreground"
                  >
                    {t("brochure.language")}
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    defaultValue={lang}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none sm:text-sm focus:border-gold"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="label-caps text-[0.58rem] text-muted-foreground"
                >
                  {t("properties.enquire.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  defaultValue={t("brochure.messageTemplate")
                    .replace("{name}", listing.name)
                    .replace("{ref}", reference)}
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none sm:text-sm focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className="label-caps mt-8 w-full bg-gold py-4 text-[0.65rem] text-ivory transition-colors duration-500 hover:bg-ink"
              >
                {t("brochure.submit")}
              </button>
              <p className="mt-5 text-xs text-muted-foreground">
                {t("properties.enquire.replies")}
              </p>
            </form>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------ continue looking -------------------------- */}
      <Section className="border-t border-border bg-secondary/50">
        <Container>
          <Overline>{t("portfolio.detail.continue")}</Overline>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((l) => (
              <Link key={l.slug} to="/portfolio/$slug" params={{ slug: l.slug }} className="group">
                <div className="hover-zoom">
                  <img
                    src={resolveListingImage(l.heroImage, "card")}
                    alt={l.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="label-caps mt-4 text-[0.6rem] text-lagoon">{l.location}</p>
                <h3 className="mt-2 font-serif text-xl group-hover:text-gold">{l.name}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/portfolio"
              className="label-caps inline-flex items-center border border-ink/25 px-8 py-4 text-[0.62rem] transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              {t("portfolio.detail.all")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label-caps text-[0.58rem] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={255}
        autoComplete={
          name === "name" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : "on"
        }
        inputMode={type === "email" ? "email" : type === "tel" ? "tel" : "text"}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none sm:text-sm focus:border-gold"
      />
    </div>
  );
}

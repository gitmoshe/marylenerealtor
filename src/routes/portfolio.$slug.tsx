import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { formatPrice, getListing, listings, type Listing } from "@/lib/listings";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }): { listing: Listing } => {
    const listing = getListing(params.slug);
    if (!listing) throw notFound();
    return { listing };
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
    return {
      meta: [
        { title: `${l.name}, ${l.location} — Riviera Maya | Marylene Realtor` },
        {
          name: "description",
          content: `${l.name} in ${l.location}, Riviera Maya — ${l.type}, ${l.status}. For sale with realtor Marylene Maglio, property management available.`,
        },
        { property: "og:title", content: `${l.name}, ${l.location}` },
        { property: "og:description", content: l.highlights.join(" · ") },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/portfolio/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/portfolio/${params.slug}` }],
    };
  },
  component: ListingDetail,
});

function ListingDetail() {
  const { listing } = Route.useLoaderData() as { listing: Listing };
  const { t, lang } = useI18n();
  const reference = listing.slug.toUpperCase().replace(/-/g, " ");


  const typeLabel =
    t(`properties.type.${listing.type}`) === `properties.type.${listing.type}`
      ? listing.type
      : t(`properties.type.${listing.type}`);

  const fields = [
    { label: t("portfolio.field.developer"), value: listing.developer },
    { label: t("portfolio.field.status"), value: listing.status },
    { label: t("portfolio.field.delivery"), value: listing.delivery },
    { label: t("portfolio.field.bedrooms"), value: listing.bedrooms },
    { label: t("portfolio.field.size"), value: listing.sizeRange },
    {
      label: t("portfolio.field.priceFrom"),
      value: formatPrice(listing.priceFrom, t("portfolio.priceOnRequest")),
    },
  ];

  const others = listings.filter((l) => l.slug !== listing.slug);

  return (
    <>
      <section className="relative">
        <img
          src={listing.heroImage}
          alt={listing.name}
          width={1280}
          height={960}
          className="h-[70vh] w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/70"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10">
          <Container>
            <Overline tone="ivory" className="text-ivory/80">
              {listing.location} · {typeLabel}
            </Overline>
            <h1 className="mt-5 font-serif text-5xl text-ivory sm:text-6xl">{listing.name}</h1>
            <p className="mt-4 font-serif text-2xl text-gold">
              {formatPrice(listing.priceFrom, t("portfolio.priceOnRequest"))}
            </p>
          </Container>
        </div>
      </section>

      <Section>
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Overline>{t("portfolio.detail.overview")}</Overline>
            <GoldRule className="mt-6" />
            {listing.highlights.length > 0 && (
              <p className="mt-8 font-serif text-2xl leading-[1.4]">
                {listing.highlights.join(" · ")}
              </p>
            )}
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {listing.description}
            </p>

            <div className="mt-14">
              <Overline>{t("portfolio.detail.details")}</Overline>
              <dl className="mt-6 grid grid-cols-2 gap-x-10 sm:grid-cols-3">
                {fields.map((f) => (
                  <div key={f.label} className="border-b border-border py-4">
                    <dt className="label-caps text-[0.58rem] text-muted-foreground">{f.label}</dt>
                    <dd className="mt-2 font-serif text-xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>




            {listing.gallery.length > 0 && (
              <div className="mt-14">
                <Overline>{t("portfolio.detail.gallery")}</Overline>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {listing.gallery.map((src, i) => (
                    <div key={`${listing.slug}-g${i}`} className="hover-zoom">
                      <img
                        src={src}
                        alt={`${listing.name} — ${t("portfolio.detail.galleryAlt")}`}
                        width={1280}
                        height={960}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={140} className="md:col-span-5">
            <div className="md:sticky md:top-40">
              <form
                className="border border-border bg-card p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <Overline>{t("brochure.overline")}</Overline>
                <p className="mt-4 font-serif text-2xl">{t("brochure.title")}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t("brochure.copy")}
                </p>
                <div className="mt-8 space-y-5">
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
                  <div>
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
              <Link
                to="/contact"
                className="link-underline mt-5 inline-block text-xs leading-relaxed text-muted-foreground hover:text-gold"
              >
                {t("brochure.similar")}
              </Link>
            </div>
          </Reveal>

        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/50">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="font-serif text-4xl">{t("portfolio.detail.continue")}</h2>
            <Link
              to="/portfolio"
              className="label-caps link-underline py-2 text-[0.68rem] hover:text-gold"
            >
              {t("portfolio.detail.all")}
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {others.slice(0, 3).map((l) => (
              <Link key={l.slug} to="/portfolio/$slug" params={{ slug: l.slug }} className="group">
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
                <p className="label-caps mt-4 text-[0.6rem] text-lagoon">{l.location}</p>
                <h3 className="mt-2 font-serif text-xl group-hover:text-gold">{l.name}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <ButtonLink to="/contact" variant="outline">
              {t("properties.enquire.book")}
            </ButtonLink>
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

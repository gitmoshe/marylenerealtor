import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { properties, type Property } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }): { property: Property } => {
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Property unavailable — Riviera Maya | Marylene Maglio, Realtor" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.property;
    return {
      meta: [
        { title: `${p.name}, ${p.location} — ${p.price} | Marylene Realtor` },
        { name: "description", content: `${p.line} ${p.location}, Riviera Maya — ${p.price}, for sale with realtor Marylene Maglio, property management available.` },
        { property: "og:title", content: `${p.name}, ${p.location}` },
        { property: "og:description", content: p.line },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/properties/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/properties/${params.slug}` }],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData() as { property: Property };
  const { t } = useI18n();

  const tf = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const line = tf(`properties.item.${property.slug}.line`, property.line);
  const description = tf(`properties.item.${property.slug}.description`, property.description);

  return (
    <>
      <section className="relative">
        <img
          src={property.image}
          alt={property.name}
          width={1280}
          height={960}
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/70" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10">
          <Container>
            <Overline tone="ivory" className="text-ivory/80">
              {property.location} · {t(`properties.type.${property.type}`)}
            </Overline>
            <h1 className="mt-5 font-serif text-5xl text-ivory sm:text-6xl">{property.name}</h1>
            <p className="mt-4 font-serif text-2xl text-gold">{property.price}</p>
          </Container>
        </div>
      </section>

      <Section>
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Overline>{t("properties.detail.residenceOverline")}</Overline>
            <GoldRule className="mt-6" />
            <p className="mt-8 font-serif text-2xl leading-[1.4]">{line}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-14">
              <Overline>{t("properties.detail.specsOverline")}</Overline>
              <dl className="mt-6 grid grid-cols-2 gap-x-10 sm:grid-cols-3">
                {property.specs.map((s) => (
                  <div key={s.label} className="border-b border-border py-4">
                    <dt className="label-caps text-[0.58rem] text-muted-foreground">
                      {tf(`properties.spec.${s.label}`, s.label)}
                    </dt>
                    <dd className="mt-2 font-serif text-xl">
                      {tf(`properties.specValue.${s.value}`, s.value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-14">
              <Overline>{t("properties.detail.galleryOverline")}</Overline>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {properties
                  .filter((p) => p.slug !== property.slug)
                  .slice(0, 4)
                  .map((p) => (
                    <div key={p.slug} className="hover-zoom">
                      <img
                        src={p.image}
                        alt={`${property.name} — ${t("properties.detail.galleryAlt")}`}
                        width={1280}
                        height={960}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="md:col-span-5">
            <form
              className="border border-border bg-card p-8 md:sticky md:top-40"
              onSubmit={(e) => e.preventDefault()}
            >
              <Overline>{t("properties.enquire.overline")}</Overline>
              <p className="mt-4 font-serif text-2xl">
                {t("properties.enquire.about").replace("{name}", property.name)}
              </p>
              <div className="mt-8 space-y-5">
                <Field label={t("properties.enquire.name")} name="name" />
                <Field label={t("properties.enquire.email")} name="email" type="email" />
                <Field label={t("properties.enquire.phone")} name="phone" type="tel" />
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
                    defaultValue={t("properties.enquire.messageTemplate")
                      .replace("{name}", property.name)
                      .replace("{ref}", property.specs[5]?.value ?? property.slug)}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="label-caps mt-8 w-full bg-gold py-4 text-[0.65rem] text-ivory transition-colors duration-500 hover:bg-ink"
              >
                {t("properties.enquire.submit")}
              </button>
              <p className="mt-5 text-xs text-muted-foreground">
                {t("properties.enquire.replies")}
              </p>
            </form>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/50">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="font-serif text-4xl">{t("properties.detail.continueLooking")}</h2>
            <Link
              to="/properties"
              className="label-caps link-underline text-[0.68rem] hover:text-gold"
            >
              {t("properties.detail.allProperties")}
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {properties
              .filter((p) => p.slug !== property.slug)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.slug} to="/properties/$slug" params={{ slug: p.slug }} className="group">
                  <div className="hover-zoom">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <p className="label-caps mt-4 text-[0.6rem] text-lagoon">{p.location}</p>
                  <h3 className="mt-2 font-serif text-xl group-hover:text-gold">{p.name}</h3>
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
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}

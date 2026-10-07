import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, KeyRound, Compass, ArrowRight } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg?w=1920&format=webp";
import { Reveal } from "@/components/site/Reveal";
import { FilmCard } from "@/components/site/FilmCard";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { photos } from "@/lib/photos";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { films, testimonials } from "@/lib/site-data";
import { type Listing } from "@/lib/listings";
import { resolveListingImage } from "@/lib/listing-assets";
import { fetchListings } from "@/lib/listings.functions";
import { useI18n } from "@/lib/i18n";
import { usePricing } from "@/lib/use-pricing";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico" },
      {
        name: "description",
        content:
          "Marylene Maglio is a luxury realtor and property manager operating across Mexico's historic Riviera Maya — invest in Playa del Carmen, Tulum, Bacalar and Cancún",
      },
      {
        property: "og:title",
        content: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico",
      },
      {
        property: "og:description",
        content:
          "Marylene Maglio is a luxury realtor and property manager operating across Mexico's historic Riviera Maya — invest in Playa del Carmen, Tulum, Bacalar and Cancún",
      },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroVilla, fetchPriority: "high" },
    ],
  }),
  loader: () => fetchListings(),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <IntroEditorial />
      <StatsRow />
      <FilmsPreview />
      <FeaturedProperties />
      <Services />
      <RivieraTeaser />
      <Testimonials />
      <FinalCta />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img
        src={heroVilla}
        alt={t("home.hero.imgAlt")}
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="ken-burns absolute inset-0 size-full object-cover"
      />
      <div
        className="veil-fade absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90 md:from-ink/80 md:via-ink/55 md:to-ink/85"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-14 text-center sm:px-10">
        <Reveal delay={120}>
          <h1 className="mt-8 font-serif text-[2.9rem] leading-[1.03] text-ivory sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            {t("hero.titleLine1")}
            <span className="block italic">{t("hero.titleLine2")}</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <span className="rule-gold mx-auto mt-10 w-20" />
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-ivory/90">
            {t("hero.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink to="/portfolio" variant="gold">
              {t("hero.ctaPrimary")}
            </ButtonLink>
            <ButtonLink to="/films" variant="ghost">
              {t("hero.ctaSecondary")}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CredibilityBar() {
  const { t } = useI18n();
  return (
    <div className="border-y border-border bg-secondary/60 px-6 py-5 sm:px-10">
      <p className="label-caps mx-auto max-w-6xl text-center text-[0.6rem] leading-relaxed text-ink/65 sm:text-[0.68rem]">
        {t("home.credibility.certified")} <span className="text-lagoon">·</span>{" "}
        {t("home.credibility.sales")} <span className="text-lagoon">·</span>{" "}
        {t("home.credibility.cities")} <span className="text-lagoon">·</span>{" "}
        {t("home.credibility.langs")}
      </p>
    </div>
  );
}

const stats = [
  { value: "6", key: "home.stats.0.label" },
  { value: "180+", key: "home.stats.1.label" },
  { value: "14", key: "home.stats.2.label" },
  { value: "3", key: "home.stats.3.label" },
];

function StatsRow() {
  const { t } = useI18n();
  return (
    <Section className="py-20 md:py-24 lg:py-20 xl:py-[4.5rem]">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.key}
              delay={i * 110}
              className="px-4 text-center md:border-l md:border-border md:first:border-l-0"
            >
              <p className="font-serif text-5xl leading-none text-ink sm:text-6xl">{s.value}</p>
              <span className="rule-gold mx-auto mt-5 w-8" />
              <p className="label-caps mt-5 text-[0.58rem] text-muted-foreground">{t(s.key)}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function IntroEditorial() {
  const { t } = useI18n();
  return (
    <Section>
      <Container className="grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-7 md:order-1 md:pr-6 lg:pr-16">
          <Overline>{t("sections.meetOverline")}</Overline>
          <GoldRule className="mt-6" />
          <p className="mt-8 font-serif text-[1.65rem] leading-[1.35] text-ink sm:text-[2rem]">
            “{t("home.intro.quote")}”
          </p>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {t("home.intro.body")}
          </p>
          <Link
            to="/meet-marylene"
            className="label-caps link-underline mt-8 inline-flex items-center gap-3 py-2 text-[0.68rem] text-ink transition-colors duration-300 hover:text-gold"
          >
            {t("sections.meetLink")} <ArrowRight strokeWidth={1} className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={150} className="md:order-2 md:col-span-5 md:mt-16">
          <div className="hover-zoom relative">
            <PhotoFrame photo={photos.intro} className="aspect-[4/5] w-full" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FilmsPreview() {
  const { t } = useI18n();
  const selection = films.slice(0, 3);
  return (
    <Section className="bg-secondary/50">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Overline>{t("sections.filmsOverline")}</Overline>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{t("sections.filmsTitle")}</h2>
          </div>
          <Link
            to="/films"
            className="label-caps link-underline py-2 text-[0.68rem] transition-colors duration-300 hover:text-gold"
          >
            {t("sections.filmsLink")}
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {selection.map((film, i) => (
            <Reveal key={film.id} delay={i * 120}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeaturedProperties() {
  const { t } = useI18n();
  const { price, moneyText } = usePricing();
  const all = Route.useLoaderData() as Listing[];
  const featured = all.filter((l) => l.featured).slice(0, 3);
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Overline>{t("sections.selectedOverline")}</Overline>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{t("sections.selectedTitle")}</h2>
          </div>
          <Link
            to="/portfolio"
            className="label-caps link-underline py-2 text-[0.68rem] transition-colors duration-300 hover:text-gold"
          >
            {t("sections.selectedLink")}
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {featured.map((p: Listing, i: number) => (
            <Reveal key={p.slug} delay={i * 120}>
              <Link
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="hover-zoom">
                  <img
                    src={resolveListingImage(p.heroImage, "card")}
                    alt={p.name}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <p className="label-caps mt-5 text-[0.62rem] text-lagoon">{p.location}</p>
                <h3 className="mt-3 font-serif text-2xl transition-colors duration-300 group-hover:text-gold">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{moneyText(p.highlights.join(" · "), p.currency)}</p>
                <p className="mt-4 font-serif text-lg text-ink">
                  {price(p.priceFrom, p.currency)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Services() {
  const { t } = useI18n();
  const services = [
    { icon: Home, titleKey: "home.services.buy.title", copyKey: "home.services.buy.copy" },
    {
      icon: KeyRound,
      titleKey: "home.services.management.title",
      copyKey: "home.services.management.copy",
    },
    {
      icon: Compass,
      titleKey: "home.services.relocation.title",
      copyKey: "home.services.relocation.copy",
    },
  ];
  return (
    <Section className="border-y border-border bg-secondary/50 lg:py-14 xl:py-12">
      <Container>
        <div className="grid gap-14 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.titleKey} delay={i * 120}>
              <s.icon strokeWidth={0.75} className="size-8 text-gold" />
              <h3 className="mt-6 font-serif text-2xl">{t(s.titleKey)}</h3>
              <span className="rule-gold mt-5 w-10" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t(s.copyKey)}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RivieraTeaser() {
  const { t } = useI18n();
  return (
    <section className="grid items-stretch md:grid-cols-2">
      <PhotoFrame photo={photos.riviera} className="hover-zoom min-h-[340px] md:h-full" />

      <Reveal className="flex items-center px-6 py-20 sm:px-14 md:py-28 lg:py-[5.5rem] xl:py-20">
        <div className="max-w-md">
          <Overline tone="lagoon">{t("sections.rivieraOverline")}</Overline>
          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
            {t("sections.rivieraTitle")}
          </h2>
          <span className="rule-gold mt-8 w-16" />
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            {t("home.riviera.body")}
          </p>
          <ButtonLink to="/la-riviera" variant="outline" className="mt-10">
            {t("sections.rivieraCta")}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, []);

  const active = {
    quote: t(`home.testimonials.${index}.quote`),
    name: t(`home.testimonials.${index}.name`),
    origin: t(`home.testimonials.${index}.origin`),
  };

  return (
    <Section>
      <Container className="max-w-3xl text-center">
        <Overline className="mx-auto">{t("sections.testimonialsOverline")}</Overline>
        <blockquote className="mt-12 min-h-[13rem] sm:min-h-[11rem]">
          <p
            key={index}
            className="animate-in fade-in font-serif text-[1.7rem] leading-[1.4] duration-1000 sm:text-[2.15rem]"
          >
            “{active.quote}”
          </p>
          <footer className="label-caps mt-10 text-[0.65rem] text-muted-foreground">
            — {active.name}, {active.origin}
          </footer>
        </blockquote>
        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`${t("home.testimonials.ariaLabel")} ${i + 1}`}
              onClick={() => setIndex(i)}
              className="-my-3 grid h-10 w-10 place-items-center py-3"
            >
              <span
                aria-hidden="true"
                className={`h-px w-10 transition-colors duration-500 ${
                  i === index ? "bg-gold" : "bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FinalCta() {
  const { t } = useI18n();
  return (
    <Section className="bg-ink text-ivory">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Overline tone="gold" className="mx-auto">
            {t("sections.ctaOverline")}
          </Overline>
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-6xl">
            {t("sections.ctaTitle")}
          </h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/65">
            {t("home.cta.body")}
          </p>
          <ButtonLink to="/contact" variant="gold" className="mt-12">
            {t("sections.ctaButton")}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}

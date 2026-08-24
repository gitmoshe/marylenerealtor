import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import coastline from "@/assets/coastline.jpg?w=1600&format=webp";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { useI18n } from "@/lib/i18n";
import { areas } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const Route = createFileRoute("/la-riviera")({
  head: () => ({
    meta: [
      { title: "Riviera Maya — An Area Guide | Marylene Realtor" },
      {
        name: "description",
        content:
          "A Riviera Maya guide by realtor Marylene Maglio — Playa del Carmen, Tulum, Puerto Aventuras, Akumal and Cancún, with property management insight.",
      },
      { property: "og:title", content: "Riviera Maya — An Area Guide" },
      {
        property: "og:description",
        content:
          "Editorial area guides and an honest look at investing on Mexico's Caribbean coast.",
      },
      { property: "og:url", content: `${SITE_URL}/la-riviera` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/la-riviera` }],
  }),
  component: LaRiviera,
});

const reasons = [
  { id: "connectivity", title: "Connectivity" },
  { id: "growth", title: "Growth" },
  { id: "lifestyle", title: "Lifestyle" },
];

function LaRiviera() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative">
        <img
          src={coastline}
          alt={t("riviera.imageAlt")}
          width={1600}
          height={1000}
          className="h-[75vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="max-w-2xl pt-12">
            <Overline tone="ivory" className="text-ivory/85">
              {t("riviera.hero.overline")}
            </Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl">
              {t("riviera.hero.title")}
            </h1>
            <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/75">
              {t("riviera.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Container>
          <div className="space-y-28">
            {areas.map((area, i) => {
              const slug = slugify(area.name);
              const label = t(`riviera.area.${slug}.label`) || area.label;
              const copy = t(`riviera.area.${slug}.copy`) || area.copy;
              return (
                <Reveal key={area.name} delay={i * 60}>
                  <article>
                    <div className="hover-zoom">
                      <img
                        src={area.image}
                        alt={t("riviera.areaImageAlt").replace("{area}", area.name)}
                        width={1600}
                        height={900}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </div>
                    <div className="mt-8 grid gap-8 md:grid-cols-12">
                      <div className="md:col-span-5">
                        <Overline tone="lagoon">{label}</Overline>
                        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{area.name}</h2>
                        <GoldRule className="mt-7" />
                      </div>
                      <div className="md:col-span-7">
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {copy}
                        </p>
                        <Link
                          to="/portfolio"
                          search={{ location: area.name }}
                          className="label-caps link-underline mt-8 inline-flex items-center gap-3 text-[0.65rem] text-ink transition-colors duration-300 hover:text-gold"
                        >
                          {t("riviera.propertiesIn").replace("{area}", area.name)}
                          <ArrowRight strokeWidth={1} className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/50">
        <Container>
          <Reveal className="max-w-2xl">
            <Overline>{t("riviera.why.overline")}</Overline>
            <GoldRule className="mt-6" />
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              {t("riviera.why.title")}
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.id} delay={i * 120} className="border-t border-border pt-8">
                <h3 className="font-serif text-2xl">{t(`riviera.reason.${r.id}.title`)}</h3>
                <span className="rule-gold mt-5 w-10" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {t(`riviera.reason.${r.id}.copy`)}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-2xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl">{t("riviera.closing.title")}</h2>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink to="/portfolio" variant="gold">
              {t("riviera.closing.explore")}
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline">
              {t("riviera.closing.ask")}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

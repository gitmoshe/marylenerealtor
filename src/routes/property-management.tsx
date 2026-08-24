import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, Sparkles, LineChart, Wrench, Users } from "lucide-react";
import property1 from "@/assets/property-1.jpg?w=1600&format=webp";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { useI18n } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/property-management")({
  head: () => ({
    meta: [
      { title: "Riviera Maya Property Management | Marylene Maglio, Realtor" },
      {
        name: "description",
        content:
          "Riviera Maya property management by realtor Marylene Maglio: rentals, maintenance, guest experience and reporting for owners who live abroad.",
      },
      { property: "og:title", content: "Property Management — Riviera Maya | Marylene Realtor" },
        {
          property: "og:description",
          content:
            "Full-service management for investors: rentals, maintenance, guest experience and transparent reporting.",
        },
      { property: "og:url", content: `${SITE_URL}/property-management` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/property-management` }],
  }),
  component: PropertyManagement,
});

function PropertyManagement() {
  const { t } = useI18n();

  const pillars = [
    { icon: LineChart, title: t("management.pillar1.title"), copy: t("management.pillar1.copy") },
    { icon: Wrench, title: t("management.pillar2.title"), copy: t("management.pillar2.copy") },
    { icon: Users, title: t("management.pillar3.title"), copy: t("management.pillar3.copy") },
    { icon: ClipboardList, title: t("management.pillar4.title"), copy: t("management.pillar4.copy") },
  ];

  const steps = [
    { title: t("management.step1.title"), copy: t("management.step1.copy") },
    { title: t("management.step2.title"), copy: t("management.step2.copy") },
    { title: t("management.step3.title"), copy: t("management.step3.copy") },
  ];

  return (
    <>
      <Section className="pt-28 pb-0 md:pt-32">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("management.hero.overline")}</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("management.hero.title.line1")}
              <span className="block italic">{t("management.hero.title.line2")}</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {t("management.hero.lead")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="hover-zoom">
            <img
              src={property1}
              alt={t("management.hero.imageAlt")}
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[21/9] w-full object-cover"
            />
          </Reveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 120}>
                <p.icon strokeWidth={0.75} className="size-8 text-gold" />
                <h2 className="mt-6 font-serif text-2xl">{p.title}</h2>
                <span className="rule-gold mt-5 w-10" />
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {p.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/50">
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Overline tone="lagoon">{t("management.abroad.overline")}</Overline>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              {t("management.abroad.title")}
            </h2>
            <GoldRule className="mt-8" />
          </Reveal>
          <Reveal delay={140} className="space-y-6 text-sm leading-relaxed text-muted-foreground md:col-span-7">
            <p>{t("management.abroad.p1")}</p>
            <p>{t("management.abroad.p2")}</p>
            <p>{t("management.abroad.p3")}</p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Overline>{t("management.steps.overline")}</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl">{t("management.steps.title")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="border-t border-border pt-8">
                <span className="font-serif text-4xl text-gold/50">0{i + 1}</span>
                <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-ivory">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <Sparkles strokeWidth={0.75} className="mx-auto size-8 text-gold" />
            <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">
              {t("management.cta.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/65">
              {t("management.cta.lead")}
            </p>
            <ButtonLink to="/contact" variant="gold" className="mt-10">
              <CalendarCheck strokeWidth={1} className="size-4" /> {t("management.cta.button")}
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

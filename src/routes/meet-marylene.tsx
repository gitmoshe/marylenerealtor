import { createFileRoute } from "@tanstack/react-router";
import { PhotoFrame } from "@/components/site/PhotoFrame";
import { photos } from "@/lib/photos";
import coastline from "@/assets/coastline.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/meet-marylene")({
  head: () => ({
    meta: [
      { title: "Meet Marylene Maglio — Riviera Maya Realtor & Property Manager" },
      {
        name: "description",
        content:
          "Marylene Maglio, certified Riviera Maya realtor and property manager in Playa del Carmen, Tulum, Cancún and Puerto Aventuras — serving clients in Spanish, English and French.",
      },
      { property: "og:title", content: "Meet Marylene Maglio — Riviera Maya Realtor & Property Manager" },
      {
        property: "og:description",
        content:
          "Certified realtor, property manager and Riviera Maya storyteller, at home on the coast and working in Spanish, English and French.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/meet-marylene" },
    ],
    links: [{ rel: "canonical", href: "/meet-marylene" }],
  }),

  component: MeetMarylene,
});

function MeetMarylene() {
  const { t } = useI18n();

  const pillars = [
    {
      index: "01",
      title: t("about.pillar1.title"),
      lead: t("about.pillar1.lead"),
      copy: t("about.pillar1.copy"),
      points: [t("about.pillar1.point1"), t("about.pillar1.point2"), t("about.pillar1.point3")],
    },
    {
      index: "02",
      title: t("about.pillar2.title"),
      lead: t("about.pillar2.lead"),
      copy: t("about.pillar2.copy"),
      points: [t("about.pillar2.point1"), t("about.pillar2.point2"), t("about.pillar2.point3")],
    },
    {
      index: "03",
      title: t("about.pillar3.title"),
      lead: t("about.pillar3.lead"),
      copy: t("about.pillar3.copy"),
      points: [t("about.pillar3.point1"), t("about.pillar3.point2"), t("about.pillar3.point3")],
    },
  ];

  const credentials = [
    t("about.credentials.item1"),
    t("about.credentials.item2"),
    t("about.credentials.item3"),
    t("about.credentials.item4"),
    t("about.credentials.item5"),
  ];

  const affiliations = [
    { name: t("about.affiliation1.name"), note: t("about.affiliation1.note") },
    { name: null, note: t("about.affiliation2.note") },
    { name: null, note: t("about.affiliation3.note") },
  ];

  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>{t("about.hero.overline")}</Overline>
            <GoldRule className="mt-6" />
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              {t("about.hero.title.line1")}
              <span className="block italic">{t("about.hero.title.line2")}</span>
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("about.hero.lead")}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="hover-zoom md:sticky md:top-40">
              <PhotoFrame photo={photos.portrait} className="aspect-[3/4] w-full" priority />
              <p className="label-caps mt-5 text-[0.6rem] text-lagoon">
                {t("about.portrait.caption")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="md:col-span-7 md:pl-6 lg:pl-14">
            <p className="font-serif text-2xl leading-[1.4] text-ink sm:text-[1.8rem]">
              {t("about.story.opening")}
            </p>
            <GoldRule className="mt-8" />
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
              <p>{t("about.story.p4")}</p>
            </div>

            <div className="mt-14">
              <Overline>{t("about.credentials.overline")}</Overline>
              <ul className="mt-6 space-y-0">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="border-b border-border py-4 text-sm text-ink first:border-t"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/50">
        <Container>
          <Reveal>
            <Overline>{t("about.pillars.overline")}</Overline>
            <GoldRule className="mt-6" />
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              {t("about.pillars.title")}
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border-t border-border bg-border md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="bg-background p-8 md:p-10">
                <span className="font-serif text-4xl text-gold/50">{p.index}</span>
                <h3 className="mt-5 font-serif text-2xl">{p.title}</h3>
                <span className="rule-gold mt-5 w-10" />
                <p className="mt-5 font-serif text-lg italic leading-snug text-ink">{p.lead}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                <ul className="mt-7 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="label-caps text-[0.6rem] text-lagoon">
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-20 text-center">
            <p className="script-sign text-5xl text-gold sm:text-6xl">{t("about.signoff")}</p>
          </Reveal>
        </Container>
      </Section>

      <Section className="py-20 md:py-24">
        <Container>
          <Reveal className="text-center">
            <Overline>{t("about.affiliations.overline")}</Overline>
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-6 sm:grid-cols-3">
            {affiliations.map((a, i) => (
              <div
                key={i}
                className="flex h-28 items-center justify-center border border-border px-6 text-center"
              >
                {a.name ? (
                  <span className="label-caps text-[0.7rem] text-ink">{a.name}</span>
                ) : (
                  <span className="label-caps text-[0.6rem] text-muted-foreground/60">{a.note}</span>
                )}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <section className="relative">
        <img
          src={coastline}
          alt={t("about.cta.imageAlt")}
          width={1600}
          height={1000}
          loading="lazy"
          className="h-[52vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <h2 className="font-serif text-4xl text-ivory sm:text-5xl">
              {t("about.cta.title")}
            </h2>
            <ButtonLink to="/contact" variant="gold" className="mt-10">
              {t("about.cta.button")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

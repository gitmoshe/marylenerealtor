import { createFileRoute } from "@tanstack/react-router";
import coastline from "@/assets/coastline.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { areas } from "@/lib/site-data";

export const Route = createFileRoute("/la-riviera")({
  head: () => ({
    meta: [
      { title: "La Riviera — A Guide to the Riviera Maya | Marylene Realtor" },
      {
        name: "description",
        content:
          "Area guides to Playa del Carmen, Tulum, Puerto Aventuras, Akumal and Cancún, and why the Riviera Maya holds its value.",
      },
      { property: "og:title", content: "La Riviera — A Guide to the Riviera Maya" },
      {
        property: "og:description",
        content:
          "Editorial area guides and an honest look at investing on Mexico's Caribbean coast.",
      },
      { property: "og:url", content: "/la-riviera" },
    ],
    links: [{ rel: "canonical", href: "/la-riviera" }],
  }),
  component: LaRiviera,
});

const reasons = [
  {
    title: "Connectivity",
    copy: "Cancún International receives direct flights from more than thirty cities across North America and Europe, and Tulum's Felipe Carrillo Puerto airport opened in December 2023. The Tren Maya now links the coast inland toward Mérida and the Yucatán interior.",
  },
  {
    title: "Growth",
    copy: "Quintana Roo remains Mexico's leading destination for international visitors, and occupancy on the coast holds through most of the calendar rather than a single winter season. Well-placed residences let consistently; poorly placed ones do not.",
  },
  {
    title: "Lifestyle",
    copy: "The Caribbean sea and the second-longest barrier reef in the world sit a few minutes from most addresses, with cenotes, Mayan sites and a serious restaurant culture immediately inland. It is the part of the case that no spreadsheet records.",
  },
];

function LaRiviera() {
  return (
    <>
      <section className="relative">
        <img
          src={coastline}
          alt="Aerial view of the turquoise Riviera Maya coastline"
          width={1600}
          height={1000}
          className="h-[75vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="max-w-2xl pt-20">
            <Overline tone="ivory" className="text-ivory/85">
              The Ambassador's Guide
            </Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl">
              La Riviera.
            </h1>
            <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/75">
              One hundred and thirty kilometres of coast, and five places that could not be less
              alike.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Container>
          <div className="space-y-28">
            {areas.map((area, i) => (
              <Reveal key={area.name} delay={i * 60}>
                <article>
                  <div className="hover-zoom">
                    <img
                      src={area.image}
                      alt={`${area.name}, Riviera Maya`}
                      width={1600}
                      height={900}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                  <div className="mt-8 grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <Overline tone="lagoon">{area.label}</Overline>
                      <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{area.name}</h2>
                      <GoldRule className="mt-7" />
                    </div>
                    <div className="md:col-span-7">
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {area.copy}
                      </p>
                      <Link
                        to="/properties"
                        search={{ location: area.name }}
                        className="label-caps link-underline mt-8 inline-flex items-center gap-3 text-[0.65rem] text-ink transition-colors duration-300 hover:text-gold"
                      >
                        Properties in {area.name}
                        <ArrowRight strokeWidth={1} className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/50">
        <Container>
          <Reveal className="max-w-2xl">
            <Overline>Why the Riviera Maya</Overline>
            <GoldRule className="mt-6" />
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              The case, stated plainly.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 120} className="border-t border-border pt-8">
                <h3 className="font-serif text-2xl">{r.title}</h3>
                <span className="rule-gold mt-5 w-10" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-2xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl">Which coast is yours?</h2>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink to="/properties" variant="ink">
              Explore Properties
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline">
              Ask Marylene
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

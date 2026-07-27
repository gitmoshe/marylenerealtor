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
    title: "Arrival",
    copy: "Two international airports, direct from Paris, Montréal, New York and Madrid. A house here is a five-hour flight from most of North America and a single overnight from Europe.",
  },
  {
    title: "Demand",
    copy: "Visitor numbers to Quintana Roo have grown almost every year for two decades, interrupted only briefly. Well-placed residences rent for most of the calendar, not merely in winter.",
  },
  {
    title: "Ownership",
    copy: "Foreign buyers hold coastal property through a bank trust — established, routine and renewable. The process is unfamiliar rather than difficult.",
  },
  {
    title: "Life",
    copy: "Reef in the morning, cenote in the afternoon, and a dinner table that would hold its own in any European capital. This is the part no spreadsheet captures.",
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
          <div className="space-y-24">
            {areas.map((area, i) => (
              <Reveal
                key={area.name}
                className={`grid items-center gap-12 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="hover-zoom">
                  <img
                    src={area.image}
                    alt={area.name}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div>
                  <Overline tone="lagoon">{area.label}</Overline>
                  <h2 className="mt-5 font-serif text-4xl sm:text-5xl">{area.name}</h2>
                  <GoldRule className="mt-7" />
                  <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {area.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-secondary/50">
        <Container>
          <Reveal className="max-w-2xl">
            <Overline>Why the Riviera Maya</Overline>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              The case, stated plainly.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 120} className="border-t border-border pt-8">
                <h3 className="font-serif text-2xl">{r.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {r.copy}
                </p>
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

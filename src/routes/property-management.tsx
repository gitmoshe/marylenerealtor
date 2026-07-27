import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, Sparkles, LineChart, Wrench, Users } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";

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
          "Full-service management for absentee owners: rentals, maintenance, guest experience and transparent reporting.",
      },
      { property: "og:url", content: "/property-management" },
    ],
    links: [{ rel: "canonical", href: "/property-management" }],
  }),
  component: PropertyManagement,
});

const pillars = [
  {
    icon: LineChart,
    title: "Rental Management",
    copy: "Listing, pricing, calendar and channel management, with occupancy reviewed month by month rather than left to run.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    copy: "Preventive schedules for pools, air conditioning, humidity and hurricane season, handled by trades we have used for years.",
  },
  {
    icon: Users,
    title: "Guest Experience",
    copy: "Arrivals met in person, housekeeping to hotel standard, and a local number guests can actually call.",
  },
  {
    icon: ClipboardList,
    title: "Reporting",
    copy: "Quarterly statements with income, expenses and photographs of your property as it stands that week.",
  },
];

const steps = [
  {
    title: "The Assessment",
    copy: "We walk the property, review its condition and set an honest revenue expectation for the year ahead.",
  },
  {
    title: "The Proposal",
    copy: "A written scope, a fee structure with nothing hidden inside it, and a start date.",
  },
  {
    title: "The Handover",
    copy: "Keys, utilities, insurance and staff transferred. You return to your life; the house stays cared for.",
  },
];

function PropertyManagement() {
  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>For Owners</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              Your house, kept as
              <span className="block italic">though you were here.</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Most owners on this coast live somewhere else. Management exists so that distance
              never shows — in the condition of the property, in its income, or in what a guest
              finds on arrival.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="hover-zoom">
            <img
              src={property1}
              alt="Managed beachfront terrace in Playa del Carmen"
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
            <Overline tone="lagoon">Owners Abroad</Overline>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              Montréal, Chicago, Paris.
            </h2>
            <GoldRule className="mt-8" />
          </Reveal>
          <Reveal delay={140} className="space-y-6 text-sm leading-relaxed text-muted-foreground md:col-span-7">
            <p>
              Owning in Mexico from another country raises the same questions every time: who holds
              the keys, who pays the CFE bill, who answers when the pump fails in August, and how do
              I know any of it is true.
            </p>
            <p>
              The answer is a single point of contact who works in your language and reports on a
              fixed rhythm. Statements arrive quarterly, in writing. Photographs accompany them.
              Anything unusual reaches you the same day, not at year end.
            </p>
            <p>
              Time zones are accommodated. So is the preference — common among French and Canadian
              owners — to keep a property for family use and rent it only in defined windows.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Overline>How It Works</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl">Three steps.</h2>
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
              Request a management proposal.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory/65">
              Send the address and a few photographs. You will receive a scope, a fee structure and
              a realistic revenue projection within three business days.
            </p>
            <ButtonLink to="/contact" variant="gold" className="mt-10">
              <CalendarCheck strokeWidth={1} className="size-4" /> Request a Proposal
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

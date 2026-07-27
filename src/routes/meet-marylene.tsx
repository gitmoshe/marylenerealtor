import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/portrait-marylene.jpg";
import coastline from "@/assets/coastline.jpg";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";

export const Route = createFileRoute("/meet-marylene")({
  head: () => ({
    meta: [
      { title: "Meet Marylene Maglio — French Realtor on the Riviera Maya" },
      {
        name: "description",
        content:
          "The story of a French professional who made the Mayan Riviera home: certified realtor, property manager and trilingual advisor in Playa del Carmen, Tulum and Cancún.",
      },
      { property: "og:title", content: "Meet Marylene Maglio — French Realtor on the Riviera Maya" },
      {
        property: "og:description",
        content:
          "Certified realtor, property manager and Mayan Riviera lifestyle ambassador, working in French, English and Spanish.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/meet-marylene" },
    ],
    links: [{ rel: "canonical", href: "/meet-marylene" }],
  }),
  component: MeetMarylene,
});

const pillars = [
  {
    index: "01",
    title: "The Realtor",
    lead: "Certified & registered, Quintana Roo.",
    copy: "Sales and representation across Playa del Carmen, Tulum and Cancún, in collaboration with LATITUD Properties. Valuations grounded in what actually closed, and every contract, notary appointment and fideicomiso explained before a signature is asked for.",
    points: ["Buyer & seller representation", "Playa del Carmen · Tulum · Cancún", "LATITUD Properties"],
  },
  {
    index: "02",
    title: "The Property Manager",
    lead: "End-to-end care for owners abroad.",
    copy: "Homes kept as though occupied. Maintenance calendars, rental performance, guest arrivals, staff, utilities and quarterly reporting — handled locally for owners who are thousands of kilometres away, and never asked to chase an update.",
    points: ["Maintenance & staffing", "Rental strategy & guest care", "Quarterly owner reporting"],
  },
  {
    index: "03",
    title: "The Ambassador",
    lead: "Storyteller of Riviera life.",
    copy: "Films, guides and introductions. The coast told honestly through her lens and her social presence — its schools, its builders, its beaches, its quieter streets — so that a decision made from Montréal or Paris is made with open eyes.",
    points: ["Property films & reels", "Neighbourhood guides", "@marylene_realtor"],
  },
];

const credentials = [
  "Certified & Registered Realtor, Quintana Roo",
  "Property Sales & Management",
  "In collaboration with LATITUD Properties",
  "Trilingual practice — French, English, Spanish",
  "Based in Playa del Carmen since 2016",
];

const affiliations = [
  { name: "LATITUD Properties", note: "Brokerage partner" },
  { name: null, note: "Affiliation" },
  { name: null, note: "Affiliation" },
];

function MeetMarylene() {
  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>Meet Marylene</Overline>
            <GoldRule className="mt-6" />
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              A French eye on a
              <span className="block italic">Caribbean coast.</span>
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              European discretion and rigour, applied to Caribbean real estate — for clients from
              Canada, the United States and Europe, each spoken to in their own language.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="hover-zoom md:sticky md:top-40">
              <img
                src={portrait}
                alt="Portrait of Marylene Maglio"
                width={1024}
                height={1408}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
              <p className="label-caps mt-5 text-[0.6rem] text-lagoon">
                Marylene Maglio · Playa del Carmen
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="md:col-span-7 md:pl-6 lg:pl-14">
            <p className="font-serif text-2xl leading-[1.4] text-ink sm:text-[1.8rem]">
              She arrived with a suitcase and a return ticket she never used.
            </p>
            <GoldRule className="mt-8" />
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Marylene Maglio was born in France and raised in a culture where service is quiet,
                precise and personal. Her professional life was international long before it was
                Mexican — a habit of moving between languages, cities and codes of conduct that
                turned out to be the exact preparation this coast required.
              </p>
              <p>
                She came to the Riviera Maya for a season, recognised what the place was becoming
                and chose it as home. What followed was a decade of learning it properly: which
                builders finish on time, which streets flood, which towers rent and which simply
                photograph well. That knowledge is the whole of her value, and she gives it plainly
                — including when the honest answer is to wait, or to buy elsewhere.
              </p>
              <p>
                Her clients come from Canada, the United States and Europe, and are advised in
                French, English or Spanish as they prefer. Most first meet the coastline through her
                films. They stay because the reality matches the frame, and because nothing is
                oversold along the way.
              </p>
              <p>
                Discretion is the working method: a small number of clients, files kept private, and
                the unglamorous parts of a purchase handled personally — the notary, the bank trust,
                the utilities, the first gardener and the second set of keys.
              </p>
            </div>

            <div className="mt-14">
              <Overline>Credentials</Overline>
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
            <Overline>Three Roles</Overline>
            <GoldRule className="mt-6" />
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              One practice, held to a single standard.
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
            <p className="script-sign text-5xl text-gold sm:text-6xl">— Marylene</p>
          </Reveal>
        </Container>
      </Section>

      <Section className="py-20 md:py-24">
        <Container>
          <Reveal className="text-center">
            <Overline>Credentials &amp; Affiliations</Overline>
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
          alt="Riviera Maya coastline"
          width={1600}
          height={1000}
          loading="lazy"
          className="h-[52vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <h2 className="font-serif text-4xl text-ivory sm:text-5xl">
              Let us begin with a conversation.
            </h2>
            <ButtonLink to="/contact" variant="gold" className="mt-10">
              Book a Private Consultation
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

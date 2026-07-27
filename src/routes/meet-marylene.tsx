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
    title: "The Realtor",
    copy: "Representation on both sides of a transaction, with valuations grounded in what actually closed — not what was asked. Every contract, notary appointment and fideicomiso explained before it is signed.",
  },
  {
    title: "The Property Manager",
    copy: "Homes cared for as though occupied. Maintenance schedules, rental performance, guest arrivals and quarterly reporting for owners who are thousands of kilometres away.",
  },
  {
    title: "The Ambassador",
    copy: "Films, guides and introductions. A working knowledge of the coast — its schools, its builders, its restaurants and its quieter streets — offered freely to the people who choose it.",
  },
];

const credentials = [
  "Certified & Registered Realtor, Quintana Roo",
  "Property Sales & Management",
  "In collaboration with LATITUD Properties",
  "Trilingual practice — French, English, Spanish",
  "Based in Playa del Carmen since 2016",
];

function MeetMarylene() {
  return (
    <>
      <Section className="pt-44 pb-0 md:pt-52">
        <Container>
          <Reveal className="max-w-3xl">
            <Overline>Meet Marylene</Overline>
            <h1 className="mt-8 font-serif text-5xl leading-[1.05] sm:text-7xl">
              A French eye on a
              <span className="block italic">Caribbean coast.</span>
            </h1>
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
                Marylene Maglio was raised in France and trained in a culture where service is
                quiet, precise and personal. She came to the Riviera Maya for a season, recognised
                what the coast was becoming, and built a practice here instead.
              </p>
              <p>
                What followed was a decade of learning the place properly: which builders finish on
                time, which streets flood, which towers rent and which simply photograph well. That
                knowledge is the whole of her value, and she gives it plainly — including when the
                honest answer is to wait, or to buy elsewhere.
              </p>
              <p>
                Her clients are French, Canadian, American and European. Most arrive knowing the
                coastline only through her films. They stay because the reality matches the frame.
              </p>
              <p>
                She works in French, English and Spanish, and handles the parts of a purchase that
                rarely appear in a listing — the notary, the bank trust, the utilities, the first
                gardener, the second set of keys.
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
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              One practice, held to a single standard.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <span className="font-serif text-4xl text-gold/50">0{i + 1}</span>
                <h3 className="mt-5 font-serif text-2xl">{p.title}</h3>
                <span className="rule-gold mt-5 w-10" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </Reveal>
            ))}
          </div>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, KeyRound, Compass, ArrowRight } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import portrait from "@/assets/portrait-marylene.jpg";
import coastline from "@/assets/coastline.jpg";
import { Reveal } from "@/components/site/Reveal";
import { FilmCard } from "@/components/site/FilmCard";
import { ButtonLink, Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { films, properties, testimonials } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico" },
      {
        name: "description",
        content:
          "Luxury real estate, property management and life on the Mayan Riviera — guided in French, English and Spanish by Marylene Maglio.",
      },
      {
        property: "og:title",
        content: "Marylene Maglio | Luxury Realtor — Riviera Maya, Mexico",
      },
      {
        property: "og:description",
        content:
          "Luxury real estate, property management and life on the Mayan Riviera — guided in French, English and Spanish.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const services = [
  {
    icon: Home,
    title: "Buy & Sell",
    copy: "Curated search, honest valuation and negotiation handled end to end, in your language.",
  },
  {
    icon: KeyRound,
    title: "Property Management",
    copy: "Rental performance, maintenance and guest experience for owners who live elsewhere.",
  },
  {
    icon: Compass,
    title: "Relocation & Investment",
    copy: "Residency, banking, notaries and neighbourhoods — the practical side of moving a life.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <IntroEditorial />
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
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img
        src={heroVilla}
        alt="Luxury white-stone villa with an infinity pool overlooking the Caribbean in the Riviera Maya"
        width={1920}
        height={1280}
        className="ken-burns absolute inset-0 size-full object-cover"
      />
      <div
        className="veil-fade absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/85"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center sm:px-10">
        <Reveal>
          <Overline tone="ivory" className="text-ivory/85">
            Riviera Maya · Mexico
          </Overline>
          <span className="rule-gold mx-auto mt-5 w-12 opacity-80" />
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 font-serif text-[2.9rem] leading-[1.03] text-ivory sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            Where the Caribbean
            <span className="block italic">Meets Home.</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <span className="rule-gold mx-auto mt-10 w-20" />
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed font-light text-ivory/75">
            Luxury real estate, property management and life on the Mayan Riviera — guided in
            French, English &amp; Spanish.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink to="/properties" variant="gold">
              Explore Properties
            </ButtonLink>
            <ButtonLink to="/films" variant="ghost">
              Watch the Films
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CredibilityBar() {
  return (
    <div className="border-y border-border bg-secondary/60 px-6 py-5 sm:px-10">
      <p className="label-caps mx-auto max-w-6xl text-center text-[0.6rem] leading-relaxed text-ink/65 sm:text-[0.68rem]">
        Certified &amp; Registered Realtor <span className="text-lagoon">·</span> Property Sales
        &amp; Management <span className="text-lagoon">·</span> Playa del Carmen — Tulum — Cancún{" "}
        <span className="text-lagoon">·</span> FR / EN / ES
      </p>
    </div>
  );
}

const stats = [
  { value: "10", label: "Years on the Riviera" },
  { value: "180+", label: "Properties sold & managed" },
  { value: "14", label: "Client nationalities" },
  { value: "3", label: "Languages spoken" },
];

function StatsRow() {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 110}
              className="px-4 text-center md:border-l md:border-border md:first:border-l-0"
            >
              <p className="font-serif text-5xl leading-none text-ink sm:text-6xl">{s.value}</p>
              <span className="rule-gold mx-auto mt-5 w-8" />
              <p className="label-caps mt-5 text-[0.58rem] text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function IntroEditorial() {
  return (
    <Section>
      <Container className="grid items-center gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="hover-zoom relative">
            <img
              src={portrait}
              alt="Marylene Maglio, realtor on the Riviera Maya"
              width={1024}
              height={1408}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={150} className="md:col-span-7 md:pl-6 lg:pl-16">
          <Overline>Meet Marylene</Overline>
          <GoldRule className="mt-6" />
          <p className="mt-8 font-serif text-[1.65rem] leading-[1.35] text-ink sm:text-[2rem]">
            “I came from France for a season and stayed for a life. What I offer my clients is the
            same thing I once needed — someone who knows the coast intimately, and who tells the
            truth about it.”
          </p>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Marylene Maglio is a certified and registered realtor and property manager based in the
            Riviera Maya. She represents buyers, sellers and absentee owners across Playa del
            Carmen, Tulum, Puerto Aventuras and Cancún, working in French, English and Spanish.
          </p>
          <Link
            to="/meet-marylene"
            className="label-caps link-underline mt-10 inline-flex items-center gap-3 text-[0.68rem] text-ink transition-colors duration-300 hover:text-gold"
          >
            Her story <ArrowRight strokeWidth={1} className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

function FilmsPreview() {
  const selection = films.slice(0, 3);
  return (
    <Section className="bg-secondary/50">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Overline>The Films</Overline>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Properties, in motion.</h2>
          </div>
          <Link
            to="/films"
            className="label-caps link-underline text-[0.68rem] transition-colors duration-300 hover:text-gold"
          >
            View All Films
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
  const featured = properties.slice(0, 3);
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Overline>Selected Residences</Overline>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Featured properties.</h2>
          </div>
          <Link
            to="/properties"
            className="label-caps link-underline text-[0.68rem] transition-colors duration-300 hover:text-gold"
          >
            All Properties
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <Link
                to="/properties/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="hover-zoom">
                  <img
                    src={p.image}
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
                <p className="mt-2 text-sm text-muted-foreground">{p.line}</p>
                <p className="mt-4 font-serif text-lg text-ink">{p.price}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Services() {
  return (
    <Section className="border-y border-border bg-secondary/50">
      <Container>
        <div className="grid gap-14 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <s.icon strokeWidth={0.75} className="size-8 text-gold" />
              <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
              <span className="rule-gold mt-5 w-10" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {s.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RivieraTeaser() {
  return (
    <section className="grid items-stretch md:grid-cols-2">
      <div className="hover-zoom">
        <img
          src={coastline}
          alt="Turquoise Caribbean coastline of the Riviera Maya from above"
          width={1600}
          height={1000}
          loading="lazy"
          className="h-full min-h-[340px] w-full object-cover"
        />
      </div>
      <Reveal className="flex items-center px-6 py-20 sm:px-14 md:py-28">
        <div className="max-w-md">
          <Overline tone="lagoon">La Riviera</Overline>
          <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
            A coast worth knowing properly.
          </h2>
          <span className="rule-gold mt-8 w-16" />
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Between Cancún and Tulum lie five very different places, each with its own rhythm,
            architecture and reason to buy. The guide is written the way I would explain it over
            lunch — honestly, and without a sales pitch.
          </p>
          <ButtonLink to="/la-riviera" variant="outline" className="mt-10">
            Read the Guide
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <Section>
      <Container className="max-w-3xl text-center">
        <Overline className="mx-auto">In Their Words</Overline>
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
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-px w-10 transition-colors duration-500 ${
                i === index ? "bg-gold" : "bg-border"
              }`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section className="bg-ink text-ivory">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Overline tone="gold" className="mx-auto">
            Private Advisory
          </Overline>
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-6xl">
            Begin Your Riviera Story.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/65">
            A first conversation costs nothing and clarifies everything — budget, timing, area and
            whether the Riviera Maya is right for you at all.
          </p>
          <ButtonLink to="/contact" variant="gold" className="mt-12">
            Book a Private Consultation
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}

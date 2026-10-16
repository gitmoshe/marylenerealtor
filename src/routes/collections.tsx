import { createFileRoute, Link } from "@tanstack/react-router";
import { withRetry } from "@/lib/retry";
import { Reveal } from "@/components/site/Reveal";
import { Container, GoldRule, Overline, Section } from "@/components/site/ui";
import { COLLECTIONS, type Listing } from "@/lib/listings";
import { resolveListingImage } from "@/lib/listing-assets";
import { fetchListings } from "@/lib/listings.functions";
import { useI18n } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-url";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Riviera Maya by Destination | Marylene Realtor" },
      {
        name: "description",
        content:
          "Browse Marylene Maglio's Riviera Maya portfolio by destination: Playacar, Tulum, Puerto Morelos, Cancún, Playa del Carmen, Cozumel and Akumal.",
      },
      { property: "og:title", content: "The Collections | Marylene Realtor" },
      {
        property: "og:description",
        content: "Seven Riviera Maya destinations, each with its own curated collection of properties.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/collections` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/collections` }],
  }),
  loader: () => withRetry(() => fetchListings()),
  component: CollectionsPage,
});

function CollectionsPage() {
  const listings = Route.useLoaderData() as Listing[];
  const { t, lang } = useI18n();
  const countLabel = (n: number) =>
    lang === "es"
      ? `${n} ${n === 1 ? "propiedad" : "propiedades"}`
      : lang === "fr"
        ? `${n} ${n === 1 ? "propriété" : "propriétés"}`
        : `${n} ${n === 1 ? "property" : "properties"}`;

  return (
    <>
      <Section className="pt-36 pb-10 md:pt-44">
        <Container>
          <Reveal>
            <Overline>{t("nav.collections")}</Overline>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl">
              {lang === "es" ? "Las Colecciones" : lang === "fr" ? "Les Collections" : "The Collections"}
            </h1>
            <GoldRule className="mt-6" />
          </Reveal>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((c) => {
              const items = listings.filter((l) => l.location === c.location);
              const cover = items.find((l) => l.featured) ?? items[0];
              const name = t(`portfolio.collection.${c.tag}`);
              return (
                <Link
                  key={c.tag}
                  to="/portfolio"
                  search={{ location: c.location }}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={resolveListingImage(cover?.heroImage ?? "", "card")}
                      alt={name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-4 font-serif text-2xl transition-colors group-hover:text-gold">
                    {name}
                  </h2>
                  <p className="label-caps mt-1 text-[0.65rem] text-muted-foreground">
                    {countLabel(items.length)}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

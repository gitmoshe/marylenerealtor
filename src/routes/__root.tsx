import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { NewsletterBand } from "@/components/site/NewsletterBand";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { LanguageProvider, useI18n } from "@/lib/i18n";
import { ButtonLink } from "@/components/site/ui";
import { SITE_URL } from "@/lib/site-url";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-background px-6 py-[72px] text-center sm:px-10">
      <span className="overline block text-gold">{t("home.notFound.overline")}</span>
      <span className="rule-gold mx-auto mt-5 w-12" aria-hidden="true" />
      <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.1] text-ink sm:text-6xl">
        {t("home.notFound.titleLine1")}
        <span className="block italic">{t("home.notFound.titleLine2")}</span>
      </h1>
      <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
        {t("home.notFound.body")}
      </p>
      <ButtonLink to="/" variant="gold" className="mt-12">
        {t("home.notFound.button")}
      </ButtonLink>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico" },
      {
        name: "description",
        content:
          "Marylene Maglio is a luxury realtor and property manager operating across Mexico's historic Riviera Maya — invest in Playa del Carmen, Tulum, Bacalar and Cancún",
      },
      { name: "author", content: "Marylene Maglio" },
      { property: "og:site_name", content: "Marylene Realtor" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico" },
      { name: "twitter:title", content: "Marylene Maglio | Luxury Realtor & Property Management — Riviera Maya, Mexico" },
      { property: "og:description", content: "Marylene Maglio is a luxury realtor and property manager operating across Mexico's historic Riviera Maya — invest in Playa del Carmen, Tulum, Bacalar and Cancún" },
      { name: "twitter:description", content: "Marylene Maglio is a luxury realtor and property manager operating across Mexico's historic Riviera Maya — invest in Playa del Carmen, Tulum, Bacalar and Cancún" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/002c1192-ecb3-4df0-a77f-b45226d49817/id-preview-1ae0fdef--bd749793-014a-4dbd-a53f-84cc609b798c.lovable.app-1785123525985.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/002c1192-ecb3-4df0-a77f-b45226d49817/id-preview-1ae0fdef--bd749793-014a-4dbd-a53f-84cc609b798c.lovable.app-1785123525985.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      // Brand fonts: preload the stylesheet, then the two families actually used above the fold.
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&family=Pinyon+Script&display=swap",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&family=Pinyon+Script&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/monogram.png" },
      { rel: "apple-touch-icon", href: "/monogram.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Marylene Realtor — Marylene Maglio",
          areaServed: "Riviera Maya, Quintana Roo, Mexico",
          knowsLanguage: ["fr", "en", "es"],
          sameAs: ["https://instagram.com/marylene_realtor"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Nav />
        <main>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <NewsletterBand />
        <Footer />
        <WhatsAppButton />
      </LanguageProvider>
    </QueryClientProvider>
  );
}


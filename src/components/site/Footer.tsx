import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Monogram } from "./Wordmark";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const columns = [
    {
      titleKey: "home.footer.explore",
      links: [
        { to: "/portfolio", labelKey: "nav.properties" },
        { to: "/property-management", labelKey: "nav.management" },
        { to: "/films", labelKey: "nav.films" },
      ],
    },
    {
      titleKey: "home.footer.maison",
      links: [
        { to: "/meet-marylene", labelKey: "nav.meet" },
        { to: "/la-riviera", labelKey: "nav.riviera" },
        { to: "/contact", labelKey: "nav.contact" },
      ],
    },
  ] as const;

  return (
    <footer className="bg-ink px-6 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-ivory sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Monogram />
            <p className="overline mt-6 text-gold">{t("home.footer.tagline")}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
              {t("home.footer.about")}
            </p>
            <div className="mt-7 flex items-center gap-5 text-ivory/70">
              <a
                href="https://instagram.com/marylene_realtor"
                target="_blank"
                rel="noreferrer"
                aria-label={t("home.footer.igLabel")}
                className="-m-2 p-2 transition-colors duration-300 hover:text-gold"
              >
                <Instagram strokeWidth={1} className="size-5" />
              </a>
              <a
                href="https://wa.me/529840000000"
                target="_blank"
                rel="noreferrer"
                aria-label={t("home.footer.waLabel")}
                className="-m-2 p-2 transition-colors duration-300 hover:text-gold"
              >
                <MessageCircle strokeWidth={1} className="size-5" />
              </a>
              <a
                href="mailto:hello@marylenerealtor.com"
                aria-label={t("home.footer.emailLabel")}
                className="-m-2 p-2 transition-colors duration-300 hover:text-gold"
              >
                <Mail strokeWidth={1} className="size-5" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.titleKey} aria-label={t(col.titleKey)}>
              <p className="overline text-ivory/50">{t(col.titleKey)}</p>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="inline-block py-2 text-sm text-ivory/80 transition-colors duration-300 hover:text-gold"
                    >
                      {t(l.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-ivory/10" />

        <div className="mt-8 flex flex-col gap-3 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("home.footer.collab")}</p>
          <p>
            © {new Date().getFullYear()} {t("home.footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

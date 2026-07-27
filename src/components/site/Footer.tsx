import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Monogram } from "./Wordmark";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/properties", label: "Properties" },
      { to: "/property-management", label: "Property Management" },
      { to: "/films", label: "Videos" },
    ],
  },
  {
    title: "Maison",
    links: [
      { to: "/meet-marylene", label: "Meet Marylene" },
      { to: "/la-riviera", label: "La Riviera" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink px-6 pt-24 pb-10 text-ivory sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Monogram />
            <p className="overline mt-6 text-gold">Luxury Real Estate · Mayan Riviera</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
              Certified and registered realtor, property manager and Mayan Riviera lifestyle
              ambassador. Serving clients in French, English and Spanish.
            </p>
            <div className="mt-7 flex items-center gap-5 text-ivory/70">
              <a
                href="https://instagram.com/marylene_realtor"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-colors duration-300 hover:text-gold"
              >
                <Instagram strokeWidth={1} className="size-5" />
              </a>
              <a
                href="https://wa.me/529840000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="transition-colors duration-300 hover:text-gold"
              >
                <MessageCircle strokeWidth={1} className="size-5" />
              </a>
              <a
                href="mailto:hello@marylenerealtor.com"
                aria-label="Email"
                className="transition-colors duration-300 hover:text-gold"
              >
                <Mail strokeWidth={1} className="size-5" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="overline text-ivory/50">{col.title}</p>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-ivory/80 transition-colors duration-300 hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-ivory/10" />

        <div className="mt-8 flex flex-col gap-3 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>In collaboration with LATITUD Properties.</p>
          <p>
            © {new Date().getFullYear()} Marylene Maglio. Riviera Maya, Quintana Roo, Mexico. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

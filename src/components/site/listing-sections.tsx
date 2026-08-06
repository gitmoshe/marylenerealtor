import { useEffect, useState } from "react";
import { GoldRule, Overline } from "@/components/site/ui";
import { resolveListingImage } from "@/lib/listing-assets";
import type { FloorPlan, PriceListRow, ProgressUpdate } from "@/lib/listings";

/* -------------------------------- gallery -------------------------------- */

export function MasonryGallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="hover-zoom block w-full break-inside-avoid"
            aria-label={`${alt} — ${i + 1}`}
          >
            <img
              src={resolveListingImage(src)}
              alt={`${alt} — ${i + 1}`}
              width={1280}
              height={960}
              loading="lazy"
              className="w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <img
            src={resolveListingImage(images[open]!)}
            alt={`${alt} — ${open + 1}`}
            className="max-h-[88vh] max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="label-caps absolute right-5 top-5 px-3 py-2 text-[0.58rem] text-ivory/80 hover:text-gold"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

/* ------------------------------ floor plans ------------------------------ */

export function FloorPlanTabs({
  plans,
  requestLabel,
  onRequest,
}: {
  plans: FloorPlan[];
  requestLabel: string;
  onRequest?: () => void;
}) {
  const [active, setActive] = useState(0);
  const plan = plans[Math.min(active, plans.length - 1)]!;

  return (
    <div>
      {plans.length > 1 && (
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-4">
          {plans.map((p, i) => (
            <button
              key={`${p.name}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`label-caps py-2 text-[0.6rem] transition-colors duration-500 ${
                i === active ? "text-gold" : "text-muted-foreground hover:text-ink"
              }`}
            >
              {p.name || `Plan ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 bg-ivory p-6 sm:p-12">
        {plan.image && (
          <img
            src={resolveListingImage(plan.image)}
            alt={plan.name}
            width={1600}
            height={1200}
            loading="lazy"
            className="mx-auto max-h-[70vh] w-full object-contain"
          />
        )}
      </div>
      <p className="label-caps mt-5 text-[0.58rem] text-muted-foreground">
        {[plan.name, plan.size].filter(Boolean).join(" — ")}
      </p>
      <button
        type="button"
        onClick={onRequest}
        className="link-underline mt-5 inline-block text-sm text-gold"
      >
        {requestLabel}
      </button>
    </div>
  );
}

/* ---------------------------- residences table ---------------------------- */

export function PriceTable({
  rows,
  headings,
}: {
  rows: PriceListRow[];
  headings: { type: string; size: string; from: string; availability: string };
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {[headings.type, headings.size, headings.from, headings.availability].map((h) => (
              <th key={h} className="label-caps py-4 text-[0.55rem] font-normal text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.unit}-${i}`} className="border-b border-border/70">
              <td className="py-5 font-serif text-xl">{r.type || r.unit}</td>
              <td className="py-5 text-sm text-muted-foreground">{r.size}</td>
              <td className="py-5 font-serif text-xl text-gold">{r.price}</td>
              <td className="py-5">
                <span className="label-caps border border-border px-3 py-1.5 text-[0.5rem] text-muted-foreground">
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------- progress -------------------------------- */

export function ProgressTimeline({ updates, prefix }: { updates: ProgressUpdate[]; prefix: string }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-8">
        {updates.map((u, i) => (
          <figure key={`${u.date}-${i}`} className="w-[17rem] shrink-0 sm:w-[21rem]">
            <div className="flex gap-3">
              {(u.images ?? []).slice(0, 2).map((src, j) => (
                <img
                  key={`${src}-${j}`}
                  src={resolveListingImage(src)}
                  alt={`${prefix} ${u.date}`}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              ))}
            </div>
            <span className="mt-5 block h-px w-full bg-border" aria-hidden="true" />
            <figcaption className="mt-4">
              <p className="label-caps text-[0.55rem] text-gold">
                {prefix} {u.date}
              </p>
              {u.note && <p className="mt-2 text-sm text-muted-foreground">{u.note}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ section shell ----------------------------- */

export function DetailSection({
  overline,
  title,
  children,
  className,
}: {
  overline: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Overline>{overline}</Overline>
      <GoldRule className="mt-6" />
      {title && <h2 className="mt-6 font-serif text-3xl sm:text-4xl">{title}</h2>}
      <div className="mt-10">{children}</div>
    </div>
  );
}

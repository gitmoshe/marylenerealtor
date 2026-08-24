import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { Container, Section } from "@/components/site/ui";
import { resolveListingImage } from "@/lib/listing-assets";
import { compressImage } from "@/lib/image-resize";
import {
  listingCurrencies,
  listingLocations,
  listingTiers,
  listingTypes,
  type Listing,
} from "@/lib/listings";
import {
  adminListListings,
  adminLogin,
  adminLogout,
  adminStatus,
  deleteListing,
  saveListing,
  uploadListingImage,
} from "@/lib/listings.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Portfolio admin — Marylene Realtor" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private portfolio administration for Marylene Realtor." },
    ],
  }),
  component: AdminPage,
});

type Draft = Listing & { id?: string };

const emptyDraft: Draft = {
  slug: "",
  name: "",
  developer: "To be confirmed",
  location: "Riviera Maya",
  type: "Pre-construction",
  tier: "portfolio",
  status: "Selling now",
  delivery: "To be confirmed",
  priceFrom: 0,
  currency: "USD" as const,
  bedrooms: "",
  sizeRange: "To be confirmed",
  highlights: [],
  description: "",
  heroImage: "",
  gallery: [],
  videoUrl: "",
  featured: false,
  collections: [],
  sortOrder: 500,
  priceList: [],
  floorPlans: [],
  masterplanImage: "",
  progress: [],
  virtualTourUrl: "",
  developerName: "",
  developerLogo: "",
  developerBlurb: "",
  amenities: [],
  paymentPlanSummary: "",
  ficha: {},
  subListings: [],
};

/** Structured fields are edited as JSON so any shape can be entered. */
function JsonField<T>({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: T;
  onChange: (v: T) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(value ?? [], null, 2));
  const [bad, setBad] = useState(false);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        value={text}
        rows={6}
        spellCheck={false}
        onChange={(e) => {
          setText(e.target.value);
          try {
            onChange(JSON.parse(e.target.value || "null") as T);
            setBad(false);
          } catch {
            setBad(true);
          }
        }}
        className={`${inputClass} font-mono text-xs`}
      />
      <p className={`mt-2 text-xs ${bad ? "text-destructive" : "text-muted-foreground"}`}>
        {bad ? "Invalid JSON — not saved until fixed." : hint}
      </p>
    </div>
  );
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });
}

/* --------------------------------- inputs -------------------------------- */

const inputClass =
  "mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-base outline-none sm:text-sm focus:border-gold";
const labelClass = "label-caps text-[0.58rem] text-muted-foreground";

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

function AdminPage() {
  const status = useServerFn(adminStatus);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const list = useServerFn(adminListListings);

  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [items, setItems] = useState<Listing[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    void status().then((r) => setUnlocked(r.unlocked));
  }, [status]);

  const refresh = async () => {
    const rows = await list();
    setItems(rows);
  };

  useEffect(() => {
    if (unlocked) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  if (unlocked === null) {
    return (
      <Section className="pt-28">
        <Container>
          <p className="label-caps text-[0.6rem] text-muted-foreground">Loading…</p>
        </Container>
      </Section>
    );
  }

  if (!unlocked) {
    return (
      <Section className="pt-28">
        <Container className="max-w-md">
          <h1 className="font-serif text-4xl">Portfolio admin</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Enter the password to manage listings.
          </p>
          <form
            className="mt-8"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await login({ data: { password } });
              if (res.ok) {
                setUnlocked(true);
                setPassword("");
                setLoginError(false);
              } else {
                setLoginError(true);
              }
            }}
          >
            <TextField label="Password" type="password" value={password} onChange={setPassword} />
            {loginError && <p className="mt-3 text-sm text-destructive">Incorrect password.</p>}
            <button
              type="submit"
              className="label-caps mt-6 bg-gold px-8 py-3 text-[0.62rem] text-ivory"
            >
              Enter
            </button>
          </form>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="pt-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl">Portfolio admin</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {items.length} listings. Changes appear on the site immediately.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDraft({ ...emptyDraft })}
              className="label-caps bg-gold px-6 py-3 text-[0.62rem] text-ivory"
            >
              New listing
            </button>
            <button
              type="button"
              onClick={async () => {
                await logout();
                setUnlocked(false);
              }}
              className="label-caps border border-border px-6 py-3 text-[0.62rem]"
            >
              Sign out
            </button>
          </div>
        </div>

        {draft && (
          <ListingForm
            draft={draft}
            onClose={() => setDraft(null)}
            onSaved={async () => {
              setDraft(null);
              await refresh();
            }}
          />
        )}

        <div className="mt-14 divide-y divide-border border-y border-border">
          {items.map((l) => (
            <div key={l.id} className="flex items-center gap-5 py-4">
              <img
                src={resolveListingImage(l.heroImage)}
                alt=""
                className="h-16 w-24 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl">{l.name}</p>
                <p className="label-caps text-[0.55rem] text-muted-foreground">
                  {l.location} · {l.type} · {l.tier}
                  {l.featured ? " · featured" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDraft({ ...l })}
                className="label-caps px-3 py-2 text-[0.58rem] text-gold"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!l.id) return;
                  if (!confirm(`Delete ${l.name}?`)) return;
                  await deleteListing({ data: { id: l.id } });
                  await refresh();
                }}
                className="label-caps px-3 py-2 text-[0.58rem] text-muted-foreground"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------- form ---------------------------------- */

function ListingForm({
  draft,
  onClose,
  onSaved,
}: {
  draft: Draft;
  onClose: () => void;
  onSaved: () => void;
}) {
  const save = useServerFn(saveListing);
  const upload = useServerFn(uploadListingImage);
  const [form, setForm] = useState<Draft>(draft);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const uploadFile = async (file: File): Promise<string | null> => {
    let payload: { base64: string; cardBase64?: string };
    try {
      payload = await compressImage(file);
    } catch {
      payload = { base64: await fileToBase64(file) };
    }
    const res = await upload({
      data: { fileName: file.name, contentType: file.type, ...payload },
    });
    if (!res.ok) {
      setError(res.error);
      return null;
    }
    return res.url;
  };

  return (
    <form
      className="mt-12 border border-gold/40 p-6 sm:p-10"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const res = await save({
          data: {
            ...(form.id ? { id: form.id } : {}),
            slug: form.slug || slugify(form.name),
            name: form.name,
            developer: form.developer,
            location: form.location,
            type: form.type,
            tier: form.tier,
            status: form.status,
            delivery: form.delivery,
            priceFrom: Number(form.priceFrom) || 0,
            currency: form.currency ?? "USD",
            bedrooms: form.bedrooms,
            sizeRange: form.sizeRange,
            highlights: form.highlights.slice(0, 3),
            description: form.description,
            heroImage: form.heroImage,
            gallery: form.gallery,
            videoUrl: form.videoUrl ?? "",
            featured: form.featured,
            collections: form.collections,
            sortOrder: Number(form.sortOrder) || 500,
          },
        }).catch((err: unknown) => ({ ok: false as const, error: String(err) }));
        setBusy(false);
        if (!res.ok) {
          setError("error" in res ? res.error : "Could not save");
          return;
        }
        onSaved();
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">{form.id ? "Edit listing" : "New listing"}</h2>
        <button type="button" onClick={onClose} className="label-caps text-[0.58rem]">
          Close
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <TextField
          label="Name"
          value={form.name}
          onChange={(v) => {
            set("name", v);
            if (!form.id && !form.slug) set("slug", slugify(v));
          }}
        />
        <TextField label="Slug (web address)" value={form.slug} onChange={(v) => set("slug", slugify(v))} />
        <TextField label="Developer" value={form.developer} onChange={(v) => set("developer", v)} />
        <SelectField
          label="Location"
          value={form.location}
          options={listingLocations}
          onChange={(v) => set("location", v)}
        />
        <SelectField
          label="Type"
          value={form.type}
          options={listingTypes}
          onChange={(v) => set("type", v)}
        />
        <SelectField
          label="Tier"
          value={form.tier}
          options={listingTiers}
          onChange={(v) => set("tier", v)}
        />
        <TextField label="Status" value={form.status} onChange={(v) => set("status", v)} />
        <TextField label="Delivery" value={form.delivery} onChange={(v) => set("delivery", v)} />
        <TextField
          label="Price from (0 = on request)"
          type="number"
          value={String(form.priceFrom)}
          onChange={(v) => set("priceFrom", Number(v) || 0)}
        />
        <SelectField
          label="Currency"
          value={form.currency ?? "USD"}
          options={listingCurrencies}
          onChange={(v) => set("currency", v as "USD" | "MXN")}
        />
        <TextField label="Bedrooms" value={form.bedrooms} onChange={(v) => set("bedrooms", v)} />
        <TextField label="Size range" value={form.sizeRange} onChange={(v) => set("sizeRange", v)} />
        <TextField
          label="Video embed URL (optional)"
          value={form.videoUrl ?? ""}
          onChange={(v) => set("videoUrl", v)}
        />
        <TextField
          label="Highlights (max 3, comma separated)"
          value={form.highlights.join(", ")}
          onChange={(v) =>
            set(
              "highlights",
              v
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean)
                .slice(0, 3),
            )
          }
        />
        <TextField
          label="Collections (comma separated)"
          value={form.collections.join(", ")}
          onChange={(v) =>
            set(
              "collections",
              v
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            )
          }
        />
        <TextField
          label="Sort order (lower shows first)"
          type="number"
          value={String(form.sortOrder ?? 500)}
          onChange={(v) => set("sortOrder", Number(v) || 0)}
        />
        <label className="flex items-center gap-3 self-end pb-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="size-4 accent-[hsl(var(--gold,40_35%_55%))]"
          />
          <span className={labelClass}>Featured on the homepage</span>
        </label>
      </div>

      <div className="mt-6">
        <label className={labelClass}>Description</label>
        <textarea
          value={form.description}
          rows={5}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* hero image */}
      <div className="mt-8">
        <label className={labelClass}>Hero image</label>
        <div className="mt-3 flex items-center gap-5">
          {form.heroImage && (
            <img
              src={resolveListingImage(form.heroImage)}
              alt=""
              className="h-20 w-28 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              const url = await uploadFile(file);
              setBusy(false);
              if (url) set("heroImage", url);
            }}
            className="text-sm"
          />
        </div>
      </div>

      {/* gallery */}
      <div className="mt-8">
        <label className={labelClass}>Gallery</label>
        <div className="mt-3 flex flex-wrap gap-4">
          {form.gallery.map((src, i) => (
            <div key={`${src}-${i}`} className="relative">
              <img src={resolveListingImage(src)} alt="" className="h-20 w-28 object-cover" />
              <button
                type="button"
                onClick={() =>
                  set(
                    "gallery",
                    form.gallery.filter((_, idx) => idx !== i),
                  )
                }
                className="label-caps absolute right-0 top-0 bg-ink/70 px-2 py-1 text-[0.5rem] text-ivory"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="mt-4 text-sm"
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length === 0) return;
            setBusy(true);
            const urls: string[] = [];
            for (const file of files) {
              const url = await uploadFile(file);
              if (url) urls.push(url);
            }
            setBusy(false);
            if (urls.length) set("gallery", [...form.gallery, ...urls]);
          }}
        />
      </div>

      {/* -------------------------- extended detail fields -------------------------- */}
      <div className="mt-14 border-t border-border pt-10">
        <p className="label-caps text-[0.6rem] text-gold">Detail page sections</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Every section below only appears on the property page when it has content.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <TextField
            label="Virtual tour URL"
            value={form.virtualTourUrl ?? ""}
            onChange={(v) => set("virtualTourUrl", v)}
          />
          <TextField
            label="Developer name"
            value={form.developerName ?? ""}
            onChange={(v) => set("developerName", v)}
          />
          <TextField
            label="Sub-listings (comma separated slugs)"
            value={(form.subListings ?? []).join(", ")}
            onChange={(v) =>
              set(
                "subListings",
                v
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              )
            }
          />
          <TextField
            label="Amenities (comma separated)"
            value={(form.amenities ?? []).join(", ")}
            onChange={(v) =>
              set(
                "amenities",
                v
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Developer blurb (two lines)</label>
            <textarea
              value={form.developerBlurb ?? ""}
              rows={3}
              onChange={(e) => set("developerBlurb", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Payment plan summary</label>
            <textarea
              value={form.paymentPlanSummary ?? ""}
              rows={3}
              onChange={(e) => set("paymentPlanSummary", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <ImageField
            label="Developer logo"
            value={form.developerLogo ?? ""}
            busy={busy}
            onPick={async (file) => {
              setBusy(true);
              const url = await uploadFile(file);
              setBusy(false);
              if (url) set("developerLogo", url);
            }}
          />
          <ImageField
            label="Masterplan image"
            value={form.masterplanImage ?? ""}
            busy={busy}
            onPick={async (file) => {
              setBusy(true);
              const url = await uploadFile(file);
              setBusy(false);
              if (url) set("masterplanImage", url);
            }}
          />
        </div>

        <div className="mt-8 grid gap-6">
          <JsonField
            label="Ficha técnica"
            hint='{"delivery":"Dec 2027","units":"48","levels":"4","unitTypes":"1–3 bedrooms","parking":"1 space"}'
            value={form.ficha ?? {}}
            onChange={(v) => set("ficha", v)}
          />
          <JsonField
            label="Price list"
            hint='[{"unit":"A-201","type":"2 bedroom","size":"120 m²","price":"$595,000","status":"Available"}]'
            value={form.priceList ?? []}
            onChange={(v) => set("priceList", v)}
          />
          <JsonField
            label="Floor plans"
            hint='[{"name":"Type A","size":"120 m²","image":"/api/public/listing-image/…"}] — upload plan images in the gallery, then copy the URL here'
            value={form.floorPlans ?? []}
            onChange={(v) => set("floorPlans", v)}
          />
          <JsonField
            label="Construction progress"
            hint='[{"date":"July 2026","note":"Structure complete","images":["/api/public/listing-image/…"]}]'
            value={form.progress ?? []}
            onChange={(v) => set("progress", v)}
          />
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

      <div className="mt-10 flex gap-4">
        <button
          type="submit"
          disabled={busy}
          className="label-caps bg-gold px-8 py-3 text-[0.62rem] text-ivory disabled:opacity-50"
        >
          {busy ? "Working…" : "Save listing"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="label-caps border border-border px-8 py-3 text-[0.62rem]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ImageField({
  label,
  value,
  busy,
  onPick,
}: {
  label: string;
  value: string;
  busy: boolean;
  onPick: (file: File) => void | Promise<void>;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="mt-3 flex items-center gap-5">
        {value && <img src={resolveListingImage(value)} alt="" className="h-16 w-24 object-contain" />}
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onPick(file);
          }}
          className="text-sm"
        />
      </div>
    </div>
  );
}

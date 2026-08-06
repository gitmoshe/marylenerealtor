import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Ficha, FloorPlan, Listing, PriceListRow, ProgressUpdate } from "@/lib/listings";

type Row = {
  id: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  type: string;
  tier: string;
  status: string;
  delivery: string;
  price_from: number;
  currency: string | null;
  bedrooms: string;
  size_range: string;
  highlights: string[];
  description: string;
  hero_image: string;
  gallery: string[];
  video_url: string;
  featured: boolean;
  collections: string[];
  sort_order: number;
  price_list: PriceListRow[] | null;
  floor_plans: FloorPlan[] | null;
  masterplan_image: string | null;
  progress: ProgressUpdate[] | null;
  virtual_tour_url: string | null;
  developer_name: string | null;
  developer_logo: string | null;
  developer_blurb: string | null;
  amenities: string[] | null;
  payment_plan_summary: string | null;
  ficha: Ficha | null;
  sub_listings: string[] | null;
};

function toListing(r: Row): Listing {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    developer: r.developer,
    location: r.location,
    type: r.type,
    tier: r.tier,
    status: r.status,
    delivery: r.delivery,
    priceFrom: Number(r.price_from) || 0,
    currency: r.currency === "MXN" ? "MXN" : "USD",
    bedrooms: r.bedrooms,
    sizeRange: r.size_range,
    highlights: r.highlights ?? [],
    description: r.description,
    heroImage: r.hero_image,
    gallery: r.gallery ?? [],
    videoUrl: r.video_url || undefined,
    featured: r.featured,
    collections: r.collections ?? [],
    sortOrder: r.sort_order,
    priceList: Array.isArray(r.price_list) ? r.price_list : [],
    floorPlans: Array.isArray(r.floor_plans) ? r.floor_plans : [],
    masterplanImage: r.masterplan_image || "",
    progress: Array.isArray(r.progress) ? r.progress : [],
    virtualTourUrl: r.virtual_tour_url || "",
    developerName: r.developer_name || "",
    developerLogo: r.developer_logo || "",
    developerBlurb: r.developer_blurb || "",
    amenities: r.amenities ?? [],
    paymentPlanSummary: r.payment_plan_summary || "",
    ficha: (r.ficha ?? {}) as Ficha,
    subListings: r.sub_listings ?? [],
  };
}

const listingInput = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens"),
  name: z.string().trim().min(1).max(120),
  developer: z.string().trim().max(120).default("To be confirmed"),
  location: z.string().trim().max(60),
  type: z.string().trim().max(60),
  tier: z.string().trim().max(30),
  status: z.string().trim().max(80),
  delivery: z.string().trim().max(80),
  priceFrom: z.number().int().min(0).max(1_000_000_000),
  currency: z.enum(["USD", "MXN"]).default("USD"),
  bedrooms: z.string().trim().max(40),
  sizeRange: z.string().trim().max(80),
  highlights: z.array(z.string().trim().max(120)).max(3),
  description: z.string().trim().max(4000),
  heroImage: z.string().trim().max(500),
  gallery: z.array(z.string().trim().max(500)).max(12),
  videoUrl: z.string().trim().max(500),
  featured: z.boolean(),
  collections: z.array(z.string().trim().max(60)).max(6),
  sortOrder: z.number().int().min(0).max(100000),
  priceList: z
    .array(
      z.object({
        unit: z.string().trim().max(80).default(""),
        type: z.string().trim().max(80).default(""),
        size: z.string().trim().max(80).default(""),
        price: z.string().trim().max(80).default(""),
        status: z.string().trim().max(60).default(""),
      }),
    )
    .max(60)
    .default([]),
  floorPlans: z
    .array(
      z.object({
        name: z.string().trim().max(80).default(""),
        image: z.string().trim().max(500).default(""),
        size: z.string().trim().max(80).optional(),
      }),
    )
    .max(20)
    .default([]),
  masterplanImage: z.string().trim().max(500).default(""),
  progress: z
    .array(
      z.object({
        date: z.string().trim().max(60).default(""),
        images: z.array(z.string().trim().max(500)).max(12).default([]),
        note: z.string().trim().max(400).optional(),
      }),
    )
    .max(24)
    .default([]),
  virtualTourUrl: z.string().trim().max(500).default(""),
  developerName: z.string().trim().max(120).default(""),
  developerLogo: z.string().trim().max(500).default(""),
  developerBlurb: z.string().trim().max(600).default(""),
  amenities: z.array(z.string().trim().max(120)).max(40).default([]),
  paymentPlanSummary: z.string().trim().max(1200).default(""),
  ficha: z
    .object({
      delivery: z.string().trim().max(80).optional(),
      units: z.string().trim().max(80).optional(),
      levels: z.string().trim().max(80).optional(),
      unitTypes: z.string().trim().max(160).optional(),
      parking: z.string().trim().max(80).optional(),
      phases: z.string().trim().max(160).optional(),
      hoa: z.string().trim().max(80).optional(),
    })
    .default({}),
  subListings: z.array(z.string().trim().max(80)).max(24).default([]),
});

export type ListingInput = z.infer<typeof listingInput>;

/** Public read — used by every page on the site. */
export const fetchListings = createServerFn({ method: "GET" }).handler(async (): Promise<Listing[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) return [];
  return ((data ?? []) as Row[]).map(toListing);
});

/* ------------------------------ admin access ----------------------------- */

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isUnlocked } = await import("@/lib/admin-session.server");
  return { unlocked: await isUnlocked() };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) return { ok: false as const };

    const { passwordMatches, adminSessionConfig } = await import("@/lib/admin-session.server");
    if (!passwordMatches(data.password, expected)) return { ok: false as const };

    const { useSession } = await import("@tanstack/react-start/server");
    const session = await useSession<{ unlocked?: boolean }>({
      ...adminSessionConfig,
      password: process.env["SESSION_SECRET"] ?? "",
    });
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { adminSessionConfig } = await import("@/lib/admin-session.server");
  const { useSession } = await import("@tanstack/react-start/server");
  const session = await useSession<{ unlocked?: boolean }>({
    ...adminSessionConfig,
    password: process.env["SESSION_SECRET"] ?? "",
  });
  await session.clear();
  return { ok: true as const };
});

/** Admin read — same data, but only served to an unlocked session. */
export const adminListListings = createServerFn({ method: "GET" }).handler(
  async (): Promise<Listing[]> => {
    const { requireAdmin } = await import("@/lib/admin-session.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("listings")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as unknown as Row[]).map(toListing);
  },
);

export const saveListing = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => listingInput.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/admin-session.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      slug: data.slug,
      name: data.name,
      developer: data.developer || "To be confirmed",
      location: data.location,
      type: data.type,
      tier: data.tier,
      status: data.status,
      delivery: data.delivery,
      price_from: data.priceFrom,
      currency: data.currency,
      bedrooms: data.bedrooms,
      size_range: data.sizeRange,
      highlights: data.highlights.filter(Boolean),
      description: data.description,
      hero_image: data.heroImage,
      gallery: data.gallery.filter(Boolean),
      video_url: data.videoUrl,
      featured: data.featured,
      collections: data.collections.filter(Boolean),
      sort_order: data.sortOrder,
      price_list: data.priceList,
      floor_plans: data.floorPlans,
      masterplan_image: data.masterplanImage,
      progress: data.progress,
      virtual_tour_url: data.virtualTourUrl,
      developer_name: data.developerName,
      developer_logo: data.developerLogo,
      developer_blurb: data.developerBlurb,
      amenities: data.amenities.filter(Boolean),
      payment_plan_summary: data.paymentPlanSummary,
      ficha: data.ficha,
      sub_listings: data.subListings.filter(Boolean),
    };

    const query = data.id
      ? supabaseAdmin.from("listings").update(row).eq("id", data.id)
      : supabaseAdmin.from("listings").insert(row);

    const { error } = await query;
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const deleteListing = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/admin-session.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("listings").delete().eq("id", data.id);
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const uploadListingImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(1).max(100),
        /** base64, no data-url prefix. */
        base64: z.string().min(1).max(14_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/admin-session.server");
    await requireAdmin();
    if (!data.contentType.startsWith("image/")) {
      return { ok: false as const, error: "Only image files are allowed." };
    }

    const safe = data.fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${Date.now()}-${safe}`;
    const bytes = Buffer.from(data.base64, "base64");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("listing-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) return { ok: false as const, error: error.message };

    return { ok: true as const, url: `/api/public/listing-image/${path}` };
  });

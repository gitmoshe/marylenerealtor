import { createFileRoute } from "@tanstack/react-router";

/** Only PDFs attached to a public listing can be read through storage RLS. */
export const Route = createFileRoute("/api/public/listing-brochure/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^[a-z0-9-]+\.pdf$/.test(path)) return new Response("Not found", { status: 404 });
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        const url = process.env["SUPABASE_URL"];
        if (!key || !url) return new Response("Unavailable", { status: 503 });
        const { createClient } = await import("@supabase/supabase-js");
        const storageClient = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: { fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
            headers.set("apikey", key);
            return fetch(input, { ...init, headers });
          } },
        });
        const { data, error } = await storageClient.storage.from("listing-brochures").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(await data.arrayBuffer(), { headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${path}"`,
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        } });
      },
    },
  },
});
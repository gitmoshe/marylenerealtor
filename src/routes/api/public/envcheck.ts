import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/envcheck")({
  server: {
    handlers: {
      GET: async () => {
        const pw = process.env["ADMIN_PASSWORD"];
        const ss = process.env["SESSION_SECRET"];
        return new Response(
          JSON.stringify({
            adminPasswordSet: typeof pw === "string" && pw.length > 0,
            adminPasswordLength: pw ? pw.length : 0,
            adminPasswordTrimmedDiff: pw ? pw !== pw.trim() : false,
            sessionSecretSet: typeof ss === "string" && ss.length > 0,
            sessionSecretLength: ss ? ss.length : 0,
          }),
          { headers: { "content-type": "application/json" } },
        );
      },
    },
  },
});

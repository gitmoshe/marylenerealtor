import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — the Properties section is now the Portfolio. */
export const Route = createFileRoute("/properties/")({
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/portfolio", search: search as { location?: string }, replace: true });
  },
});

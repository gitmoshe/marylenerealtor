import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — property detail pages now live at /portfolio/$slug. */
export const Route = createFileRoute("/properties/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/portfolio/$slug", params, replace: true });
  },
});

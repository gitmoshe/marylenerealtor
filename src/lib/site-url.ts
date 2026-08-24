/** Canonical production origin, used for sitemap, canonical links and Open Graph URLs. */
export const SITE_URL = "https://marylenerealtor.lovable.app";

/** Turn a site-relative path or bundled asset path into an absolute URL. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

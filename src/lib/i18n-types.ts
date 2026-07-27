export const LANGS = ["en", "fr", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** A flat map of dotted translation keys to copy, per language. */
export type Dict = Record<Lang, Record<string, string>>;

import type { Lang } from "./i18n-types";
import type { ListingCurrency } from "./listings";

export function languageCurrency(lang: Lang): ListingCurrency {
  return lang === "en" ? "USD" : "MXN";
}

export function convertPrice(amount: number, source: ListingCurrency, target: ListingCurrency, rate: number | null): number | null {
  if (source === target) return amount;
  if (!rate || !Number.isFinite(rate) || rate <= 0) return null;
  return source === "USD" ? amount * rate : amount / rate;
}

export function formatAmount(amount: number, lang: Lang): string {
  const currency = languageCurrency(lang);
  const locale = lang === "fr" ? "fr-FR" : lang === "es" ? "es-MX" : "en-US";
  return `${currency === "MXN" ? "MX$" : "$"}${Math.round(amount).toLocaleString(locale)} ${currency}`;
}

export function displayPrice(amount: number, source: ListingCurrency, lang: Lang, rate: number | null, onRequest: string): string {
  if (!amount) return onRequest;
  const target = languageCurrency(lang);
  const converted = convertPrice(amount, source, target, rate);
  if (converted === null) return onRequest;
  const from = lang === "fr" ? "À partir de" : lang === "es" ? "Desde" : "From";
  return `${from} ${source === target ? "" : "≈ "}${formatAmount(converted, lang)}`;
}

const numberPattern = String.raw`\d+(?:[,.]\d+)*(?:\s?[Mm])?`;
const prefixPattern = String.raw`(?:MX\$|US\$|\$|MXN\s*|USD\s*)`;
const moneyPattern = new RegExp(String.raw`(${prefixPattern})\s*(${numberPattern})(?:\s*[–—-]\s*(${prefixPattern})?\s*(${numberPattern}))?\s*(USD|MXN)?|(${numberPattern})\s*(USD|MXN)`, "gi");

function parseAmount(text: string): number {
  const millions = /m/i.test(text);
  const value = Number(text.replace(/[,\sMm]/g, ""));
  return value * (millions ? 1_000_000 : 1);
}

/** Convert explicit monetary expressions, preserving non-price editorial text. */
export function displayMoneyText(text: string, source: ListingCurrency, lang: Lang, rate: number | null, onRequest: string): string {
  // Old fichas may include a secondary, stale conversion in parentheses.
  const original = text.replace(/\s*\(\s*~[^)]*(?:USD|MXN)\s*\)/gi, "");
  return original.replace(moneyPattern, (_match, prefix: string | undefined, first: string | undefined, secondPrefix: string | undefined, second: string | undefined, suffix: string | undefined, bare: string | undefined, bareSuffix: string | undefined) => {
    const marker = `${prefix ?? ""} ${suffix ?? bareSuffix ?? ""}`;
    const actualSource: ListingCurrency = /MX/i.test(marker) ? "MXN" : /US/i.test(marker) ? "USD" : source;
    const target = languageCurrency(lang);
    const amount = convertPrice(parseAmount(first ?? bare ?? "0"), actualSource, target, rate);
    if (amount === null) return onRequest;
    let result = `${actualSource === target ? "" : "≈ "}${formatAmount(amount, lang)}`;
    if (second) {
      const secondSource = secondPrefix ? (/MX/i.test(secondPrefix) ? "MXN" : /US/i.test(secondPrefix) ? "USD" : actualSource) : actualSource;
      const end = convertPrice(parseAmount(second), secondSource, target, rate);
      if (end === null) return onRequest;
      result += ` – ${formatAmount(end, lang)}`;
    }
    return result;
  });
}
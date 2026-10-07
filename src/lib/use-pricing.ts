import { useSuspenseQuery } from "@tanstack/react-query";
import { useI18n } from "./i18n";
import { exchangeRateOptions } from "./exchange-rate.functions";
import { convertPrice, displayMoneyText, displayPrice, formatAmount, languageCurrency } from "./pricing";
import type { ListingCurrency } from "./listings";

export function usePricing() {
  const { lang, t } = useI18n();
  const { data } = useSuspenseQuery(exchangeRateOptions);
  const rate = data?.mxnPerUsd ?? null;
  const onRequest = t("portfolio.priceOnRequest");
  return {
    price: (amount: number, source: ListingCurrency = "USD") => displayPrice(amount, source, lang, rate, onRequest),
    moneyText: (text: string, source: ListingCurrency = "USD") => displayMoneyText(text, source, lang, rate, onRequest),
    usdValue: (amount: number, source: ListingCurrency = "USD") => convertPrice(amount, source, "USD", rate),
    bucketLabel: (bucket: string) => {
      const lower = convertPrice(500_000, "USD", languageCurrency(lang), rate);
      const upper = convertPrice(1_000_000, "USD", languageCurrency(lang), rate);
      if (lower === null || upper === null) return onRequest;
      const approx = lang === "en" ? "" : "≈ ";
      if (bucket === "under-500k") return `< ${approx}${formatAmount(lower, lang)}`;
      if (bucket === "500k-1m") return `${approx}${formatAmount(lower, lang)} – ${formatAmount(upper, lang)}`;
      return `${approx}${formatAmount(upper, lang)}+`;
    },
  };
}
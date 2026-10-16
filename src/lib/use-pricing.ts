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
      const cur = languageCurrency(lang);
      const [t100, t250, t500, t1m] = [100_000, 250_000, 500_000, 1_000_000].map((v) =>
        convertPrice(v, "USD", cur, rate),
      );
      if (t100 === null || t250 === null || t500 === null || t1m === null) return onRequest;
      const approx = lang === "en" ? "" : "≈ ";
      const range = (a: number, b: number) => `${approx}${formatAmount(a, lang)} – ${formatAmount(b, lang)}`;
      if (bucket === "100k") return range(t100, t250);
      if (bucket === "250k") return range(t250, t500);
      if (bucket === "500k") return range(t500, t1m);
      return `${approx}${formatAmount(t1m, lang)}+`;
    },
  };
}
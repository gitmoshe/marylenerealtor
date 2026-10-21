import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const rateSchema = z.object({
  base: z.literal("USD"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rates: z.object({ MXN: z.number().positive().finite() }),
});

type ExchangeRate = { mxnPerUsd: number; date: string };
let cachedRate: ExchangeRate | null = null;
let cachedUntil = 0;

export const fetchExchangeRate = createServerFn({ method: "GET" }).handler(async () => {
  if (cachedRate && Date.now() < cachedUntil) return cachedRate;
  try {
    const response = await fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=MXN", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = rateSchema.parse(await response.json());
    cachedRate = { mxnPerUsd: data.rates.MXN, date: data.date };
    cachedUntil = Date.now() + 60 * 60 * 1000;
    return cachedRate;
  } catch {
    // Never invent a rate or mislabel the developer's original amount.
    return null;
  }
});

export const exchangeRateOptions = queryOptions({
  queryKey: ["usd-mxn-exchange-rate"],
  queryFn: async () => {
    try {
      return await fetchExchangeRate();
    } catch {
      // Optional conversion must never blank a public page on RPC failure.
      return null;
    }
  },
  staleTime: 60 * 60 * 1000,
  refetchInterval: 60 * 60 * 1000,
});
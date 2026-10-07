import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const rateSchema = z.object({
  base: z.literal("USD"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rates: z.object({ MXN: z.number().positive().finite() }),
});

export const fetchExchangeRate = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const response = await fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=MXN", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = rateSchema.parse(await response.json());
    return { mxnPerUsd: data.rates.MXN, date: data.date };
  } catch {
    // Never invent a rate or mislabel the developer's original amount.
    return null;
  }
});

export const exchangeRateOptions = queryOptions({
  queryKey: ["usd-mxn-exchange-rate"],
  queryFn: () => fetchExchangeRate(),
  staleTime: 60 * 60 * 1000,
  refetchInterval: 60 * 60 * 1000,
});
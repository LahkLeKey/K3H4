import { useQuery } from "@tanstack/react-query";

import { getAuthHeaders } from "./use-agriculture-queries";
import { trackTelemetry } from "../lib/telemetry";

const fetchJson = async <T>(url: string, headers: HeadersInit, metricBase: string): Promise<T> => {
  const res = await fetch(url, { headers });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    void trackTelemetry(`${metricBase}.error`, { message });
    throw new Error(message);
  }
  void trackTelemetry(`${metricBase}.success`);
  return data as T;
};

const queryGuard = () => {
  const auth = getAuthHeaders();
  if (!auth) throw new Error("Sign in to access USDA data.");
  return auth;
};

export function useUsdaEsrCommoditiesQuery(apiBase: string) {
  return useQuery({
    queryKey: ["usda", "esr", "commodities", apiBase],
    queryFn: async () => {
      const auth = queryGuard();
      return fetchJson<any[]>(`${apiBase}/usda/esr/commodities`, auth.headers, "usda.esr.commodities");
    },
  });
}

export function useUsdaEsrReleaseQuery(apiBase: string) {
  return useQuery({
    queryKey: ["usda", "esr", "release", apiBase],
    queryFn: async () => {
      const auth = queryGuard();
      return fetchJson<any[]>(`${apiBase}/usda/esr/data-release`, auth.headers, "usda.esr.release");
    },
  });
}

export function useUsdaPsdCommoditiesQuery(apiBase: string) {
  return useQuery({
    queryKey: ["usda", "psd", "commodities", apiBase],
    queryFn: async () => {
      const auth = queryGuard();
      return fetchJson<any[]>(`${apiBase}/usda/psd/commodities`, auth.headers, "usda.psd.commodities");
    },
  });
}

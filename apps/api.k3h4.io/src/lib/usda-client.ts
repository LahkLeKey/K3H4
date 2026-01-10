import { URL } from "url";

const BASE_URL = "https://api.fas.usda.gov";

const resolveApiKey = () => {
  const key = process.env.USDA_FAS_API_KEY;
  if (!key || key.trim().length === 0) {
    throw new Error("USDA_FAS_API_KEY is required to call FAS APIs");
  }
  return key.trim();
};

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const buildUrl = (path: string, params?: QueryParams) => {
  const url = new URL(path, BASE_URL);
  if (params) {
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  return url.toString();
};

export async function fetchUsdaJson<T = unknown>(path: string, params?: QueryParams): Promise<T> {
  const apiKey = resolveApiKey();
  const url = buildUrl(path, params);
  const res = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable>");
    throw new Error(`USDA API request failed ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

export type UsdaDataset = "esr" | "gats" | "psd";

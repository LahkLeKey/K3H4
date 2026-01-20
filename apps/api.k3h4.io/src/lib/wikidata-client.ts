import { URL } from "url";

const BASE_URL = process.env.WIKIDATA_REST_BASE_URL?.trim() || "https://www.wikidata.org/w/rest.php";
const USER_AGENT =
  process.env.WIKIDATA_USER_AGENT?.trim() || "k3h4-api/1.0 (+https://www.k3h4.dev; contact@k3h4.dev)";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const buildUrl = (path: string, params?: QueryParams) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalized, BASE_URL);
  if (params) {
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .forEach(([key, value]) => url.searchParams.set(key, String(value)));
  }
  return url.toString();
};

const parseCacheControlSeconds = (value: string | null) => {
  if (!value) return undefined;
  const maxAge = value.match(/max-age=(\d+)/i);
  if (!maxAge) return undefined;
  const parsed = Number(maxAge[1]);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export type WikidataFetchResult<T = unknown> = {
  url: string;
  status: number;
  ok: boolean;
  payload: T | string | null;
  cacheControlSeconds?: number;
  etag?: string;
};

export async function fetchWikidataJson<T = unknown>(path: string, params?: QueryParams): Promise<WikidataFetchResult<T>> {
  const url = buildUrl(path, params);
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
  });

  const text = await res.text();
  let parsed: any = null;
  if (text.length > 0) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  return {
    url,
    status: res.status,
    ok: res.ok,
    payload: parsed as T,
    cacheControlSeconds: parseCacheControlSeconds(res.headers.get("cache-control")),
    etag: res.headers.get("etag") ?? undefined,
  };
}

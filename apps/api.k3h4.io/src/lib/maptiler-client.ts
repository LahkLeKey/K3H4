const BASE_URL = "https://api.maptiler.com";

const resolveApiKey = () => {
  const key = process.env.MAPTILER_API_KEY;
  if (!key || key.trim().length === 0) {
    throw new Error("MAPTILER_API_KEY is required to call MapTiler APIs");
  }
  return key.trim();
};

export type MaptilerParams = Record<string, string | number | boolean | null | undefined>;

const toCleanPath = (path: string) => {
  const trimmed = path.trim();
  if (trimmed.includes("://")) throw new Error("path must be relative to api.maptiler.com");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const buildUrl = (path: string, params?: MaptilerParams) => {
  const cleanPath = toCleanPath(path);
  const url = new URL(cleanPath, BASE_URL);
  const apiKey = resolveApiKey();
  const finalParams = { ...(params ?? {}), key: apiKey } as Record<string, string | number | boolean>;
  Object.entries(finalParams)
    .filter(([, v]) => v !== undefined && v !== null && `${v}`.length > 0)
    .forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
};

export type MaptilerRequest = {
  path: string;
  params?: MaptilerParams;
  method?: "GET";
  responseType?: "json" | "arrayBuffer";
};

export type MaptilerResponse = {
  status: number;
  ok: boolean;
  url: string;
  headers: Record<string, string>;
  contentType?: string;
  cacheControl?: string;
  body?: any;
  data?: Buffer;
};

export const buildMaptilerUrl = (req: { path: string; params?: MaptilerParams }) => buildUrl(req.path, req.params);

export async function fetchMaptiler(req: MaptilerRequest): Promise<MaptilerResponse> {
  const url = buildUrl(req.path, req.params);
  const res = await fetch(url, { method: req.method ?? "GET" });
  const headers: Record<string, string> = {};
  res.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const contentType = res.headers.get("content-type") ?? undefined;
  const cacheControl = res.headers.get("cache-control") ?? undefined;

  if (req.responseType === "arrayBuffer") {
    const arrayBuf = await res.arrayBuffer();
    return {
      status: res.status,
      ok: res.ok,
      url,
      headers,
      contentType,
      cacheControl,
      data: Buffer.from(arrayBuf),
    };
  }

  const body = await res
    .json()
    .catch(async () => {
      const text = await res.text().catch(() => "<unreadable>");
      return { message: text };
    });

  return {
    status: res.status,
    ok: res.ok,
    url,
    headers,
    contentType,
    cacheControl,
    body,
  };
}

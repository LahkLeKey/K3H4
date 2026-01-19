import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { fetchMaptiler, type MaptilerRequest, type MaptilerResponse } from "../lib/maptiler-client";

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  userId?: string | null;
};

type PrismaWithMaptiler = PrismaClient & {
  maptilerCacheEntry: {
    findUnique: (...args: any[]) => Promise<any>;
    upsert: (...args: any[]) => Promise<any>;
  };
  maptilerQuery: {
    upsert: (...args: any[]) => Promise<any>;
  };
};

type MaptilerRequestWithKind = MaptilerRequest & { kind?: string };

const sortValue = (value: any): any => {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortValue(value[key]);
        return acc;
      }, {} as Record<string, any>);
  }
  return value;
};

const stableStringify = (value: any) => JSON.stringify(sortValue(value));

const hashString = (input: string) => {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
};

const fingerprint = (request: MaptilerRequestWithKind, responseType: "json" | "arrayBuffer") => {
  return hashString(
    [request.method ?? "GET", request.path, responseType, stableStringify(request.params ?? {}), request.kind ?? "generic"].join("|"),
  );
};

const deriveKind = (path: string, fallback: string | undefined) => {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  const first = clean.split("/").filter(Boolean)[0];
  return (first ?? fallback ?? "generic").toLowerCase();
};

const deriveExpiresAt = (cacheControl: string | undefined, maxAgeMinutes?: number) => {
  const now = Date.now();
  if (cacheControl) {
    const match = cacheControl.match(/max-age=(\d+)/i);
    if (match && match[1]) {
      const seconds = Number(match[1]);
      if (Number.isFinite(seconds)) return new Date(now + seconds * 1000);
    }
  }
  if (maxAgeMinutes && Number.isFinite(maxAgeMinutes)) {
    return new Date(now + maxAgeMinutes * 60 * 1000);
  }
  return null;
};

export type MaptilerCacheResult = {
  cached: boolean;
  response: MaptilerResponse;
  signature: string;
  kind: string;
  queryId?: string | null;
};

export async function fetchMaptilerWithCache(
  prisma: PrismaWithMaptiler,
  request: MaptilerRequestWithKind,
  options?: CacheOptions,
): Promise<MaptilerCacheResult> {
  const responseType: "json" | "arrayBuffer" = request.responseType ?? "json";
  const signature = fingerprint(request, responseType);
  const paramsHash = hashString(stableStringify(request.params ?? {}));
  const maxAgeMs = options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();

  const existing = await prisma.maptilerCacheEntry.findUnique({ where: { signature } });
  if (existing) {
    const freshByAge = maxAgeMs ? now - existing.fetchedAt.getTime() <= maxAgeMs : false;
    const notExpired = existing.expiresAt ? existing.expiresAt.getTime() > now : false;
    if (freshByAge || notExpired) {
      const cachedResponse: MaptilerResponse = {
        status: existing.statusCode ?? 200,
        ok: (existing.statusCode ?? 200) < 400,
        url: existing.url,
        headers: {},
        contentType: existing.contentType ?? undefined,
        cacheControl: existing.cacheControl ?? undefined,
      };

      if (existing.responseType === "arrayBuffer") {
        cachedResponse.data = existing.data ? Buffer.from(existing.data) : undefined;
      } else {
        cachedResponse.body = existing.payload;
      }

      return { cached: true, response: cachedResponse, signature, kind: existing.kind, queryId: existing.queryId };
    }
  }

  const kind = deriveKind(request.path, request.kind);
  const response = await fetchMaptiler({ ...request, responseType });
  const expiresAt = options?.expiresAt ?? deriveExpiresAt(response.cacheControl, options?.maxAgeMinutes);
  const nowDate = new Date();

  const query = await prisma.maptilerQuery.upsert({
    where: { signature },
    create: {
      signature,
      userId: options?.userId ?? null,
      kind,
      path: request.path,
      params: request.params ?? {},
      lastUsedAt: nowDate,
    },
    update: {
      kind,
      path: request.path,
      params: request.params ?? {},
      lastUsedAt: nowDate,
    },
  });

  await prisma.maptilerCacheEntry.upsert({
    where: { signature },
    create: {
      userId: options?.userId ?? null,
      queryId: query?.id ?? null,
      kind,
      path: request.path,
      params: request.params ?? {},
      paramsHash,
      signature,
      method: request.method ?? "GET",
      responseType,
      url: response.url,
      statusCode: response.status,
      payload: responseType === "arrayBuffer" ? null : response.body,
      data: responseType === "arrayBuffer" ? response.data ?? null : null,
      contentType: response.contentType,
      cacheControl: response.cacheControl,
      fetchedAt: nowDate,
      expiresAt,
    },
    update: {
      queryId: query?.id ?? null,
      kind,
      path: request.path,
      params: request.params ?? {},
      paramsHash,
      method: request.method ?? "GET",
      responseType,
      url: response.url,
      statusCode: response.status,
      payload: responseType === "arrayBuffer" ? null : response.body,
      data: responseType === "arrayBuffer" ? response.data ?? null : null,
      contentType: response.contentType,
      cacheControl: response.cacheControl,
      fetchedAt: nowDate,
      expiresAt,
    },
  });

  return { cached: false, response, signature, kind, queryId: query?.id };
}

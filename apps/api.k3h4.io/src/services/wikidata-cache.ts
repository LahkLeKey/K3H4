import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { fetchWikidataJson, type WikidataFetchResult } from "../lib/wikidata-client";

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  resource?: string;
};

type Params = Record<string, string | number | boolean | null | undefined> | undefined;

type PrismaWithWikidata = PrismaClient & {
  wikidataCacheEntry: {
    findUnique: (...args: any[]) => Promise<any>;
    upsert: (...args: any[]) => Promise<any>;
  };
};

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

const fingerprint = (endpoint: string, params: Params) => {
  const hash = createHash("sha256");
  hash.update(endpoint);
  hash.update(":");
  hash.update(stableStringify(params ?? {}));
  return hash.digest("hex");
};

const computeExpiry = (response: WikidataFetchResult, options: CacheOptions, now: number) => {
  if (options.expiresAt) return options.expiresAt;
  if (options.maxAgeMinutes && Number.isFinite(options.maxAgeMinutes)) {
    return new Date(now + options.maxAgeMinutes * 60 * 1000);
  }
  if (response.cacheControlSeconds && Number.isFinite(response.cacheControlSeconds)) {
    return new Date(now + response.cacheControlSeconds * 1000);
  }
  return null;
};

export async function fetchWikidataWithCache<T = unknown>(
  prisma: PrismaWithWikidata,
  endpoint: string,
  params?: Params,
  options: CacheOptions = {},
): Promise<{ cached: boolean; status: number; payload: T | string | null; url: string }> {
  const resource = options.resource ?? "generic";
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = { resource_endpoint_paramsHash: { resource, endpoint, paramsHash } };
  const now = Date.now();
  const maxAgeMs = options.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;

  const existing = await prisma.wikidataCacheEntry.findUnique({ where: cacheKey });
  if (existing) {
    const freshByAge = maxAgeMs ? now - existing.fetchedAt.getTime() <= maxAgeMs : false;
    const notExpired = existing.expiresAt ? existing.expiresAt.getTime() > now : false;
    if (freshByAge || notExpired) {
      return { cached: true, status: existing.statusCode, payload: existing.payload as T, url: existing.url };
    }
  }

  const response = await fetchWikidataJson<T>(endpoint, params ?? undefined);
  const expiresAt = computeExpiry(response, options, now);

  await prisma.wikidataCacheEntry.upsert({
    where: cacheKey,
    create: {
      resource,
      endpoint,
      params: params ?? {},
      paramsHash,
      url: response.url,
      statusCode: response.status,
      payload: response.payload,
      fetchedAt: new Date(now),
      expiresAt,
      cacheControlSeconds: response.cacheControlSeconds ?? null,
      etag: response.etag ?? null,
    },
    update: {
      params: params ?? {},
      url: response.url,
      statusCode: response.status,
      payload: response.payload,
      fetchedAt: new Date(now),
      expiresAt,
      cacheControlSeconds: response.cacheControlSeconds ?? null,
      etag: response.etag ?? null,
    },
  });

  return { cached: false, status: response.status, payload: response.payload, url: response.url };
}

export async function readWikidataCache<T = unknown>(
  prisma: PrismaWithWikidata,
  endpoint: string,
  params?: Params,
  resource = "generic",
): Promise<T | null> {
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = { resource_endpoint_paramsHash: { resource, endpoint, paramsHash } };
  const existing = await prisma.wikidataCacheEntry.findUnique({ where: cacheKey });
  return existing ? (existing.payload as T) : null;
}

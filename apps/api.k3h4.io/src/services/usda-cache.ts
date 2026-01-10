import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { fetchUsdaJson, type UsdaDataset } from "../lib/usda-client";

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
};

type Params = Record<string, string | number | boolean | null | undefined> | undefined;

type PrismaWithUsda = PrismaClient & {
  usdaCacheEntry: {
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

export async function fetchAndCache<T = unknown>(
  prisma: PrismaWithUsda,
  dataset: UsdaDataset,
  endpoint: string,
  params?: Params,
  options?: CacheOptions,
): Promise<T> {
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = { dataset, endpoint, paramsHash };
  const maxAgeMs = options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();

  const existing = await prisma.usdaCacheEntry.findUnique({ where: { dataset_endpoint_paramsHash: cacheKey } });
  if (existing) {
    const freshByAge = maxAgeMs ? now - existing.fetchedAt.getTime() <= maxAgeMs : false;
    const notExpired = existing.expiresAt ? existing.expiresAt.getTime() > now : false;
    if (freshByAge || notExpired) {
      return existing.payload as T;
    }
  }

  const payload = await fetchUsdaJson<T>(endpoint, params ?? undefined);
  const expiresAt = options?.expiresAt;
  await prisma.usdaCacheEntry.upsert({
    where: { dataset_endpoint_paramsHash: cacheKey },
    create: {
      dataset,
      endpoint,
      params: params ?? {},
      paramsHash,
      payload,
      fetchedAt: new Date(),
      expiresAt: expiresAt ?? null,
    },
    update: {
      params: params ?? {},
      payload,
      fetchedAt: new Date(),
      expiresAt: expiresAt ?? null,
    },
  });

  return payload;
}

export async function readCache<T = unknown>(prisma: PrismaWithUsda, dataset: UsdaDataset, endpoint: string, params?: Params): Promise<T | null> {
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = { dataset, endpoint, paramsHash };
  const existing = await prisma.usdaCacheEntry.findUnique({ where: { dataset_endpoint_paramsHash: cacheKey } });
  return existing ? (existing.payload as T) : null;
}

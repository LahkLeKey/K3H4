import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import { buildOsrmUrl, fetchOsrm, type OsrmRequest, type OsrmResponse } from "../lib/osrm-client";

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
};

type PrismaWithOsrm = PrismaClient & {
  osrmCacheEntry: {
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

const fingerprint = (parts: { service: string; profile: string; coordinates?: string | null; params?: any }) => {
  const hash = createHash("sha256");
  hash.update(parts.service);
  hash.update(":");
  hash.update(parts.profile);
  hash.update(":");
  hash.update(parts.coordinates ?? "");
  hash.update(":");
  hash.update(stableStringify(parts.params ?? {}));
  return hash.digest("hex");
};

export async function fetchOsrmWithCache(
  prisma: PrismaWithOsrm,
  request: OsrmRequest,
  options?: CacheOptions,
): Promise<{ cached: boolean; response: OsrmResponse }> {
  const paramsForFingerprint = { ...request.params };
  delete (paramsForFingerprint as any)?.maxAgeMinutes;

  const signature = fingerprint({
    service: request.service,
    profile: request.profile,
    coordinates: request.coordinates,
    params: paramsForFingerprint,
  });

  const cacheKey = { signature };
  const maxAgeMs = options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();

  const existing = await prisma.osrmCacheEntry.findUnique({ where: cacheKey });
  if (existing) {
    const freshByAge = maxAgeMs ? now - existing.fetchedAt.getTime() <= maxAgeMs : false;
    const notExpired = existing.expiresAt ? existing.expiresAt.getTime() > now : false;
    if (freshByAge || notExpired) {
      return {
        cached: true,
        response: {
          status: existing.statusCode ?? 200,
          ok: (existing.statusCode ?? 200) < 400,
          body: existing.payload,
          url: existing.url,
        },
      };
    }
  }

  const response = await fetchOsrm(request);
  const expiresAt = options?.expiresAt ?? (options?.maxAgeMinutes ? new Date(now + options.maxAgeMinutes * 60 * 1000) : null);
  const paramsHash = fingerprint({ service: request.service, profile: request.profile, coordinates: null, params: paramsForFingerprint });
  await prisma.osrmCacheEntry.upsert({
    where: cacheKey,
    create: {
      userId: null,
      service: request.service,
      profile: request.profile,
      coordinates: request.coordinates,
      params: request.params ?? {},
      paramsHash,
      signature,
      url: buildOsrmUrl(request),
      statusCode: response.status,
      payload: response.body,
      fetchedAt: new Date(),
      expiresAt,
    },
    update: {
      params: request.params ?? {},
      paramsHash,
      url: buildOsrmUrl(request),
      statusCode: response.status,
      payload: response.body,
      fetchedAt: new Date(),
      expiresAt,
    },
  });

  return { cached: false, response };
}
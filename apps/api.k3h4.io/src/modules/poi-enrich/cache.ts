import type { PrismaClient } from "@prisma/client";
import type { EnrichedPoi } from "./types";

const ONE_HOUR_MS = 60 * 60 * 1000;

export async function readCachedEnrichment(
  prisma: PrismaClient,
  id: string,
  includeHash: string,
): Promise<EnrichedPoi | null> {
  const cached = await prisma.poiEnrichmentCache.findUnique({ where: { id_includeHash: { id, includeHash } } });
  if (!cached) return null;
  if (cached.expiresAt && cached.expiresAt.getTime() <= Date.now()) return null;
  return cached.payload as EnrichedPoi;
}

export async function writeCachedEnrichment(
  prisma: PrismaClient,
  id: string,
  includeHash: string,
  payload: EnrichedPoi,
  ttlMs = ONE_HOUR_MS,
): Promise<void> {
  const now = Date.now();
  const expiresAt = new Date(now + ttlMs);
  await prisma.poiEnrichmentCache.upsert({
    where: { id_includeHash: { id, includeHash } },
    create: { id, includeHash, payload, fetchedAt: new Date(now), expiresAt },
    update: { payload, fetchedAt: new Date(now), expiresAt },
  });
}

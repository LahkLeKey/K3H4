import { type PrismaClient } from "@prisma/client";
import type { FastifyBaseLogger } from "fastify";

export const DEM_TTL_MS = Number(process.env.DEM_CACHE_TTL_MS ?? 1000 * 60 * 60 * 24 * 7); // 7 days
export const DEM_CACHE_MAX_BYTES = Number(process.env.DEM_CACHE_MAX_BYTES ?? 200_000_000); // 200 MB
export const DEM_CACHE_CLEAN_INTERVAL_MS = Number(process.env.DEM_CACHE_CLEAN_INTERVAL_MS ?? 1000 * 60 * 30); // 30 minutes

export const TERRAIN_PROVIDER = "maptiler";

export const demSignature = (provider: string, z: number, x: number, y: number, format: string) =>
  `${provider}:${z}/${x}/${y}:${format}`;

export async function cleanupDemCache(prisma: PrismaClient, log?: FastifyBaseLogger) {
  const now = new Date();
  const expired = await prisma.geoDemTileCache.deleteMany({ where: { expiresAt: { lt: now } } });

  const total = await prisma.geoDemTileCache.aggregate({ _sum: { byteLength: true } });
  const totalBytes = Number(total._sum.byteLength ?? 0);
  const maxBytes = Number.isFinite(DEM_CACHE_MAX_BYTES) ? DEM_CACHE_MAX_BYTES : 200_000_000;

  let evicted = 0;
  let evictedBytes = 0;

  if (totalBytes > maxBytes) {
    const victims = await prisma.geoDemTileCache.findMany({
      select: { id: true, byteLength: true },
      orderBy: [{ lastAccessed: "asc" }, { createdAt: "asc" }],
    });

    const ids: string[] = [];
    let running = totalBytes;
    for (const v of victims) {
      const bytes = Number(v.byteLength ?? 0);
      ids.push(v.id);
      running -= bytes;
      evictedBytes += bytes;
      if (running <= maxBytes) break;
    }

    if (ids.length > 0) {
      const res = await prisma.geoDemTileCache.deleteMany({ where: { id: { in: ids } } });
      evicted = res.count;
    }
  }

  if (log) {
    log.info({ expired: expired.count, evicted, evictedBytes }, "dem cache cleanup");
  }

  return { expired: expired.count, evicted, evictedBytes };
}

export function scheduleDemCacheCleanup(prisma: PrismaClient, log?: FastifyBaseLogger) {
  void cleanupDemCache(prisma, log).catch((err) => log?.error({ err }, "dem cache initial cleanup failed"));

  const interval = setInterval(() => {
    void cleanupDemCache(prisma, log).catch((err) => log?.error({ err }, "dem cache cleanup failed"));
  }, DEM_CACHE_CLEAN_INTERVAL_MS);

  return interval;
}

import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { cleanupDemCache, DEM_TTL_MS, demSignature, TERRAIN_PROVIDER } from "../services/geo-dem-cache";
import { type RecordTelemetryFn } from "./types";

const DEM_TILE_MAX_BYTES = Number(process.env.DEM_TILE_MAX_BYTES ?? 5_000_000); // 5 MB safety guard
const MAX_ZOOM = 16;

const decodeUserId = async (server: FastifyInstance, request: any) => {
  let userId: string | null = null;
  const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.trim().length > 0;
  if (!hasAuth) return null;
  try {
    await request.jwtVerify();
    userId = (request.user as { sub?: string })?.sub ?? null;
  } catch (err) {
    server.log.debug({ err }, "dem optional auth failed");
  }
  return userId;
};

export function registerDemRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get<{
    Params: { z: string; x: string; y: string; format?: string };
    Querystring: { provider?: string };
  }>(
    "/geo/dem/:z/:x/:y.:format",
    {
      schema: {
        summary: "Serve DEM tiles via MapTiler Terrain-RGB with cache",
        tags: ["geo"],
      },
    },
    async (request, reply) => {
      const params = request.params;
      const fmt = (params.format || "png").toLowerCase();
      if (!["png", "webp"].includes(fmt)) {
        return reply.status(400).send({ error: "format must be png or webp" });
      }

      const z = Number(params.z);
      const x = Number(params.x);
      const y = Number(params.y);
      if (![z, x, y].every((n) => Number.isInteger(n))) {
        return reply.status(400).send({ error: "z, x, y must be integers" });
      }
      if (z < 0 || z > MAX_ZOOM) {
        return reply.status(400).send({ error: `z must be between 0 and ${MAX_ZOOM}` });
      }

      const provider = (request.query?.provider || TERRAIN_PROVIDER).toLowerCase();
      if (provider !== TERRAIN_PROVIDER) {
        return reply.status(400).send({ error: "unsupported provider" });
      }

      const userId = await decodeUserId(server, request);
      const signature = demSignature(provider, z, x, y, fmt);
      const now = new Date();

      const cached = await prisma.geoDemTileCache.findUnique({ where: { signature } });
      if (cached && (!cached.expiresAt || cached.expiresAt > now) && cached.data) {
        await prisma.geoDemTileCache.update({
          where: { id: cached.id },
          data: { lastAccessed: now, userId: userId ?? cached.userId ?? null },
        });

        reply.header("Content-Type", `image/${fmt}`);
        reply.header("Cache-Control", cached.cacheControl ?? `public, max-age=${Math.floor(DEM_TTL_MS / 1000)}`);
        if (cached.etag) reply.header("ETag", cached.etag);
        reply.header("X-Cache", "HIT");
        await recordTelemetry(request, { eventType: "geo.dem.cached", source: "api", payload: { signature, provider } });
        return reply.send(Buffer.from(cached.data));
      }

      const apiKey = process.env.MAPTILER_API_KEY;
      if (!apiKey) return reply.status(500).send({ error: "MAPTILER_API_KEY missing" });

      const upstream = `https://api.maptiler.com/tiles/terrain-rgb/${z}/${x}/${y}.${fmt}?key=${apiKey}`;

      const upstreamRes = await fetch(upstream);
      if (!upstreamRes.ok) {
        const status = upstreamRes.status === 404 ? 404 : 502;
        return reply.status(status).send({ error: `terrain upstream ${upstreamRes.status}` });
      }

      const arrayBuf = await upstreamRes.arrayBuffer();
      if (arrayBuf.byteLength > DEM_TILE_MAX_BYTES) {
        return reply.status(502).send({ error: "terrain tile too large" });
      }

      const data = Buffer.from(arrayBuf);
      const cacheControl = upstreamRes.headers.get("cache-control") ?? `public, max-age=${Math.floor(DEM_TTL_MS / 1000)}`;
      const etag = upstreamRes.headers.get("etag") ?? undefined;
      const expiresAt = new Date(Date.now() + DEM_TTL_MS);

      await prisma.geoDemTileCache.upsert({
        where: { signature },
        update: {
          provider,
          source: "terrain-rgb",
          z,
          x,
          y,
          format: fmt,
          url: upstream,
          data,
          byteLength: data.byteLength,
          cacheControl,
          etag,
          expiresAt,
          fetchedAt: now,
          lastAccessed: now,
          userId,
        },
        create: {
          signature,
          provider,
          source: "terrain-rgb",
          z,
          x,
          y,
          format: fmt,
          url: upstream,
          data,
          byteLength: data.byteLength,
          cacheControl,
          etag,
          expiresAt,
          fetchedAt: now,
          lastAccessed: now,
          userId,
        },
      });

      void cleanupDemCache(prisma, server.log).catch((err) => server.log.error({ err }, "dem cache cleanup post-write failed"));
      await recordTelemetry(request, { eventType: "geo.dem.fetched", source: "api", payload: { signature, provider } });

      reply.header("Content-Type", `image/${fmt}`);
      reply.header("Cache-Control", cacheControl);
      if (etag) reply.header("ETag", etag);
      reply.header("X-Cache", "MISS");
      return reply.send(data);
    },
  );
}

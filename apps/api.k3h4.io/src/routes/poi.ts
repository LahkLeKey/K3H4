import { createHash } from "node:crypto";
import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { enqueueOverpass } from "../lib/overpass-queue";
import { type RecordTelemetryFn } from "./types";

type Bbox = { minLat: number; minLng: number; maxLat: number; maxLng: number };

type PoiMarker = {
  id: string;
  osmId: string;
  osmType: string;
  name: string | null;
  category: string | null;
  lat: number;
  lng: number;
  updatedAt: string;
};

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const DEFAULT_KINDS = ["restaurant", "cafe", "bar", "fast_food", "fuel", "bus_station", "train_station", "bank", "atm"];
const DEFAULT_LIMIT = 1500;
const MAX_FETCH = 5000;
const MAX_CLUSTER_IDS = 25;
const VIEW_STALE_MINUTES = 45;

const clampZoom = (value: number | undefined) => {
  if (!Number.isFinite(value)) return 14;
  return Math.min(22, Math.max(1, Math.round(value as number)));
};

const parseKinds = (raw: unknown) => {
  if (Array.isArray(raw)) return raw.map((k) => `${k}`.trim()).filter(Boolean);
  if (typeof raw === "string" && raw.trim().length > 0) return raw.split(",").map((k) => k.trim()).filter(Boolean);
  return DEFAULT_KINDS;
};

const parseBbox = (query: Record<string, unknown>): Bbox | null => {
  const bboxString = typeof query.bbox === "string" ? query.bbox : undefined;
  const parts = bboxString?.split(",").map((p) => Number(p.trim()));

  const minLng = Number.isFinite(parts?.[0]) ? (parts as number[])[0] : Number(query.minLng);
  const minLat = Number.isFinite(parts?.[1]) ? (parts as number[])[1] : Number(query.minLat);
  const maxLng = Number.isFinite(parts?.[2]) ? (parts as number[])[2] : Number(query.maxLng);
  const maxLat = Number.isFinite(parts?.[3]) ? (parts as number[])[3] : Number(query.maxLat);

  if (![minLat, minLng, maxLat, maxLng].every((val) => Number.isFinite(val))) return null;

  const boundedMinLat = Math.max(-90, Math.min(90, minLat));
  const boundedMaxLat = Math.max(-90, Math.min(90, maxLat));
  const boundedMinLng = Math.max(-180, Math.min(180, minLng));
  const boundedMaxLng = Math.max(-180, Math.min(180, maxLng));

  return {
    minLat: Math.min(boundedMinLat, boundedMaxLat),
    minLng: Math.min(boundedMinLng, boundedMaxLng),
    maxLat: Math.max(boundedMinLat, boundedMaxLat),
    maxLng: Math.max(boundedMinLng, boundedMaxLng),
  };
};

const cellSizeForZoom = (zoom: number) => {
  if (zoom <= 6) return 1.2;
  if (zoom <= 8) return 0.6;
  if (zoom <= 10) return 0.25;
  if (zoom <= 12) return 0.08;
  return 0.03;
};

const clusterize = (points: PoiMarker[], zoom: number) => {
  const shouldCluster = zoom < 13 || points.length > 750;
  if (!shouldCluster) return { items: points, clustered: false } as const;

  const cell = cellSizeForZoom(zoom);
  const buckets = new Map<
    string,
    { count: number; sumLat: number; sumLng: number; sample: PoiMarker; categories: Set<string>; ids: string[] }
  >();

  for (const poi of points) {
    const key = `${Math.floor(poi.lat / cell)}:${Math.floor(poi.lng / cell)}`;
    const bucket = buckets.get(key) ?? {
      count: 0,
      sumLat: 0,
      sumLng: 0,
      sample: poi,
      categories: new Set<string>(),
      ids: [],
    };

    bucket.count += 1;
    bucket.sumLat += poi.lat;
    bucket.sumLng += poi.lng;
    if (bucket.ids.length < MAX_CLUSTER_IDS) bucket.ids.push(poi.id);
    if (poi.category) bucket.categories.add(poi.category);
    if (bucket.count === 1) bucket.sample = poi;
    buckets.set(key, bucket);
  }

  const clustered = Array.from(buckets.entries()).map(([key, bucket]) => {
    if (bucket.count === 1) return { ...bucket.sample, cluster: false };
    return {
      cluster: true,
      id: `cluster:${key}`,
      lat: bucket.sumLat / bucket.count,
      lng: bucket.sumLng / bucket.count,
      count: bucket.count,
      sampleCategories: Array.from(bucket.categories).slice(0, 4),
      sampleIds: bucket.ids,
    };
  });

  return { items: clustered, clustered: true } as const;
};

const parseIncludeGeometry = (value: unknown) => `${value}`.toLowerCase() === "true" || value === true;

const viewSignature = (bounds: Bbox, zoom: number | null | undefined) => {
  const z = Number.isFinite(zoom) ? Math.round(zoom as number) : 0;
  return [bounds.minLat.toFixed(4), bounds.minLng.toFixed(4), bounds.maxLat.toFixed(4), bounds.maxLng.toFixed(4), z].join(":");
};

const serializeGeometry = (raw: unknown) => {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as any;
};

const buildOverpassQuery = (bounds: Bbox, kinds: string[]) => {
  const bboxClause = `${bounds.minLat},${bounds.minLng},${bounds.maxLat},${bounds.maxLng}`;
  const filters = kinds
    .map(
      (kind) =>
        `node[amenity=${kind}](${bboxClause});way[amenity=${kind}](${bboxClause});relation[amenity=${kind}](${bboxClause});`,
    )
    .join("\n");

  const query = `[out:json][timeout:25];(${filters});out center tags;`;
  const signature = `pois:${bboxClause}:${kinds.slice().sort().join(",")}`;
  const body = new URLSearchParams({ data: query }).toString();

  return { body, signature };
};

async function upsertOverpassElements(prisma: PrismaClient, elements: any[], runStarted: Date) {
  for (const el of elements) {
    const center = el.center ?? (Number.isFinite(el.lat) && Number.isFinite(el.lon) ? { lat: el.lat, lon: el.lon } : null);
    if (!center) continue;

    const osmType = typeof el.type === "string" && el.type.length > 0 ? el.type : "node";
    const osmId = BigInt(el.id);
    const category = el.tags?.amenity ?? el.tags?.shop ?? el.tags?.tourism ?? el.tags?.leisure ?? null;
    const name = el.tags?.name ?? category ?? "poi";

    const where: Prisma.PoiWhereUniqueInput = { poi_osm_composite: { osmType, osmId } };

    await prisma.poi.upsert({
      where,
      update: {
        name,
        category,
        latitude: new Prisma.Decimal(Number(center.lat).toFixed(6)),
        longitude: new Prisma.Decimal(Number(center.lon).toFixed(6)),
        tags: el.tags ?? {},
        source: "osm",
        lastSeenAt: runStarted,
      },
      create: {
        osmType,
        osmId,
        name,
        category,
        latitude: new Prisma.Decimal(Number(center.lat).toFixed(6)),
        longitude: new Prisma.Decimal(Number(center.lon).toFixed(6)),
        tags: el.tags ?? {},
        source: "osm",
        lastSeenAt: runStarted,
      },
    });
  }
}

export function registerPoiRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const listHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const bounds = parseBbox(request.query as Record<string, unknown>);
    if (!bounds) return reply.status(400).send({ error: "bbox is required as minLon,minLat,maxLon,maxLat" });

    const zoom = clampZoom(Number((request.query as Record<string, unknown>).zoom));

    const where = {
      latitude: { gte: bounds.minLat, lte: bounds.maxLat },
      longitude: { gte: bounds.minLng, lte: bounds.maxLng },
    };

    const loadPois = async () => {
      const total = await prisma.poi.count({ where });
      const limit = Number((request.query as Record<string, unknown>).limit);
      const normalizedLimit = Number.isFinite(limit) ? Math.trunc(limit) : DEFAULT_LIMIT;
      const take = total === 0 ? 0 : Math.max(1, Math.min(normalizedLimit, MAX_FETCH, total));
      const pois = await prisma.poi.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        take,
        select: { id: true, osmId: true, osmType: true, name: true, category: true, latitude: true, longitude: true, updatedAt: true },
      });
      return { total, pois } as const;
    };

    let { total, pois } = await loadPois();

    if (total === 0) {
      try {
        const kinds = DEFAULT_KINDS;
        const { body: overpassBody, signature: overpassSig } = buildOverpassQuery(bounds, kinds);
        const data = await enqueueOverpass(OVERPASS_URL, overpassBody, overpassSig);
        const elements = Array.isArray((data as any)?.elements) ? ((data as any).elements as any[]) : [];
        if (elements.length > 0) {
          await upsertOverpassElements(prisma, elements, new Date());
          ({ total, pois } = await loadPois());
        }
      } catch (err) {
        request.log.warn({ err }, "overpass sync after empty poi result failed");
      }
    }

    const markers: PoiMarker[] = pois.map((poi) => ({
      id: poi.id,
      osmId: poi.osmId.toString(),
      osmType: poi.osmType,
      name: poi.name,
      category: poi.category,
      lat: Number(poi.latitude),
      lng: Number(poi.longitude),
      updatedAt: poi.updatedAt.toISOString(),
    }));

    const { items, clustered } = clusterize(markers, zoom);
    const newest = pois[0]?.updatedAt ?? null;
    const etagBase = `${bounds.minLat}:${bounds.minLng}:${bounds.maxLat}:${bounds.maxLng}:${zoom}:${total}:${newest?.getTime() ?? 0}`;
    const etag = createHash("sha1").update(etagBase).digest("hex");

    if (request.headers["if-none-match"] === etag) return reply.status(304).send();

    reply.header("ETag", etag);
    reply.header("Cache-Control", "public, max-age=120, stale-while-revalidate=900");

    const userId = (request.user as { sub?: string } | undefined)?.sub ?? null;
    if (userId) {
      const now = new Date();
      const sig = viewSignature(bounds, zoom);
      const zoomBand = Math.round(zoom ?? 0);
      const poiIds = items.filter((i) => !("cluster" in i && i.cluster)).map((i) => i.id).slice(0, 500);
      const staleAfter = new Date(now.getTime() + VIEW_STALE_MINUTES * 60 * 1000);

      const existingView = await prisma.geoViewHistory.findUnique({ where: { geo_view_user_signature: { userId, signature: sig } } });

      await prisma.geoViewHistory.upsert({
        where: { geo_view_user_signature: { userId, signature: sig } },
        update: {
          lastViewedAt: now,
          viewCount: { increment: 1 },
          lastPoiIds: poiIds,
          lastPoiCount: items.length,
          staleAfter,
          zoomBand,
        },
        create: {
          userId,
          signature: sig,
          zoomBand,
          bboxMinLat: new Prisma.Decimal(bounds.minLat.toFixed(6)),
          bboxMinLng: new Prisma.Decimal(bounds.minLng.toFixed(6)),
          bboxMaxLat: new Prisma.Decimal(bounds.maxLat.toFixed(6)),
          bboxMaxLng: new Prisma.Decimal(bounds.maxLng.toFixed(6)),
          lastPoiIds: poiIds,
          lastPoiCount: items.length,
          firstViewedAt: now,
          lastViewedAt: now,
          staleAfter,
          viewCount: 1,
        },
      });

      const isStale = existingView?.staleAfter ? existingView.staleAfter < now : true;
      if (isStale) {
        void (async () => {
          try {
            const kinds = DEFAULT_KINDS;
            const { body: overpassBody } = buildOverpassQuery(bounds, kinds);
            const data = await enqueueOverpass(OVERPASS_URL, overpassBody, `pois:${sig}`);
            const elements = Array.isArray(data?.elements) ? (data.elements as any[]) : [];
            await upsertOverpassElements(prisma, elements, now);
          } catch (err) {
            request.log.debug({ err }, "stale poi refresh failed");
          }
        })();
      }
    }

    await recordTelemetry(request, {
      eventType: "poi.list",
      source: "api",
      payload: { zoom, total, returned: items.length, clustered },
    });

    return {
      items,
      total,
      returned: items.length,
      clustered,
      bbox: bounds,
      zoom,
    };
  };

  const metadataHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const bounds = parseBbox(request.query as Record<string, unknown>);
    if (!bounds) return reply.status(400).send({ error: "bbox is required as minLon,minLat,maxLon,maxLat" });

    const where = {
      latitude: { gte: bounds.minLat, lte: bounds.maxLat },
      longitude: { gte: bounds.minLng, lte: bounds.maxLng },
    };

    const [total, newest] = await Promise.all([
      prisma.poi.count({ where }),
      prisma.poi.findFirst({ where, orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
    ]);

    const categories = await prisma.poi.groupBy({
      by: ["category"],
      where: { ...where, category: { not: null } },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
      take: 12,
    });

    const etagBase = `${bounds.minLat}:${bounds.minLng}:${bounds.maxLat}:${bounds.maxLng}:${total}:${newest?.updatedAt?.getTime() ?? 0}`;
    const etag = createHash("sha1").update(etagBase).digest("hex");
    if (request.headers["if-none-match"] === etag) return reply.status(304).send();

    reply.header("ETag", etag);
    reply.header("Cache-Control", "public, max-age=300, stale-while-revalidate=1800");

    return {
      total,
      updatedAt: newest?.updatedAt ?? null,
      categories: categories.map((c) => ({ category: c.category ?? "unknown", count: c._count?.category ?? 0 })),
      bbox: bounds,
    };
  };

  const syncHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { bbox?: string; minLat?: number; minLng?: number; maxLat?: number; maxLng?: number; kinds?: string[] | string; pruneMissing?: boolean } | undefined;
    const bounds = parseBbox((body ?? {}) as Record<string, unknown>);
    if (!bounds) return reply.status(400).send({ error: "bbox is required as minLon,minLat,maxLon,maxLat" });

    const kinds = parseKinds(body?.kinds);
    const runStarted = new Date();

    try {
      const { body: overpassBody, signature } = buildOverpassQuery(bounds, kinds);
      const data = await enqueueOverpass(OVERPASS_URL, overpassBody, signature);
      const elements = Array.isArray(data?.elements) ? (data.elements as any[]) : [];

      let created = 0;
      let updated = 0;

      for (const el of elements) {
        const center = el.center ?? (Number.isFinite(el.lat) && Number.isFinite(el.lon) ? { lat: el.lat, lon: el.lon } : null);
        if (!center) continue;

        const osmType = typeof el.type === "string" && el.type.length > 0 ? el.type : "node";
        const osmId = BigInt(el.id);
        const category = el.tags?.amenity ?? el.tags?.shop ?? el.tags?.tourism ?? el.tags?.leisure ?? null;
        const name = el.tags?.name ?? category ?? "poi";

        const where: Prisma.PoiWhereUniqueInput = { poi_osm_composite: { osmType, osmId } };
        const existing = await prisma.poi.findUnique({ where });

        if (existing) updated += 1;
        else created += 1;

        await prisma.poi.upsert({
          where,
          update: {
            name,
            category,
            latitude: new Prisma.Decimal(Number(center.lat).toFixed(6)),
            longitude: new Prisma.Decimal(Number(center.lon).toFixed(6)),
            tags: el.tags ?? {},
            source: "osm",
            lastSeenAt: runStarted,
          },
          create: {
            osmType,
            osmId,
            name,
            category,
            latitude: new Prisma.Decimal(Number(center.lat).toFixed(6)),
            longitude: new Prisma.Decimal(Number(center.lon).toFixed(6)),
            tags: el.tags ?? {},
            source: "osm",
            lastSeenAt: runStarted,
          },
        });
      }

      let pruned = 0;
      if (body?.pruneMissing) {
        const pruneResult = await prisma.poi.deleteMany({
          where: {
            latitude: { gte: bounds.minLat, lte: bounds.maxLat },
            longitude: { gte: bounds.minLng, lte: bounds.maxLng },
            lastSeenAt: { lt: runStarted },
          },
        });
        pruned = pruneResult.count;
      }

      await recordTelemetry(request, {
        eventType: "poi.sync",
        source: "api",
        payload: {
          bbox: bounds,
          kinds,
          fetched: elements.length,
          created,
          updated,
          pruned,
        },
      });

      return { ok: true, fetched: elements.length, created, updated, pruned };
    } catch (err) {
      request.log.warn({ err }, "poi sync failed");
      return reply.status(502).send({ error: err instanceof Error ? err.message : "Overpass unavailable" });
    }
  };

  const authOpts = { preHandler: server.authenticate };

  const detailHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id?: string } | undefined;
    const id = params?.id;
    const includeGeometry = parseIncludeGeometry((request.query as Record<string, unknown>).includeGeometry);
    if (!id) return reply.status(400).send({ error: "id is required" });

    const poi = await prisma.poi.findUnique({
      where: { id },
      include: {
        building: {
          select: {
            id: true,
            osmId: true,
            type: true,
            addressHouseNumber: true,
            addressStreet: true,
            addressCity: true,
            addressPostcode: true,
            addressState: true,
            addressCountry: true,
            geometry: true,
          },
        },
      },
    });

    if (!poi) return reply.status(404).send({ error: "poi not found" });

    const geometry = includeGeometry && poi.building?.geometry ? serializeGeometry(poi.building.geometry) : undefined;

    const building = poi.building
      ? {
          id: poi.building.id,
          osmId: poi.building.osmId !== null && poi.building.osmId !== undefined ? Number(poi.building.osmId) : null,
          type: poi.building.type,
          addressHouseNumber: poi.building.addressHouseNumber,
          addressStreet: poi.building.addressStreet,
          addressCity: poi.building.addressCity,
          addressPostcode: poi.building.addressPostcode,
          addressState: poi.building.addressState,
          addressCountry: poi.building.addressCountry,
          geometry: includeGeometry ? geometry ?? null : undefined,
        }
      : null;

    return {
      id: poi.id,
      osmId: poi.osmId.toString(),
      osmType: poi.osmType,
      name: poi.name,
      category: poi.category,
      latitude: Number(poi.latitude),
      longitude: Number(poi.longitude),
      tags: poi.tags,
      source: poi.source,
      lastSeenAt: poi.lastSeenAt,
      createdAt: poi.createdAt,
      updatedAt: poi.updatedAt,
      building,
    };
  };

  // Public variants (keep compatibility with current unauthenticated map probes)
  server.get("/pois", listHandler);
  server.get("/pois/metadata", metadataHandler);
  server.post("/pois/sync", authOpts, syncHandler);
  server.get("/pois/:id", detailHandler);

  // Authenticated variants for the signed-in map experience
  server.get("/api/pois", authOpts, listHandler);
  server.get("/api/pois/metadata", authOpts, metadataHandler);
  server.post("/api/pois/sync", authOpts, syncHandler);
  server.get("/api/pois/:id", authOpts, detailHandler);
}

import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { enqueueOverpass } from "../lib/overpass-queue";
import { type RecordTelemetryFn } from "./types";

const OSRM_BASE = process.env.OSRM_URL || "https://router.project-osrm.org";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const ROUTE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const POI_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const GEO_POI_RATE_LIMIT_MAX = Number(process.env.GEO_POI_RATE_LIMIT_MAX ?? 30);
const GEO_POI_RATE_LIMIT_WINDOW = process.env.GEO_POI_RATE_LIMIT_WINDOW || "1 minute";

const clampDecimals = (value: number, places = 5) => Number(value.toFixed(places));

const routeSignature = (o: { lat: number; lng: number }, d: { lat: number; lng: number }) =>
  [clampDecimals(o.lat), clampDecimals(o.lng), clampDecimals(d.lat), clampDecimals(d.lng)].join(":");

const poiSignature = (center: { lat: number; lng: number }, radiusM: number, kinds: string[]) => {
  const sortedKinds = [...kinds].sort().join(",");
  return [clampDecimals(center.lat), clampDecimals(center.lng), radiusM, sortedKinds].join(":");
};

async function fetchOsrmRoute(origin: { lat: number; lng: number }, dest: { lat: number; lng: number }) {
  const coords = `${origin.lng},${origin.lat};${dest.lng},${dest.lat}`;
  const res = await fetch(`${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson`);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = (await res.json()) as { routes?: Array<{ distance?: number; duration?: number; geometry?: any }> };
  const route = data.routes?.[0];
  if (!route?.distance || !route?.duration) throw new Error("Route unavailable");
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: Math.round(route.duration / 60),
    geojson: route.geometry,
  };
}

async function fetchOverpass(center: { lat: number; lng: number }, radiusM: number, kinds: string[], signature: string) {
  const sortedKinds = [...kinds].sort();
  const filters = sortedKinds.map((k) => `node[amenity=${k}](around:${radiusM},${center.lat},${center.lng});`).join("\n");
  const query = `[out:json][timeout:10];(${filters});out center 50;`;
  const body = new URLSearchParams({ data: query }).toString();
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  return (data?.elements ?? []) as any[];
}

export function registerGeoRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const db = prisma as any;

  const persistUserGeoPrefs = async (userId: string | null, prefs: {
    center?: { lat: number; lng: number } | null;
    view?: { zoom?: number | null; bearing?: number | null; pitch?: number | null };
    poi?: { signature: string; kinds: string[]; radiusM: number; count: number; fetchedAt: Date };
  }) => {
    if (!userId) return;

    const existing = await prisma.userPreference.findUnique({ where: { userId } });
    const nextCenterLat = prefs.center?.lat ?? existing?.lastCenterLat ?? null;
    const nextCenterLng = prefs.center?.lng ?? existing?.lastCenterLng ?? null;
    const nextZoom = prefs.view?.zoom ?? existing?.lastZoom ?? null;
    const nextBearing = prefs.view?.bearing ?? existing?.lastBearing ?? null;
    const nextPitch = prefs.view?.pitch ?? existing?.lastPitch ?? null;

    await prisma.userPreference.upsert({
      where: { userId },
      update: {
        lastCenterLat: nextCenterLat !== null ? new Prisma.Decimal(nextCenterLat.toFixed(6)) : null,
        lastCenterLng: nextCenterLng !== null ? new Prisma.Decimal(nextCenterLng.toFixed(6)) : null,
        lastZoom: nextZoom,
        lastBearing: nextBearing,
        lastPitch: nextPitch,
        lastPoiSignature: prefs.poi?.signature ?? existing?.lastPoiSignature ?? null,
        lastPoiKinds: prefs.poi ? prefs.poi.kinds.join(",") : existing?.lastPoiKinds ?? null,
        lastPoiRadiusM: prefs.poi?.radiusM ?? existing?.lastPoiRadiusM ?? null,
        lastPoiCount: prefs.poi?.count ?? existing?.lastPoiCount ?? null,
        lastPoiFetchedAt: prefs.poi?.fetchedAt ?? existing?.lastPoiFetchedAt ?? null,
      },
      create: {
        userId,
        lastCenterLat: nextCenterLat !== null ? new Prisma.Decimal(nextCenterLat.toFixed(6)) : null,
        lastCenterLng: nextCenterLng !== null ? new Prisma.Decimal(nextCenterLng.toFixed(6)) : null,
        lastZoom: nextZoom,
        lastBearing: nextBearing,
        lastPitch: nextPitch,
        lastPoiSignature: prefs.poi?.signature ?? null,
        lastPoiKinds: prefs.poi ? prefs.poi.kinds.join(",") : null,
        lastPoiRadiusM: prefs.poi?.radiusM ?? null,
        lastPoiCount: prefs.poi?.count ?? null,
        lastPoiFetchedAt: prefs.poi?.fetchedAt ?? null,
      },
    });
  };
  server.get(
    "/geo/route",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const query = request.query as any;
      const originLat = Number(query.originLat);
      const originLng = Number(query.originLng);
      const destinationLat = Number(query.destinationLat);
      const destinationLng = Number(query.destinationLng);
      if (![originLat, originLng, destinationLat, destinationLng].every((n) => Number.isFinite(n))) {
        return reply.status(400).send({ error: "originLat, originLng, destinationLat, destinationLng are required" });
      }

      const signature = routeSignature({ lat: originLat, lng: originLng }, { lat: destinationLat, lng: destinationLng });
      const now = new Date();

      const cached = await db.geoRouteCache.findFirst({ where: { signature, expiresAt: { gt: now } } });
      if (cached) {
        await recordTelemetry(request, { eventType: "geo.route.cached", source: "api", payload: { signature } });
        return {
          distanceKm: Number(cached.distanceKm),
          durationMinutes: cached.durationMinutes,
          geojson: cached.geojson,
          cached: true,
        };
      }

      try {
        const osrm = await fetchOsrmRoute({ lat: originLat, lng: originLng }, { lat: destinationLat, lng: destinationLng });
        await db.geoRouteCache.upsert({
          where: { signature },
          update: {
            distanceKm: new Prisma.Decimal(osrm.distanceKm.toFixed(4)),
            durationMinutes: osrm.durationMinutes,
            geojson: osrm.geojson,
            expiresAt: new Date(Date.now() + ROUTE_TTL_MS),
            userId,
          },
          create: {
            signature,
            provider: "osrm",
            originLat: new Prisma.Decimal(originLat.toFixed(6)),
            originLng: new Prisma.Decimal(originLng.toFixed(6)),
            destinationLat: new Prisma.Decimal(destinationLat.toFixed(6)),
            destinationLng: new Prisma.Decimal(destinationLng.toFixed(6)),
            distanceKm: new Prisma.Decimal(osrm.distanceKm.toFixed(4)),
            durationMinutes: osrm.durationMinutes,
            geojson: osrm.geojson,
            expiresAt: new Date(Date.now() + ROUTE_TTL_MS),
            userId,
          },
        });

        await recordTelemetry(request, { eventType: "geo.route.fetched", source: "api", payload: { signature } });
        return { ...osrm, cached: false };
      } catch (err) {
        return reply.status(502).send({ error: err instanceof Error ? err.message : "OSRM unavailable" });
      }
    },
  );

  server.get(
    "/geo/pois",
    {
      rateLimit: { max: GEO_POI_RATE_LIMIT_MAX, timeWindow: GEO_POI_RATE_LIMIT_WINDOW },
    },
    async (request, reply) => {
      const query = request.query as any;
      const lat = Number(query.lat);
      const lng = Number(query.lng);
      const radiusM = Number(query.radiusM ?? 1800);
      const kinds = typeof query.kinds === "string" && query.kinds.trim().length > 0 ? query.kinds.split(",") : ["bank", "atm", "restaurant", "cafe", "fuel", "bus_station", "train_station"];

      let userId: string | null = null;
      const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.trim().length > 0;
      if (hasAuth) {
        try {
          await request.jwtVerify();
          userId = (request.user as { sub?: string })?.sub ?? null;
        } catch (err) {
          request.log.debug({ err }, "geo pois optional auth failed");
        }
      }

      if (![lat, lng, radiusM].every((n) => Number.isFinite(n))) {
        return reply.status(400).send({ error: "lat, lng, radiusM are required" });
      }

      const signature = poiSignature({ lat, lng }, radiusM, kinds);
      const now = new Date();

      const cached = await db.geoPoiCache.findFirst({ where: { signature, expiresAt: { gt: now } } });
      if (cached) {
        const expiresAt = cached.expiresAt instanceof Date ? cached.expiresAt : new Date(cached.expiresAt);
        await prisma.geoQueryCache.upsert({
          where: { signature },
          update: { type: "poi", params: { lat, lng, radiusM, kinds }, payload: { pois: cached.pois }, count: cached.count, expiresAt, userId },
          create: { type: "poi", signature, params: { lat, lng, radiusM, kinds }, payload: { pois: cached.pois }, count: cached.count, expiresAt, userId },
        });
        await persistUserGeoPrefs(userId, {
          center: { lat, lng },
          poi: { signature, kinds, radiusM, count: cached.count, fetchedAt: expiresAt },
        });
        await recordTelemetry(request, { eventType: "geo.poi.cached", source: "api", payload: { signature, count: cached.count } });
        return { pois: cached.pois, count: cached.count, cached: true };
      }

      try {
        const elements = await fetchOverpass({ lat, lng }, radiusM, kinds, signature);
        const pois = elements.map((feat) => ({
          id: `${feat.id}`,
          name: feat.tags?.name ?? feat.tags?.amenity ?? "poi",
          kind: feat.tags?.amenity,
          lat: feat.lat,
          lng: feat.lon,
        }));

        await db.geoPoiCache.upsert({
          where: { signature },
          update: {
            pois,
            count: pois.length,
            expiresAt: new Date(Date.now() + POI_TTL_MS),
            userId,
          },
          create: {
            signature,
            centerLat: new Prisma.Decimal(lat.toFixed(6)),
            centerLng: new Prisma.Decimal(lng.toFixed(6)),
            radiusM,
            kinds: kinds.join(","),
            pois,
            count: pois.length,
            expiresAt: new Date(Date.now() + POI_TTL_MS),
            userId,
          },
        });

        const expiresAt = new Date(Date.now() + POI_TTL_MS);
        await prisma.geoQueryCache.upsert({
          where: { signature },
          update: { type: "poi", params: { lat, lng, radiusM, kinds }, payload: { pois }, count: pois.length, expiresAt, userId },
          create: { type: "poi", signature, params: { lat, lng, radiusM, kinds }, payload: { pois }, count: pois.length, expiresAt, userId },
        });

        await persistUserGeoPrefs(userId, {
          center: { lat, lng },
          poi: { signature, kinds, radiusM, count: pois.length, fetchedAt: expiresAt },
        });

        await recordTelemetry(request, { eventType: "geo.poi.fetched", source: "api", payload: { signature, count: pois.length } });
        return { pois, count: pois.length, cached: false };
      } catch (err) {
        // Fall back to the most recent cache (even if expired) so the UI degrades gracefully.
        const stale = await db.geoPoiCache.findFirst({ where: { signature }, orderBy: { expiresAt: "desc" } });
        if (stale) {
          await recordTelemetry(request, { eventType: "geo.poi.stale", source: "api", payload: { signature, count: stale.count ?? 0 } });
          return { pois: stale.pois, count: stale.count, cached: true, stale: true };
        }

        request.log.warn({ err, signature }, "geo pois fetch failed");
        return reply.status(502).send({ error: err instanceof Error ? err.message : "Overpass unavailable" });
      }
    },
  );

  server.get(
    "/geo/history",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const limitParam = Number((request.query as any)?.limit ?? 40);
      const take = Number.isFinite(limitParam) ? Math.min(Math.max(1, Math.trunc(limitParam)), 200) : 40;

      const rows = await prisma.geoViewHistory.findMany({
        where: { userId },
        orderBy: { lastViewedAt: "desc" },
        take,
      });

      const allPoiIds = Array.from(new Set(rows.flatMap((r) => (Array.isArray(r.lastPoiIds) ? (r.lastPoiIds as string[]) : []) )));
      const pois = allPoiIds.length
        ? await prisma.poi.findMany({
            where: { id: { in: allPoiIds } },
            select: { id: true, name: true, category: true, latitude: true, longitude: true },
          })
        : [];
      const poiMap = new Map(pois.map((p) => [p.id, p]));

      return rows.map((row) => ({
        id: row.id,
        signature: row.signature,
        zoomBand: row.zoomBand,
        bbox: {
          minLat: Number(row.bboxMinLat),
          minLng: Number(row.bboxMinLng),
          maxLat: Number(row.bboxMaxLat),
          maxLng: Number(row.bboxMaxLng),
        },
        lastPoiIds: row.lastPoiIds ?? [],
        lastPoiCount: row.lastPoiCount ?? 0,
        pois: (Array.isArray(row.lastPoiIds) ? (row.lastPoiIds as string[]) : [])
          .map((id) => poiMap.get(id))
          .filter(Boolean)
          .map((p) => ({
            id: p!.id,
            name: p!.name,
            category: p!.category,
            lat: Number(p!.latitude),
            lng: Number(p!.longitude),
          })),
        firstViewedAt: row.firstViewedAt,
        lastViewedAt: row.lastViewedAt,
        viewCount: row.viewCount,
        staleAfter: row.staleAfter,
      }));
    },
  );

  server.get(
    "/geo/prefs",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const now = new Date();

      const pref = await prisma.userPreference.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      const view = pref.lastCenterLat && pref.lastCenterLng
        ? {
            center: { lat: Number(pref.lastCenterLat), lng: Number(pref.lastCenterLng) },
            zoom: pref.lastZoom ?? null,
            bearing: pref.lastBearing ?? null,
            pitch: pref.lastPitch ?? null,
          }
        : null;

      let poi: null | {
        signature: string;
        kinds: string[];
        radiusM: number | null;
        count: number | null;
        cached: boolean;
        fetchedAt: Date | null;
        pois?: any;
      } = null;

      if (pref.lastPoiSignature) {
        const kindsFromPref = pref.lastPoiKinds ? pref.lastPoiKinds.split(",").filter(Boolean) : [];
        const geoQuery = await prisma.geoQueryCache.findUnique({ where: { signature: pref.lastPoiSignature } });
        const stillValid = geoQuery && geoQuery.expiresAt > now;
        if (stillValid) {
          poi = {
            signature: pref.lastPoiSignature,
            kinds: kindsFromPref,
            radiusM: pref.lastPoiRadiusM ?? null,
            count: pref.lastPoiCount ?? geoQuery.count ?? null,
            cached: true,
            fetchedAt: pref.lastPoiFetchedAt ?? geoQuery.expiresAt,
            pois: (geoQuery.payload as any)?.pois ?? geoQuery.payload ?? null,
          };
        } else {
          const poiCache = await prisma.geoPoiCache.findUnique({ where: { signature: pref.lastPoiSignature } });
          if (poiCache && poiCache.expiresAt > now) {
            poi = {
              signature: pref.lastPoiSignature,
              kinds: kindsFromPref,
              radiusM: pref.lastPoiRadiusM ?? null,
              count: pref.lastPoiCount ?? poiCache.count ?? null,
              cached: true,
              fetchedAt: pref.lastPoiFetchedAt ?? poiCache.expiresAt,
              pois: poiCache.pois,
            };
          }
        }
      }

      return { view, poi };
    },
  );

  server.post(
    "/geo/prefs",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        center?: { lat?: number; lng?: number };
        view?: { zoom?: number; bearing?: number; pitch?: number };
        poi?: { signature?: string; kinds?: string[]; radiusM?: number; count?: number; expiresAtMs?: number; pois?: any[] };
      };

      const centerLat = body.center?.lat;
      const centerLng = body.center?.lng;
      if (centerLat !== undefined && !Number.isFinite(centerLat)) return reply.status(400).send({ error: "center.lat must be a number" });
      if (centerLng !== undefined && !Number.isFinite(centerLng)) return reply.status(400).send({ error: "center.lng must be a number" });

      const zoom = body.view?.zoom;
      const bearing = body.view?.bearing;
      const pitch = body.view?.pitch;
      if (zoom !== undefined && !Number.isFinite(zoom)) return reply.status(400).send({ error: "view.zoom must be a number" });
      if (bearing !== undefined && !Number.isFinite(bearing)) return reply.status(400).send({ error: "view.bearing must be a number" });
      if (pitch !== undefined && !Number.isFinite(pitch)) return reply.status(400).send({ error: "view.pitch must be a number" });

      const poiSig = body.poi?.signature;
      const poiKinds = body.poi?.kinds ?? [];
      const poiRadiusM = body.poi?.radiusM;
      const poiCount = body.poi?.count;
      const poiExpiresAt = body.poi?.expiresAtMs ? new Date(body.poi.expiresAtMs) : null;

      await persistUserGeoPrefs(userId, {
        center: centerLat !== undefined && centerLng !== undefined ? { lat: centerLat, lng: centerLng } : undefined,
        view: { zoom: zoom ?? null, bearing: bearing ?? null, pitch: pitch ?? null },
        poi:
          poiSig && Number.isFinite(poiRadiusM)
            ? { signature: poiSig, kinds: poiKinds, radiusM: poiRadiusM as number, count: poiCount ?? 0, fetchedAt: poiExpiresAt ?? new Date() }
            : undefined,
      });

      if (poiSig && Array.isArray(body.poi?.pois) && poiExpiresAt) {
        await prisma.geoQueryCache.upsert({
          where: { signature: poiSig },
          update: {
            type: "poi",
            params: { lat: centerLat ?? null, lng: centerLng ?? null, radiusM: poiRadiusM ?? null, kinds: poiKinds },
            payload: { pois: body.poi?.pois },
            count: poiCount ?? (body.poi?.pois?.length ?? null),
            expiresAt: poiExpiresAt,
            userId,
          },
          create: {
            type: "poi",
            signature: poiSig,
            params: { lat: centerLat ?? null, lng: centerLng ?? null, radiusM: poiRadiusM ?? null, kinds: poiKinds },
            payload: { pois: body.poi?.pois },
            count: poiCount ?? (body.poi?.pois?.length ?? null),
            expiresAt: poiExpiresAt,
            userId,
          },
        });
      }

      await recordTelemetry(request, { eventType: "geo.prefs.update", source: "api" });
      return { ok: true };
    },
  );

  // Client geo/POI status logging for telemetry/loading bars
  server.post(
    "/geo/status",
    async (request, reply) => {
      const body = request.body as {
        status?: string;
        poiStatus?: string;
        centerLat?: number;
        centerLng?: number;
        error?: string;
      };

      const status = body?.status?.trim();
      if (!status) return reply.status(400).send({ error: "status is required" });

      const centerLat = typeof body.centerLat === "number" && Number.isFinite(body.centerLat) ? body.centerLat : null;
      const centerLng = typeof body.centerLng === "number" && Number.isFinite(body.centerLng) ? body.centerLng : null;

      let userId: string | null = null;
      const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.length > 0;
      if (hasAuth) {
        try {
          await request.jwtVerify();
          userId = (request.user as { sub?: string })?.sub ?? null;
        } catch (err) {
          // ignore auth failures; status logging is allowed unauthenticated
        }
      }

      try {
        await prisma.geoStatusLog.create({
          data: {
            userId,
            status,
            poiStatus: body?.poiStatus?.trim() || null,
            centerLat: centerLat !== null ? new Prisma.Decimal(centerLat.toFixed(6)) : null,
            centerLng: centerLng !== null ? new Prisma.Decimal(centerLng.toFixed(6)) : null,
            error: body?.error?.slice(0, 512) || null,
            userAgent: request.headers["user-agent"]?.toString().slice(0, 512) ?? null,
          },
        });

        await recordTelemetry(request, {
          eventType: "geo.status",
          source: "api",
          payload: {
            status,
            poiStatus: body?.poiStatus,
            hasCenter: Boolean(centerLat !== null && centerLng !== null),
          },
        });

        return { ok: true };
      } catch (err) {
        request.log.error({ err }, "geo status log failed");
        return reply.status(500).send({ error: "unable to log status" });
      }
    },
  );
}

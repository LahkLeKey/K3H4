import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { withTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";
import { enrichPoi } from "../modules/poi-enrich/enrich";

const MAP_STYLE_PATH = "/maps/hybrid/style.json";
const VECTOR_TILE_PATH = "/tiles/v3/{z}/{x}/{y}.pbf";
const TERRAIN_TILE_PATH = "/tiles/terrain-rgb-v2/{z}/{x}/{y}.png";

type BootstrapBody = {
  includePrefs?: boolean;
  includeHistory?: boolean;
  includeMap?: boolean;
  historyLimit?: number;
  viewport?: { center?: { lat: number; lng: number }; radiusM?: number; kinds?: string[] | string };
  selectedPoi?: { id?: string; includeGeometry?: boolean };
};

const inflight = new Map<string, Promise<any>>();

const coalesce = async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;
  const p = fn().finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
};

const makePoiSignature = (center: { lat: number; lng: number }, radiusM: number, kinds: string[]) => {
  const k = [...kinds].sort().join(",");
  return `${center.lat.toFixed(5)}:${center.lng.toFixed(5)}:${Math.round(radiusM)}:${k}`;
};

export function registerFrontendRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const handler = async (request: any, reply: any) => {
    const userId = (request.user as { sub?: string } | undefined)?.sub ?? null;
    const isGet = request.method === "GET";
    const query = (isGet ? request.query : {}) as Record<string, unknown>;
    const body = (!isGet ? (request.body as BootstrapBody | undefined) : undefined) ?? {};

    const includePrefs = isGet ? query.includePrefs !== "false" : body.includePrefs ?? true;
    const includeHistory = isGet ? query.includeHistory !== "false" : body.includeHistory ?? true;
    const includeMap = isGet ? query.includeMap !== "false" : body.includeMap ?? true;
    const historyLimitRaw = isGet ? query.historyLimit : body.historyLimit;
    const historyLimit = Number(historyLimitRaw ?? 80);
    const viewport = isGet ? undefined : body.viewport;
    const selectedPoi = isGet ? undefined : body.selectedPoi;

    const now = new Date();
    const payload: Record<string, unknown> = { ok: true };

    if (includeMap) {
      payload.map = {
        stylePath: MAP_STYLE_PATH,
        vectorTilePath: VECTOR_TILE_PATH,
        terrainTilePath: TERRAIN_TILE_PATH,
      };
    }

    if (includePrefs && userId) {
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
            count: geoQuery.count ?? null,
            cached: true,
            fetchedAt: geoQuery.expiresAt,
            pois: (geoQuery.payload as any)?.pois ?? null,
          };
        }
      }

      payload.prefs = { view, poi };
    }

    if (includeHistory && userId) {
      const safeLimit = Number.isFinite(historyLimit) ? Math.min(Math.max(1, Math.trunc(historyLimit)), 200) : 40;
      const rows = await prisma.geoViewHistory.findMany({
        where: { userId },
        orderBy: { lastViewedAt: "desc" },
        take: safeLimit,
      });

      const allPoiIds = Array.from(new Set(rows.flatMap((r) => (Array.isArray(r.lastPoiIds) ? (r.lastPoiIds as string[]) : []))));
      const pois = allPoiIds.length
        ? await prisma.poi.findMany({
            where: { id: { in: allPoiIds } },
            select: { id: true, name: true, category: true, latitude: true, longitude: true },
          })
        : [];
      const poiMap = new Map(pois.map((p) => [p.id, p]));

      payload.history = rows.map((row) => ({
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
    }

    if (viewport?.center && Number.isFinite(viewport.center.lat) && Number.isFinite(viewport.center.lng) && Number.isFinite(viewport.radiusM ?? 0)) {
      const kindsArr = Array.isArray(viewport.kinds)
        ? viewport.kinds.filter(Boolean).map(String)
        : typeof viewport.kinds === "string" && viewport.kinds.trim().length > 0
          ? viewport.kinds.split(/[|,]/).map((s) => s.trim()).filter(Boolean)
          : ["restaurant", "cafe", "bar", "fast_food", "fuel", "bank", "atm", "bus_station", "train_station"];

      const signature = makePoiSignature(viewport.center, viewport.radiusM ?? 1800, kindsArr);
      const cached = await coalesce(`geoQueryCache:${signature}`, async () => {
        return await prisma.geoQueryCache.findUnique({ where: { signature } });
      });

      if (cached) {
        payload.viewportPois = {
          signature,
          kinds: kindsArr,
          radiusM: viewport.radiusM ?? 1800,
          count: cached.count ?? null,
          cached: cached.expiresAt > now,
          expiresAt: cached.expiresAt,
          pois: (cached.payload as any)?.pois ?? null,
        };
      }
    }

    if (selectedPoi?.id) {
      const include = {
        address: true,
        contact: true,
        openingHours: true,
        fuel: true,
        accessibility: true,
        building: Boolean(selectedPoi.includeGeometry),
        route: false,
        routeGeometry: false,
        photos: true,
        description: true,
      };

      const enriched = await enrichPoi(prisma, { type: "node", id: Number(selectedPoi.id) }, include, null, "driving");
      payload.selectedPoi = enriched;
    }

    const rt = withTelemetryBase(recordTelemetry, request);
    await rt({
      eventType: "frontend.map.bootstrap",
      source: "api",
      payload: {
        includePrefs,
        includeHistory,
        includeMap,
        historyLimit: Number.isFinite(historyLimit) ? historyLimit : null,
        viewportRequested: Boolean(viewport?.center),
        selectedPoiRequested: Boolean(selectedPoi?.id),
      },
    });
    return payload;
  };

  server.get("/frontend/map/bootstrap", handler);
  server.post("/frontend/map/bootstrap", handler);
}

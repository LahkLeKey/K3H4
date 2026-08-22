import {type PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {enqueueOverpass} from '../../lib/overpass-queue';
import {readGeoPoiCache, readGeoPoiCacheStale, readGeoQueryCache, readGeoRouteCache, readGeoViewEntry, readGeoViewHistory, writeGeoPoiCache, writeGeoQueryCache, writeGeoRouteCache, writeGeoViewEntry} from '../../services/geo-cache';
import {readUserPreferencesByActor, updateUserPreferencesForUser, type UserPreferencePatch} from '../../services/user-preferences';
import {createGeoCoreKit, type FindGeoPoisQuery, type GeoCoreHost, type GeoPoi, type GeoPoiCache, type GeoRoute, type MapHistoryRecord, type MapPreferencePatch, type UpdateMapPreferencesCommand} from './index';

const OSRM_BASE = process.env.OSRM_URL || 'https://router.project-osrm.org';
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ?
  value as Record<string, unknown> :
  {};

const cachedPois = (value: unknown): GeoPoi[] => {
  const record = asRecord(value);
  const pois = Array.isArray(record.pois) ? record.pois : value;
  return Array.isArray(pois) ? pois as GeoPoi[] : [];
};

const fetchOsrmRoute = async (
    origin: {lat: number; lng: number},
    destination: {lat: number; lng: number}): Promise<GeoRoute> => {
  const coordinates =
      `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  const response = await fetch(
      `${OSRM_BASE}/route/v1/driving/${coordinates}?overview=full&geometries=geojson`);
  if (!response.ok) throw new Error(`OSRM ${response.status}`);
  const data = await response.json() as {
    routes?: Array<{
      distance?: number;
      duration?: number;
      geometry?: unknown;
    }>;
  };
  const route = data.routes?.[0];
  if (!route?.distance || !route?.duration) throw new Error('Route unavailable');
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: Math.round(route.duration / 60),
    geojson: route.geometry,
  };
};

const fetchOverpassPois = async (
    center: {lat: number; lng: number}, radiusM: number, kinds: string[],
    signature: string): Promise<GeoPoi[]> => {
  const filters = [...kinds]
                      .sort()
                      .map(
                          (kind) =>
                              `node[amenity=${kind}](around:${radiusM},${center.lat},${center.lng});`)
                      .join('\n');
  const query = `[out:json][timeout:10];(${filters});out center 50;`;
  const body = new URLSearchParams({data: query}).toString();
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  const elements = Array.isArray(data?.elements) ? data.elements : [];
  return elements.map((element: any) => ({
    id: `${element.id}`,
    name: element.tags?.name ?? element.tags?.amenity ?? 'poi',
    kind: element.tags?.amenity,
    lat: element.lat,
    lng: element.lon,
  }));
};

export const createPrismaGeoCoreHost =
    (prisma: PrismaClient): GeoCoreHost => ({
      now: () => new Date(),
      async findRoute(actorId, signature) {
        const cached = await readGeoRouteCache(prisma, actorId, signature);
        return cached ? {
          distanceKm: Number(cached.distanceKm),
          durationMinutes: cached.durationMinutes,
          geojson: cached.geojson,
        } :
                        null;
      },
      async saveRoute(actorId, signature, route, fetchedAt) {
        await writeGeoRouteCache(prisma, actorId, signature, {
          signature,
          ...route,
          fetchedAt,
        });
      },
      fetchRoute: fetchOsrmRoute,
      async findPois(actorId, signature) {
        const cached = await readGeoPoiCache(prisma, actorId, signature);
        return cached ? {
          pois: cached.pois as GeoPoi[],
          count: cached.count,
          fetchedAt: cached.fetchedAt,
          expiresAt: cached.expiresAt,
        } :
                        null;
      },
      async findStalePois(actorId, signature) {
        const cached = await readGeoPoiCacheStale(prisma, actorId, signature);
        return cached ? {
          pois: cached.pois as GeoPoi[],
          count: cached.count ?? 0,
          fetchedAt: cached.fetchedAt,
          expiresAt: cached.expiresAt,
        } :
                        null;
      },
      async savePois(
          actorId: string, signature: string, query: FindGeoPoisQuery,
          value: GeoPoiCache, writePrimary: boolean) {
        if (writePrimary) {
          await writeGeoPoiCache(prisma, actorId, {
            signature,
            center: query.center,
            radiusM: query.radiusM,
            kinds: query.kinds,
            ...value,
          });
        }
        await writeGeoQueryCache(prisma, actorId, {
          signature,
          type: 'poi',
          params: {
            lat: query.center.lat,
            lng: query.center.lng,
            radiusM: query.radiusM,
            kinds: query.kinds,
          },
          payload: {pois: value.pois},
          count: value.count,
          fetchedAt: value.fetchedAt,
          expiresAt: value.expiresAt,
        });
      },
      fetchPois: fetchOverpassPois,
      async readPreferences(actorId) {
        const preference = await readUserPreferencesByActor(prisma, actorId);
        return preference.geo;
      },
      async findPreferencePois(actorId, signature) {
        const now = new Date();
        const query = await readGeoQueryCache(prisma, actorId, signature);
        if (query?.expiresAt && new Date(query.expiresAt) > now) {
          return {
            pois: cachedPois(query.payload),
            count: query.count ?? cachedPois(query.payload).length,
            fetchedAt: query.fetchedAt,
            expiresAt: query.expiresAt,
          };
        }
        const poi = await readGeoPoiCache(prisma, actorId, signature);
        if (!poi?.expiresAt || new Date(poi.expiresAt) <= now) return null;
        return {
          pois: poi.pois as GeoPoi[],
          count: poi.count,
          fetchedAt: poi.fetchedAt,
          expiresAt: poi.expiresAt,
        };
      },
      async savePreferences(userId, patch: MapPreferencePatch) {
        const geo: NonNullable<UserPreferencePatch['geo']> = {};
        if (patch.center !== undefined) geo.center = patch.center;
        if (patch.view !== undefined) geo.view = patch.view;
        if (patch.poi !== undefined) geo.poi = patch.poi;
        if (Object.keys(geo).length) {
          await updateUserPreferencesForUser(prisma, userId, {geo});
        }
      },
      async savePreferencePois(
          actorId: string, command: UpdateMapPreferencesCommand,
          expiresAt: string) {
        await writeGeoQueryCache(prisma, actorId, {
          signature: command.poi!.signature!,
          type: 'poi',
          params: {
            lat: command.center?.lat ?? null,
            lng: command.center?.lng ?? null,
            radiusM: command.poi?.radiusM ?? null,
            kinds: command.poi?.kinds ?? [],
          },
          payload: {pois: command.poi?.pois},
          count: command.poi?.count ?? command.poi?.pois?.length ?? null,
          fetchedAt: expiresAt,
          expiresAt,
        });
      },
      async readHistory(actorId, limit) {
        return await readGeoViewHistory(prisma, actorId, limit);
      },
      async findHistoryPois(ids) {
        const actors = await prisma.actor.findMany({
          where: {id: {in : ids}, type: ACTOR_TYPES.POINT_OF_INTEREST},
          select: {id: true, label: true, category: true, metadata: true},
        });
        return actors.map((actor) => {
          const metadata = asRecord(actor.metadata);
          const lat = Number(metadata.lat);
          const lng = Number(metadata.lng);
          return {
            id: actor.id,
            name: actor.label,
            category: actor.category ?? null,
            lat: Number.isFinite(lat) ? lat : 0,
            lng: Number.isFinite(lng) ? lng : 0,
          };
        });
      },
      async readHistoryEntry(actorId, signature) {
        const entry = await readGeoViewEntry(prisma, actorId, signature);
        return entry ? ({id: signature, ...entry} as MapHistoryRecord) : null;
      },
      async saveHistoryEntry(actorId, entry) {
        await writeGeoViewEntry(prisma, actorId, entry);
      },
    });

export const createPrismaGeoCoreKit = (prisma: PrismaClient) =>
  createGeoCoreKit(createPrismaGeoCoreHost(prisma));
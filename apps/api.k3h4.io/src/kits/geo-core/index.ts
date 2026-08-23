import {routeSignature} from '../../lib/geo-signature';

export type GeoPoint = {
  lat: number; lng: number
};

export type GeoRoute = {
  distanceKm: number; durationMinutes: number; geojson: unknown;
};

export type GeoRouteResult = GeoRoute&{
  cached: boolean;
};

export type ResolveGeoRouteQuery = {
  actorId: string; origin: GeoPoint; destination: GeoPoint;
};

export type GeoPoi = Record<string, unknown>&{id: string};

export type GeoPoiCache = {
  pois: GeoPoi[];
  count: number;
  fetchedAt?: string;
  expiresAt?: string;
};

export type FindGeoPoisQuery = {
  actorId: string|null;
  userId: string|null;
  center: GeoPoint;
  radiusM: number;
  kinds: string[];
};

export type GeoPoiResult = {
  pois: GeoPoi[];
  count: number;
  cached: boolean;
  stale?: boolean;
};

export type MapView = {
  center: GeoPoint;
  zoom: number|null;
  bearing: number|null;
  pitch: number|null;
};

export type MapPoiPreference = {
  signature: string;
  kinds: string[];
  radiusM: number|null;
  count: number|null;
  fetchedAt: string|null;
};

export type MapPreferenceRecord = {
  center: GeoPoint|null;
  view: Omit<MapView, 'center'>|null;
  poi: MapPoiPreference|null;
};

export type MapPreferencePatch = {
  center?: GeoPoint|null;
  view?: Partial<Omit<MapView, 'center'>>;
  poi?: {
    signature: string;
    kinds: string[];
    radiusM: number;
    count: number;
    fetchedAt: string;
  };
};

export type UpdateMapPreferencesCommand = {
  center?: GeoPoint;
  view?: {zoom?: number; bearing?: number; pitch?: number};
  poi?: {
    signature?: string;
    kinds?: string[];
    radiusM?: number;
    count?: number;
    expiresAtMs?: number;
    pois?: GeoPoi[];
  };
};

export type MapPreferences = {
  view: MapView|null;
  poi: null|{
    signature: string;
    kinds: string[];
    radiusM: number|null;
    count: number|null;
    cached: true;
    fetchedAt: Date|null;
    pois?: GeoPoi[];
  };
};

export type GeoBounds = {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
};

export type MapHistoryRecord = {
  id: string|number;
  signature: string;
  zoomBand: number;
  bbox: GeoBounds;
  lastPoiIds?: string[];
  lastPoiCount?: number;
  firstViewedAt: string;
  lastViewedAt: string;
  viewCount: number;
  staleAfter?: string|null;
};

export type MapHistoryPoi = {
  id: string;
  name: string;
  category: string|null;
  lat: number;
  lng: number;
};

export type MapHistoryEntry = MapHistoryRecord&{pois: MapHistoryPoi[]};

export type MapHistoryWrite =
  Omit<MapHistoryRecord, 'id'|'staleAfter'>&{staleAfter?: string};

export type RecordMapViewCommand = {
  actorId: string;
  bbox: GeoBounds;
  zoom: number;
  items: Array<{id?: string; cluster?: unknown}>;
};

export const geoPoiSignature =
    (center: GeoPoint, radiusM: number, kinds: string[]) => [
      Number(center.lat.toFixed(5)),
      Number(center.lng.toFixed(5)),
      radiusM,
      [...kinds].sort().join(','),
    ].join(':');

export const geoViewSignature = (bounds: GeoBounds, zoom: number) => [
  bounds.minLat.toFixed(4),
  bounds.minLng.toFixed(4),
  bounds.maxLat.toFixed(4),
  bounds.maxLng.toFixed(4),
  Math.round(zoom),
].join(':');

export interface GeoCoreHost {
  now(): Date;
  findRoute(actorId: string, signature: string): Promise<GeoRoute|null>;
  saveRoute(
      actorId: string, signature: string, route: GeoRoute,
      fetchedAt: string): Promise<void>;
  fetchRoute(origin: GeoPoint, destination: GeoPoint): Promise<GeoRoute>;
  findPois(actorId: string, signature: string): Promise<GeoPoiCache|null>;
  findStalePois(actorId: string, signature: string): Promise<GeoPoiCache|null>;
  savePois(
      actorId: string, signature: string, query: FindGeoPoisQuery,
      value: GeoPoiCache, writePrimary: boolean): Promise<void>;
  fetchPois(
      center: GeoPoint, radiusM: number, kinds: string[],
      signature: string): Promise<GeoPoi[]>;
  readPreferences(actorId: string): Promise<MapPreferenceRecord>;
  findPreferencePois(
      actorId: string, signature: string): Promise<GeoPoiCache|null>;
  savePreferences(userId: string, patch: MapPreferencePatch): Promise<void>;
  savePreferencePois(
      actorId: string, command: UpdateMapPreferencesCommand,
      expiresAt: string): Promise<void>;
  readHistory(actorId: string, limit: number): Promise<MapHistoryRecord[]>;
  findHistoryPois(ids: string[]): Promise<MapHistoryPoi[]>;
  readHistoryEntry(
      actorId: string, signature: string): Promise<MapHistoryRecord|null>;
  saveHistoryEntry(
      actorId: string, entry: MapHistoryWrite): Promise<void>;
}

export interface GeoCoreKit {
  resolveRoute(query: ResolveGeoRouteQuery): Promise<GeoRouteResult>;
  findPois(query: FindGeoPoisQuery): Promise<GeoPoiResult>;
  getMapPreferences(actorId: string): Promise<MapPreferences>;
  updateMapPreferences(
      userId: string, actorId: string,
      command: UpdateMapPreferencesCommand): Promise<void>;
  getMapHistory(actorId: string, limit?: number): Promise<MapHistoryEntry[]>;
  recordMapView(command: RecordMapViewCommand): Promise<{isStale: boolean}>;
}

const POI_TTL_MS = 1000 * 60 * 60 * 12;
const VIEW_STALE_MS = 1000 * 60 * 45;

export const createGeoCoreKit = (host: GeoCoreHost): GeoCoreKit => ({
  async resolveRoute(query) {
    const signature = routeSignature(query.origin, query.destination);
    const cached = await host.findRoute(query.actorId, signature);
    if (cached) return {...cached, cached: true};

    const route = await host.fetchRoute(query.origin, query.destination);
    await host.saveRoute(
        query.actorId, signature, route, host.now().toISOString());
    return {...route, cached: false};
  },

  async findPois(query) {
    const signature = geoPoiSignature(
        query.center, query.radiusM, query.kinds);
    const cached = query.actorId ?
        await host.findPois(query.actorId, signature) :
        null;
    if (cached) {
      const now = host.now();
      const expiresAt = cached.expiresAt ??
          new Date(now.getTime() + POI_TTL_MS).toISOString();
      if (query.actorId) {
        await host.savePois(
            query.actorId, signature, query, {
              ...cached,
              fetchedAt: cached.fetchedAt ?? now.toISOString(),
              expiresAt,
            }, false);
      }
      if (query.userId) {
        await host.savePreferences(query.userId, {
          center: query.center,
          poi: {
            signature,
            kinds: query.kinds,
            radiusM: query.radiusM,
            count: cached.count,
            fetchedAt: expiresAt,
          },
        });
      }
      return {pois: cached.pois, count: cached.count, cached: true};
    }

    try {
      const pois = await host.fetchPois(
          query.center, query.radiusM, query.kinds, signature);
      const now = host.now();
      const expiresAt = new Date(now.getTime() + POI_TTL_MS).toISOString();
      const value = {
        pois,
        count: pois.length,
        fetchedAt: now.toISOString(),
        expiresAt,
      };
      if (query.actorId) {
        await host.savePois(
            query.actorId, signature, query, value, true);
      }
      if (query.userId) {
        await host.savePreferences(query.userId, {
          center: query.center,
          poi: {
            signature,
            kinds: query.kinds,
            radiusM: query.radiusM,
            count: pois.length,
            fetchedAt: expiresAt,
          },
        });
      }
      return {pois, count: pois.length, cached: false};
    } catch (error) {
      const stale = query.actorId ?
          await host.findStalePois(query.actorId, signature) :
          null;
      if (stale) {
        return {
          pois: stale.pois,
          count: stale.count,
          cached: true,
          stale: true,
        };
      }
      throw error;
    }
  },

  async getMapPreferences(actorId) {
    const preference = await host.readPreferences(actorId);
    const view = preference.center ? {
      center: preference.center,
      zoom: preference.view?.zoom ?? null,
      bearing: preference.view?.bearing ?? null,
      pitch: preference.view?.pitch ?? null,
    } :
                                     null;
    const lastPoi = preference.poi;
    if (!lastPoi?.signature) return {view, poi: null};

    const cached = await host.findPreferencePois(actorId, lastPoi.signature);
    if (!cached) return {view, poi: null};
    return {
      view,
      poi: {
        signature: lastPoi.signature,
        kinds: lastPoi.kinds,
        radiusM: lastPoi.radiusM,
        count: lastPoi.count ?? cached.count,
        cached: true,
        fetchedAt: lastPoi.fetchedAt ? new Date(lastPoi.fetchedAt) :
                                       cached.expiresAt ?
                                       new Date(cached.expiresAt) :
                                       null,
        pois: cached.pois,
      },
    };
  },

  async updateMapPreferences(userId, actorId, command) {
    const patch: MapPreferencePatch = {};
    if (command.center) patch.center = command.center;
    if (command.view) {
      patch.view = {
        zoom: command.view.zoom ?? null,
        bearing: command.view.bearing ?? null,
        pitch: command.view.pitch ?? null,
      };
    }
    const signature = command.poi?.signature;
    const radiusM = command.poi?.radiusM;
    const expiresAt = command.poi?.expiresAtMs ?
        new Date(command.poi.expiresAtMs) :
        host.now();
    if (signature && Number.isFinite(radiusM)) {
      patch.poi = {
        signature,
        kinds: command.poi?.kinds ?? [],
        radiusM: radiusM as number,
        count: command.poi?.count ?? 0,
        fetchedAt: expiresAt.toISOString(),
      };
    }
    await host.savePreferences(userId, patch);
    if (signature && Array.isArray(command.poi?.pois) &&
        command.poi?.expiresAtMs) {
      await host.savePreferencePois(
          actorId, command, expiresAt.toISOString());
    }
  },

  async getMapHistory(actorId, limit = 40) {
    const take = Number.isFinite(limit) ?
        Math.min(Math.max(1, Math.trunc(limit)), 200) :
        40;
    const rows = await host.readHistory(actorId, take);
    const ids = Array.from(new Set(rows.flatMap((row) => row.lastPoiIds ?? [])));
    const pois = ids.length ? await host.findHistoryPois(ids) : [];
    const poiMap = new Map(pois.map((poi) => [poi.id, poi]));
    return rows.map((row) => ({
      ...row,
      bbox: row.bbox ?? {minLat: 0, minLng: 0, maxLat: 0, maxLng: 0},
      lastPoiIds: row.lastPoiIds ?? [],
      lastPoiCount: row.lastPoiCount ?? 0,
      pois: (row.lastPoiIds ?? [])
                .map((id) => poiMap.get(id))
                .filter((poi): poi is MapHistoryPoi => Boolean(poi)),
    }));
  },

  async recordMapView(command) {
    const signature = geoViewSignature(command.bbox, command.zoom);
    const now = host.now();
    const existing = await host.readHistoryEntry(command.actorId, signature);
    const lastPoiIds = command.items
                           .filter((item) => !item.cluster)
                           .map((item) => item.id ?? '')
                           .filter(Boolean)
                           .slice(0, 500);
    await host.saveHistoryEntry(command.actorId, {
      signature,
      zoomBand: Math.round(command.zoom),
      bbox: command.bbox,
      lastPoiIds,
      lastPoiCount: command.items.length,
      firstViewedAt: existing?.firstViewedAt ?? now.toISOString(),
      lastViewedAt: now.toISOString(),
      viewCount: (existing?.viewCount ?? 0) + 1,
      staleAfter: new Date(now.getTime() + VIEW_STALE_MS).toISOString(),
    });
    return {
      isStale: existing?.staleAfter ?
          new Date(existing.staleAfter) < now :
          true,
    };
  },
});
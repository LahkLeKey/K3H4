import {type GeoCoreHost, type GeoCoreKit} from '../geo-core';

export const MAP_STYLE_PATH = '/maps/hybrid/style.json';
export const VECTOR_TILE_PATH = '/tiles/v3/{z}/{x}/{y}.pbf';
export const TERRAIN_TILE_PATH = '/tiles/terrain-rgb-v2/{z}/{x}/{y}.png';

export type GeoMapBootstrapCommand = {
  userId: string|null;
  includePrefs: boolean;
  includeHistory: boolean;
  includeMap: boolean;
  historyLimit: number;
  viewport?: {
    center?: {lat: number; lng: number};
    radiusM?: number;
    kinds?: string[]|string;
  };
  selectedPoi?: {id?: string; includeGeometry?: boolean};
};

export type EnrichSelectedPoi =
    (selection: {id: string; includeGeometry: boolean}) => Promise<unknown>;

export type GeoMapBootstrapResponse = {
  ok: true;
  map?: {
    stylePath: string;
    vectorTilePath: string;
    terrainTilePath: string;
  };
  prefs?: unknown;
  history?: unknown;
  viewportPois?: {
    signature: string;
    kinds: string[];
    radiusM: number;
    count: number|null;
    cached: boolean;
    expiresAt: Date|null;
    pois: unknown;
  };
  selectedPoi?: unknown;
};

export interface GeoMapBootstrapKit {
  build(command: GeoMapBootstrapCommand): Promise<GeoMapBootstrapResponse>;
}

export type GeoMapBootstrapDependencies = {
  geoCore: GeoCoreKit;
  geoCoreHost: Pick<GeoCoreHost, 'findPreferencePois'>;
  resolveActorId(userId: string): Promise<string>;
  resolveGlobalActorId(): Promise<string>;
  enrichSelectedPoi: EnrichSelectedPoi;
  now(): Date;
};

const inflight = new Map<string, Promise<unknown>>();

const coalesce = async<T>(key: string, fn: () => Promise<T>): Promise<T> => {
  const existing = inflight.get(key) as Promise<T>|undefined;
  if (existing) return existing;
  const pending = fn().finally(() => inflight.delete(key));
  inflight.set(key, pending);
  return pending;
};

const makePoiSignature =
    (center: {lat: number; lng: number}, radiusM: number, kinds: string[]) =>
      `${center.lat.toFixed(5)}:${center.lng.toFixed(5)}:${
          Math.round(radiusM)}:${[...kinds].sort().join(',')}`;

export const createGeoMapBootstrapKit =
    (dependencies: GeoMapBootstrapDependencies): GeoMapBootstrapKit => ({
      async build(command) {
        const actorId = command.userId ?
            await dependencies.resolveActorId(command.userId) :
            null;
        const payload: GeoMapBootstrapResponse = {ok: true};

        if (command.includeMap) {
          payload.map = {
            stylePath: MAP_STYLE_PATH,
            vectorTilePath: VECTOR_TILE_PATH,
            terrainTilePath: TERRAIN_TILE_PATH,
          };
        }

        if (command.includePrefs && actorId) {
          payload.prefs =
              await dependencies.geoCore.getMapPreferences(actorId);
        }

        if (command.includeHistory && actorId) {
          payload.history = await dependencies.geoCore.getMapHistory(
              actorId, command.historyLimit);
        }

        const viewport = command.viewport;
        if (viewport?.center && Number.isFinite(viewport.center.lat) &&
            Number.isFinite(viewport.center.lng) &&
            Number.isFinite(viewport.radiusM ?? 0)) {
          const kinds = Array.isArray(viewport.kinds) ?
              viewport.kinds.filter(Boolean).map(String) :
              typeof viewport.kinds === 'string' &&
                  viewport.kinds.trim().length > 0 ?
              viewport.kinds.split(/[|,]/)
                  .map((kind) => kind.trim())
                  .filter(Boolean) :
              [
                'restaurant', 'cafe', 'bar', 'fast_food', 'fuel', 'bank',
                'atm', 'bus_station', 'train_station'
              ];
          const radiusM = viewport.radiusM ?? 1800;
          const signature = makePoiSignature(viewport.center, radiusM, kinds);
          const cacheActorId = actorId ??
              await dependencies.resolveGlobalActorId();
          const cached = await coalesce(
              `geoQueryCache:${cacheActorId}:${signature}`,
              () => dependencies.geoCoreHost.findPreferencePois(
                  cacheActorId, signature));

          if (cached) {
            const expiresAt = cached.expiresAt ?
                new Date(cached.expiresAt) :
                null;
            payload.viewportPois = {
              signature,
              kinds,
              radiusM,
              count: cached.count ?? null,
              cached: expiresAt ? expiresAt > dependencies.now() : true,
              expiresAt,
              pois: cached.pois ?? null,
            };
          }
        }

        if (command.selectedPoi?.id) {
          payload.selectedPoi = await dependencies.enrichSelectedPoi({
            id: command.selectedPoi.id,
            includeGeometry: Boolean(command.selectedPoi.includeGeometry),
          });
        }

        return payload;
      },
    });
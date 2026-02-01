import {EntityKind, Prisma, PrismaClient} from '@prisma/client';

import {ensureGeoActor, findGeoActor} from './geo-actor';

const PREFERENCE_ENTITY_SOURCE = 'k3h4-api-user-preferences';
const PREFERENCE_ENTITY_NAME = 'user-preferences';
const PREFERENCE_ENTITY_TARGET_TYPE = 'preferences';
const PREFERENCE_ENTITY_TARGET_ID = 'default';

const DEFAULT_SETTINGS = {
  theme: 'system',
  locale: 'en-US',
  timezone: 'UTC',
  marketingOptIn: false,
};

type JsonObject = Prisma.JsonObject;

type PreferenceGeoCenter = {
  lat: number; lng: number;
};

type PreferenceGeoView = {
  zoom: number|null; bearing: number | null; pitch: number | null;
};

type PreferenceGeoPoi = {
  signature: string; kinds: string[]; radiusM: number | null;
  count: number | null;
  fetchedAt: string | null;
};

type PreferenceMaptilerLast = {
  path: string|null; params: Prisma.JsonValue | null; kind: string | null;
  signature: string | null;
  fetchedAt: string | null;
};

type PreferenceMaptiler = {
  style: string|null; language: string | null;
  last: PreferenceMaptilerLast | null;
};

type PreferenceGeo = {
  center: PreferenceGeoCenter|null; view: PreferenceGeoView | null;
  poi: PreferenceGeoPoi | null;
};

export type UserPreferenceSnapshot = {
  note: string|null; settings: typeof DEFAULT_SETTINGS; geo: PreferenceGeo;
  maptiler: PreferenceMaptiler;
};

type PreferenceSettingsPatch = {
  theme?: string|null;
  locale?: string | null;
  timezone?: string | null;
  marketingOptIn?: boolean | null;
};

type PreferenceGeoPatch = {
  center?: PreferenceGeoCenter|null;
  view?: Partial<PreferenceGeoView>| null;
  poi?: Partial<PreferenceGeoPoi>| null;
}|null;
type PreferenceMaptilerPatch = {
  style?: string|null;
  language?: string | null;
  last?: Partial<PreferenceMaptilerLast>| null;
}|null;

export type UserPreferencePatch = {
  note?: string|null;
  settings?: PreferenceSettingsPatch | null;
  geo?: PreferenceGeoPatch;
  maptiler?: PreferenceMaptilerPatch;
};

export const buildDefaultPreferenceSnapshot = (): UserPreferenceSnapshot => ({
  note: null,
  settings: {...DEFAULT_SETTINGS},
  geo: {center: null, view: null, poi: null},
  maptiler: {style: null, language: null, last: null},
});

const isJsonObject = (value: unknown): value is JsonObject =>
    Boolean(value && typeof value === 'object' && !Array.isArray(value));

const pruneJsonObject = (value: JsonObject|undefined): JsonObject|undefined => {
  if (!value) return undefined;
  const entries = Object.entries(value).filter(([, val]) => val !== undefined);
  if (!entries.length) return undefined;
  return Object.fromEntries(entries) as JsonObject;
};

const roundLatLng = (value: number) => Number(value.toFixed(6));

const buildCenter = (value: unknown): PreferenceGeoCenter|null => {
  if (!isJsonObject(value)) return null;
  const lat = Number(value.lat);
  const lng = Number(value.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {lat: roundLatLng(lat), lng: roundLatLng(lng)};
};

const buildView = (value: unknown): PreferenceGeoView|null => {
  if (!isJsonObject(value)) return null;
  const zoom = value.zoom;
  const bearing = value.bearing;
  const pitch = value.pitch;
  if (zoom === undefined && bearing === undefined && pitch === undefined)
    return null;
  return {
    zoom: Number.isFinite(Number(zoom)) ? Number(zoom) : null,
    bearing: Number.isFinite(Number(bearing)) ? Number(bearing) : null,
    pitch: Number.isFinite(Number(pitch)) ? Number(pitch) : null,
  };
};

const buildPoi = (value: unknown): PreferenceGeoPoi|null => {
  if (!isJsonObject(value)) return null;
  const signature =
      typeof value.signature === 'string' ? value.signature : null;
  if (!signature) return null;
  const kinds = Array.isArray(value.kinds) ?
      value.kinds.filter((item) => typeof item === 'string') as string[] :
      [];
  const radiusM =
      Number.isFinite(Number(value.radiusM)) ? Number(value.radiusM) : null;
  const count =
      Number.isFinite(Number(value.count)) ? Number(value.count) : null;
  const fetchedAt =
      typeof value.fetchedAt === 'string' ? value.fetchedAt : null;
  return {signature, kinds, radiusM, count, fetchedAt};
};

const buildMaptilerLast = (value: unknown): PreferenceMaptilerLast|null => {
  if (!isJsonObject(value)) return null;
  const path = typeof value.path === 'string' ? value.path : null;
  const params = value.params ?? null;
  const kind = typeof value.kind === 'string' ? value.kind : null;
  const signature =
      typeof value.signature === 'string' ? value.signature : null;
  const fetchedAt =
      typeof value.fetchedAt === 'string' ? value.fetchedAt : null;
  if (!path && params === null && !kind && !signature && !fetchedAt) {
    return null;
  }
  return {path, params, kind, signature, fetchedAt};
};

const buildMaptiler = (value: unknown): PreferenceMaptiler => {
  if (!isJsonObject(value)) return {style: null, language: null, last: null};
  return {
    style: typeof value.style === 'string' ? value.style : null,
    language: typeof value.language === 'string' ? value.language : null,
    last: buildMaptilerLast(value.last),
  };
};

const buildSettings = (value: unknown) => {
  if (!isJsonObject(value)) return {...DEFAULT_SETTINGS};
  return {
    theme: typeof value.theme === 'string' ? value.theme :
                                             DEFAULT_SETTINGS.theme,
    locale: typeof value.locale === 'string' ? value.locale :
                                               DEFAULT_SETTINGS.locale,
    timezone: typeof value.timezone === 'string' ? value.timezone :
                                                   DEFAULT_SETTINGS.timezone,
    marketingOptIn: typeof value.marketingOptIn === 'boolean' ?
        value.marketingOptIn :
        DEFAULT_SETTINGS.marketingOptIn,
  };
};

const metadataToSnapshot = (metadata: Prisma.JsonValue|null|undefined) => {
  if (!isJsonObject(metadata)) return buildDefaultPreferenceSnapshot();
  const obj = metadata as JsonObject;
  const geoValue = isJsonObject(obj.geo) ? obj.geo : undefined;
  const maptilerValue = isJsonObject(obj.maptiler) ? obj.maptiler : undefined;
  return {
    note: typeof obj.note === 'string' ? obj.note : null,
    settings: buildSettings(obj.settings),
    geo: {
      center: buildCenter(geoValue?.center),
      view: buildView(geoValue?.view),
      poi: buildPoi(geoValue?.poi),
    },
    maptiler: buildMaptiler(maptilerValue),
  } as UserPreferenceSnapshot;
};

const preferenceEntityFilter = (actorId: string) => ({
  actorId,
  targetType: PREFERENCE_ENTITY_TARGET_TYPE,
  targetId: PREFERENCE_ENTITY_TARGET_ID,
});

const safeParams = (value: unknown): Prisma.JsonValue|undefined => {
  if (value === undefined) return undefined as undefined;
  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.JsonValue;
  } catch {
    return null;
  }
};

const mergeSettingsPatch =
    (base: JsonObject|undefined,
     patch: PreferenceSettingsPatch|null|undefined) => {
      if (patch === undefined) return base;
      if (patch === null) return null;
      const next: JsonObject = {...(isJsonObject(base) ? base : {})};
      if (patch.theme !== undefined) next.theme = patch.theme;
      if (patch.locale !== undefined) next.locale = patch.locale;
      if (patch.timezone !== undefined) next.timezone = patch.timezone;
      if (patch.marketingOptIn !== undefined)
        next.marketingOptIn = patch.marketingOptIn;
      return pruneJsonObject(next) ?? undefined;
    };

const mergeGeoPatch =
    (base: JsonObject|undefined, patch: PreferenceGeoPatch) => {
      if (patch === null) return null;
      const existing =
          isJsonObject(base) ? base : (undefined as JsonObject | undefined);
      const next: JsonObject = {...(existing ?? {})};
      if (patch.center !== undefined) {
        if (patch.center === null) {
          next.center = null;
        } else {
          next.center = {
            lat: roundLatLng(patch.center.lat),
            lng: roundLatLng(patch.center.lng)
          };
        }
      }
      if (patch.view !== undefined) {
        if (patch.view === null) {
          next.view = null;
        } else {
          const viewBase =
              isJsonObject(existing?.view) ? existing.view : undefined;
          const view: JsonObject = {...(viewBase ?? {})};
          if (patch.view.zoom !== undefined) view.zoom = patch.view.zoom;
          if (patch.view.bearing !== undefined)
            view.bearing = patch.view.bearing;
          if (patch.view.pitch !== undefined) view.pitch = patch.view.pitch;
          const cleaned = pruneJsonObject(view);
          if (cleaned) {
            next.view = cleaned;
          } else {
            delete next.view;
          }
        }
      }
      if (patch.poi !== undefined) {
        if (patch.poi === null) {
          next.poi = null;
        } else {
          const poiBase =
              isJsonObject(existing?.poi) ? existing.poi : undefined;
          const poi: JsonObject = {...(poiBase ?? {})};
          if (patch.poi.signature !== undefined)
            poi.signature = patch.poi.signature;
          if (patch.poi.kinds !== undefined) poi.kinds = patch.poi.kinds;
          if (patch.poi.radiusM !== undefined) poi.radiusM = patch.poi.radiusM;
          if (patch.poi.count !== undefined) poi.count = patch.poi.count;
          if (patch.poi.fetchedAt !== undefined)
            poi.fetchedAt = patch.poi.fetchedAt;
          const cleaned = pruneJsonObject(poi);
          if (cleaned) {
            next.poi = cleaned;
          } else {
            delete next.poi;
          }
        }
      }
      const cleaned = pruneJsonObject(next);
      return cleaned ?? undefined;
    };

const mergeMaptilerPatch =
    (base: JsonObject|undefined, patch: PreferenceMaptilerPatch) => {
      if (patch === null) return null;
      const existing =
          isJsonObject(base) ? base : (undefined as JsonObject | undefined);
      const next: JsonObject = {...(existing ?? {})};
      if (patch.style !== undefined) next.style = patch.style;
      if (patch.language !== undefined) next.language = patch.language;
      if (patch.last !== undefined) {
        if (patch.last === null) {
          next.last = null;
        } else {
          const lastBase =
              isJsonObject(existing?.last) ? existing.last : undefined;
          const last: JsonObject = {...(lastBase ?? {})};
          if (patch.last.path !== undefined) last.path = patch.last.path;
          if (patch.last.params !== undefined)
            last.params = safeParams(patch.last.params);
          if (patch.last.kind !== undefined) last.kind = patch.last.kind;
          if (patch.last.signature !== undefined)
            last.signature = patch.last.signature;
          if (patch.last.fetchedAt !== undefined)
            last.fetchedAt = patch.last.fetchedAt;
          const cleanedLast = pruneJsonObject(last);
          if (cleanedLast) {
            next.last = cleanedLast;
          } else {
            delete next.last;
          }
        }
      }
      const cleaned = pruneJsonObject(next);
      return cleaned ?? undefined;
    };

const mergeMetadata =
    (base: JsonObject|undefined, patch: UserPreferencePatch) => {
      const next: JsonObject = {...(base ?? {})};
      if (patch.note !== undefined) {
        next.note = patch.note;
      }
      const settings = mergeSettingsPatch(
          isJsonObject(base?.settings) ? base.settings : undefined,
          patch.settings);
      if (settings !== undefined) {
        next.settings = settings;
      }
      if (patch.geo !== undefined) {
        const geo = mergeGeoPatch(
            isJsonObject(base?.geo) ? base.geo : undefined, patch.geo);
        if (geo === undefined) {
          delete next.geo;
        } else {
          next.geo = geo;
        }
      }
      if (patch.maptiler !== undefined) {
        const maptiler = mergeMaptilerPatch(
            isJsonObject(base?.maptiler) ? base.maptiler : undefined,
            patch.maptiler);
        if (maptiler === undefined) {
          delete next.maptiler;
        } else {
          next.maptiler = maptiler;
        }
      }
      const cleaned = pruneJsonObject(next);
      return cleaned ?? undefined;
    };

const getPreferenceEntity =
    async (prisma: PrismaClient|Prisma.TransactionClient, actorId: string) => {
  return prisma.entity.findFirst({
    where: preferenceEntityFilter(actorId),
    orderBy: {createdAt: 'desc'},
    select: {id: true, metadata: true},
  });
};

const writeMetadata =
    (prisma: PrismaClient|Prisma.TransactionClient, actorId: string,
     metadata: JsonObject) => {
      return prisma.entity.create({
        data: {
          actorId,
          kind: EntityKind.SET,
          name: PREFERENCE_ENTITY_NAME,
          targetType: PREFERENCE_ENTITY_TARGET_TYPE,
          targetId: PREFERENCE_ENTITY_TARGET_ID,
          source: PREFERENCE_ENTITY_SOURCE,
          metadata,
        },
      });
    };

const updateMetadata =
    (prisma: PrismaClient|Prisma.TransactionClient, id: string,
     metadata: JsonObject) => {
      return prisma.entity.update({where: {id}, data: {metadata}});
    };

const patchHasContent = (patch: UserPreferencePatch) =>
    patch.note !== undefined || patch.settings !== undefined ||
    patch.geo !== undefined || patch.maptiler !== undefined;

export const readUserPreferencesByActor =
    async (prisma: PrismaClient|Prisma.TransactionClient, actorId: string) => {
  const entity = await getPreferenceEntity(prisma, actorId);
  if (!entity) return buildDefaultPreferenceSnapshot();
  return metadataToSnapshot(entity.metadata);
};

export const readUserPreferencesForUser =
    async (prisma: PrismaClient|Prisma.TransactionClient, userId: string) => {
  const actor = await findGeoActor(prisma, userId);
  if (!actor) return buildDefaultPreferenceSnapshot();
  return readUserPreferencesByActor(prisma, actor.id);
};

export const updateUserPreferencesByActor = async (
    prisma: PrismaClient|Prisma.TransactionClient, actorId: string,
    patch: UserPreferencePatch) => {
  if (!patch || !patchHasContent(patch)) return null;
  const baseEntity = await getPreferenceEntity(prisma, actorId);
  const baseMetadata =
      isJsonObject(baseEntity?.metadata) ? baseEntity?.metadata : undefined;
  const nextMetadata = mergeMetadata(baseMetadata, patch);
  if (!nextMetadata) {
    if (baseEntity) {
      await updateMetadata(prisma, baseEntity.id, {});
      return baseEntity.id;
    }
    return null;
  }
  if (baseEntity) {
    await updateMetadata(prisma, baseEntity.id, nextMetadata);
    return baseEntity.id;
  }
  await writeMetadata(prisma, actorId, nextMetadata);
  return null;
};

export const updateUserPreferencesForUser = async (
    prisma: PrismaClient|Prisma.TransactionClient, userId: string,
    patch: UserPreferencePatch) => {
  const actor = await ensureGeoActor(prisma, userId);
  return updateUserPreferencesByActor(prisma, actor.id, patch);
};

export const deleteUserPreferencesForUser =
    async (prisma: PrismaClient|Prisma.TransactionClient, userId: string) => {
  const actor = await findGeoActor(prisma, userId);
  if (!actor) return {count: 0};
  return prisma.entity.deleteMany({
    where: {...preferenceEntityFilter(actor.id)},
  });
};

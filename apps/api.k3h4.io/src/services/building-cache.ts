import type {PrismaClient} from '@prisma/client';

import {readActorCache} from './actor-cache';

const BUILDING_CACHE_NAMESPACE = 'point-of-interest:building';

const buildCacheKey = (scope: 'id'|'osm', value: string) =>
    `${BUILDING_CACHE_NAMESPACE}:${scope}:${value}`;

const serializeGeometry = (raw: unknown) => {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
};

const normalizeOsmType = (value?: string) => {
  const type = `${value ?? ''}`.trim().toLowerCase();
  if (type === 'node' || type === 'way' || type === 'relation') return type;
  return 'way';
};

export type BuildingCachePayload = {
  id: string;
  osmId?: string | number | null;
  osmType?: string | null;
  type?: string | null;
  addressHouseNumber?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  addressPostcode?: string | null;
  addressState?: string | null;
  addressCountry?: string | null;
  geometry?: unknown;
  updatedAt?: string;
};

export const formatBuildingFromPayload =
    (payload: BuildingCachePayload, includeGeometry: boolean) => {
      const geometry = includeGeometry ?
          serializeGeometry(payload.geometry ?? null) :
          undefined;
      return {
        id: payload.id,
        osmId: payload.osmId !== null && payload.osmId !== undefined ?
            Number(payload.osmId) :
            null,
        osmType: payload.osmType ?? null,
        type: payload.type ?? null,
        addressHouseNumber: payload.addressHouseNumber ?? null,
        addressStreet: payload.addressStreet ?? null,
        addressCity: payload.addressCity ?? null,
        addressPostcode: payload.addressPostcode ?? null,
        addressState: payload.addressState ?? null,
        addressCountry: payload.addressCountry ?? null,
        geometry: includeGeometry ? geometry ?? null : undefined,
      };
    };

export async function readBuildingCacheById(
    prisma: PrismaClient, actorId: string, id: string) {
  if (!actorId || !id) return null;
  const payload =
      await readActorCache(prisma, actorId, buildCacheKey('id', id));
  return payload as BuildingCachePayload | null;
}

export async function readBuildingCacheByOsm(
    prisma: PrismaClient, actorId: string, osmType: string,
    osmId: string|number) {
  if (!actorId || osmId === null || osmId === undefined) return null;
  const normalizedType = normalizeOsmType(osmType);
  const value = `${normalizedType}:${osmId}`;
  const payload =
      await readActorCache(prisma, actorId, buildCacheKey('osm', value));
  if (!payload) return null;
  return payload as BuildingCachePayload;
}

export {normalizeOsmType};

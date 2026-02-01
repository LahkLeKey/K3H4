import type {Prisma, PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';

const GEO_DIRECTION_NAMESPACE = 'geo.direction';
const GEO_DIRECTION_TTL_MS = 1000 * 60 * 60 * 6;  // 6 hours

const buildKey = (signature: string) =>
    `${GEO_DIRECTION_NAMESPACE}:${signature}`;

export type GeoDirectionStopPayload = {
  sequence: number; latitude: number; longitude: number; label: string | null;
  address: string | null;
  source: string | null;
  metadata: unknown;
};

export type GeoDirectionSegmentPayload = {
  sequence: number; instruction: string | null; maneuverType: string | null;
  maneuverModifier: string | null;
  distanceMeters: number | null;
  durationSeconds: number | null;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  geometry: unknown;
  metadata: unknown;
};

export type GeoDirectionCachePayload = {
  signature: string; userId: string; provider: string; profile: string;
  geometry: unknown;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  distanceMeters: number | null;
  durationSeconds: number | null;
  route: unknown;
  stops: GeoDirectionStopPayload[];
  segments: GeoDirectionSegmentPayload[];
  fetchedAt?: string;
  expiresAt?: string;
};

export async function readGeoDirectionCache(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  return await readActorCache(prisma, actorId, buildKey(signature)) as
      GeoDirectionCachePayload |
      null;
}

export async function writeGeoDirectionCache(
    prisma: PrismaClient, actorId: string|null,
    payload: GeoDirectionCachePayload, ttlMs?: number|null) {
  if (!actorId) return;
  const resolvedTtl = ttlMs ?? GEO_DIRECTION_TTL_MS;
  const expiresAt = payload.expiresAt ?
      payload.expiresAt :
      new Date(Date.now() + resolvedTtl).toISOString();
  const record = {...payload, expiresAt};
  await writeActorCache(
      prisma, actorId, buildKey(payload.signature), record as Prisma.JsonValue,
      resolvedTtl);
}

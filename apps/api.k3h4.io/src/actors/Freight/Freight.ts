import {Entity, LifecycleStatus, Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';
import {asRecord, toNumber} from '../../lib/json-record';

const FREIGHT_ACTOR_LABEL = 'Freight Ledger';
const FREIGHT_ENTITY_SOURCE = 'k3h4-freight';
const FREIGHT_ACTOR_SOURCE = 'k3h4-freight';

const FREIGHT_TARGET_TYPE = 'freight-load';

const buildMetadata = (payload: FreightLoadCreateOptions) => ({
  title: payload.title,
  originName: payload.originName,
  originLat: payload.originLat,
  originLng: payload.originLng,
  destinationName: payload.destinationName,
  destinationLat: payload.destinationLat,
  destinationLng: payload.destinationLng,
  distanceKm: payload.distanceKm,
  durationMinutes: payload.durationMinutes,
  cost: payload.cost.toFixed(2),
  routeGeoJson: payload.routeGeoJson ?? null,
  status: payload.status ?? LifecycleStatus.PLANNING,
});

export type FreightLoadPayload = {
  id: string; title: string; originName: string; originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMinutes: number | null;
  cost: number;
  status: LifecycleStatus;
  routeGeoJson: unknown | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FreightLoadCreateOptions = {
  userId: string; title: string; originName: string; originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMinutes: number | null;
  cost: Prisma.Decimal;
  routeGeoJson?: unknown;
  status?: LifecycleStatus;
};

export async function ensureFreightActor(
    tx: PrismaTx,
    userId: string,
    metadata?: Prisma.JsonValue|null,
) {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.FREIGHT);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.FREIGHT,
    label: FREIGHT_ACTOR_LABEL,
    source: FREIGHT_ACTOR_SOURCE,
    metadata: metadata ?? undefined,
  };
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
}

export async function findFreightActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ACTOR_TYPES.FREIGHT}});
}

const buildFreightLoad = (entity: Entity): FreightLoadPayload => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    title: metadata.title as string ?? '',
    originName: metadata.originName as string ?? '',
    originLat: toNumber(metadata.originLat) ?? 0,
    originLng: toNumber(metadata.originLng) ?? 0,
    destinationName: metadata.destinationName as string ?? '',
    destinationLat: toNumber(metadata.destinationLat) ?? 0,
    destinationLng: toNumber(metadata.destinationLng) ?? 0,
    distanceKm: toNumber(metadata.distanceKm) ?? 0,
    durationMinutes: toNumber(metadata.durationMinutes),
    cost: Number(metadata.cost ?? '0'),
    status: (metadata.status as LifecycleStatus) ?? LifecycleStatus.PLANNING,
    routeGeoJson: metadata.routeGeoJson ?? null,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

export async function loadFreightLoads(prisma: PrismaClient, userId: string) {
  const actor = await findFreightActor(prisma, userId);
  if (!actor) return [] as FreightLoadPayload[];
  const entities = await prisma.entity.findMany({
    where: {actorId: actor.id, kind: ENTITY_KINDS.FREIGHT_LOAD},
    orderBy: {createdAt: 'desc'},
  });
  return entities.map(buildFreightLoad);
}

export async function createFreightLoad(
    tx: PrismaTx, options: FreightLoadCreateOptions) {
  const actor = await ensureFreightActor(tx, options.userId);
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.FREIGHT_LOAD,
      targetType: FREIGHT_TARGET_TYPE,
      name: options.title,
      source: FREIGHT_ENTITY_SOURCE,
      metadata: buildMetadata(options),
    },
  });
  return buildFreightLoad(entity);
}

export async function findFreightLoad(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string,
    loadId: string) {
  const entity = await prisma.entity.findFirst({
    where: {
      id: loadId,
      kind: ENTITY_KINDS.FREIGHT_LOAD,
      actor: {userId, type: ACTOR_TYPES.FREIGHT},
    },
  });
  if (!entity) return null;
  return buildFreightLoad(entity);
}

export async function markFreightLoadCompleted(tx: PrismaTx, loadId: string) {
  const existing = await tx.entity.findUnique({
    where: {id: loadId},
    select: {metadata: true},
  });
  if (!existing) throw new Error('Freight load not found');
  const metadata = asRecord(existing.metadata);
  const updated = {
    ...metadata,
    status: LifecycleStatus.COMPLETED,
  };
  const entity = await tx.entity.update({
    where: {id: loadId},
    data: {metadata: updated},
  });
  return buildFreightLoad(entity);
}

export async function deleteFreightActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {actor: {userId, type: ACTOR_TYPES.FREIGHT}},
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: ACTOR_TYPES.FREIGHT},
  });
  return {entities, actors};
}

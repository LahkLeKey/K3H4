import {PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, type ActorType} from '../../lib/actor-entity-constants';

export type CacheScope = 'wikidata'|'enrichment'|'api';

const SCOPES: Record < CacheScope, {
  type: ActorType;
  label: string;
  source: string;
  note: string|null;
}
> = {
  wikidata: {
    type: ACTOR_TYPES.WIKIDATA_CACHE,
    label: 'Wikidata Cache',
    source: 'wikidata-cache',
    note: 'Actor that owns shared Wikidata responses',
  },
  enrichment: {
    type: ACTOR_TYPES.ENRICHMENT_CACHE,
    label: 'Enrichment Cache',
    source: 'enrichment-cache',
    note: 'Actor that owns enrichment cache hits',
  },
  api: {
    type: ACTOR_TYPES.API_CACHE,
    label: 'API Cache',
    source: 'api-cache',
    note: 'Actor that owns shared API cache entries',
  },
};

const cachedActors: Partial<Record<CacheScope, string>> = {};

export async function ensureCacheActor(
    prisma: PrismaClient, scope: CacheScope) {
  const definition = SCOPES[scope];
  const existing = await prisma.actor.findFirst({
    where: {userId: null, type: definition.type, source: definition.source},
  });
  if (existing) return existing;
  return prisma.actor.create({
    data: {
      type: definition.type,
      label: definition.label,
      source: definition.source,
      note: definition.note,
    },
  });
}

export async function ensureCacheActorId(
    prisma: PrismaClient, scope: CacheScope) {
  if (cachedActors[scope]) return cachedActors[scope] as string;
  const actor = await ensureCacheActor(prisma, scope);
  cachedActors[scope] = actor.id;
  return actor.id;
}

import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';
import * as z from 'zod';

import {type ActorType, type EntityDirection, type EntityKind,} from '../lib/actor-entity-constants';
import {ActorTypeSchema, AuthHeaderSchema, EntityDirectionSchema, EntityKindSchema, IntegerLikeSchema, makeParamsSchema, StandardErrorResponses, toJsonSchema, withExamples, zActorId} from '../lib/schemas/openapi';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const clampLimit = (value: unknown, fallback = 50, min = 1, max = 200) => {
  const num = typeof value === 'number' ? value :
      typeof value === 'string'         ? Number(value) :
                                          NaN;
  if (!Number.isFinite(num)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(num)));
};

const normalizeString = (value: unknown) =>
    typeof value === 'string' ? value.trim() : '';

const optionalString = (value: unknown) => {
  const trimmed = normalizeString(value);
  return trimmed.length ? trimmed : null;
};

const readJsonValue = (
                          value: unknown,
                          ): Prisma.InputJsonValue|
                      Prisma.NullableJsonNullValueInput|undefined => {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  return value as Prisma.InputJsonValue;
};

const normalizeActorType = (value: unknown) =>
    optionalString(value) as ActorType | null;

const normalizeEntityKind = (value: unknown) =>
    optionalString(value) as EntityKind | null;

const normalizeEntityDirection = (value: unknown) =>
    optionalString(value) as EntityDirection | null;

const requireActor = async (
    prisma: PrismaClient,
    reply: any,
    actorId: string,
    userId: string,
    ) => {
  const actor = await prisma.actor.findFirst({where: {id: actorId, userId}});
  if (!actor) {
    await reply.status(404).send({error: 'Actor not found'});
    return null;
  }
  return actor;
};

const requireEntity = async (
    prisma: PrismaClient,
    reply: any,
    entityId: string,
    userId: string,
    ) => {
  const entity = await prisma.entity.findFirst({
    where: {id: entityId, actor: {userId}},
  });
  if (!entity) {
    await reply.status(404).send({error: 'Entity not found'});
    return null;
  }
  return entity;
};

export function registerActorEntityRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const actorSchema = z.object({
                         id: z.string().min(1),
                         userId: z.string().min(1).optional(),
                         label: z.string().min(1),
                         type: ActorTypeSchema,
                         isGlobal: z.boolean(),
                         note: z.string().nullable().optional(),
                         source: z.string().nullable().optional(),
                         category: z.string().nullable().optional(),
                         metadata: z.unknown().nullable().optional(),
                         lastSeenAt: z.string().nullable().optional(),
                         createdAt: z.string().min(1).optional(),
                         updatedAt: z.string().min(1).optional(),
                       }).passthrough();

  const entitySchema =
      z.object({
         id: z.string().min(1),
         actorId: z.string().min(1),
         kind: EntityKindSchema,
         isGlobal: z.boolean(),
         direction: EntityDirectionSchema.nullable().optional(),
         name: z.string().nullable().optional(),
         targetType: z.string().nullable().optional(),
         targetId: z.string().nullable().optional(),
         source: z.string().nullable().optional(),
         metadata: z.unknown().nullable().optional(),
         createdAt: z.string().min(1).optional(),
         updatedAt: z.string().min(1).optional(),
       }).passthrough();

  const authHeader = toJsonSchema(AuthHeaderSchema, 'AuthHeader');
  const actorIdParamsSchema =
      makeParamsSchema(z.object({id: zActorId}).strict(), 'ActorIdParams');
  const cacheRecordSchema = z.object({
                               id: z.string().min(1),
                               key: z.string().min(1),
                               payload: z.unknown().nullable().optional(),
                               expiresAt: z.string().nullable().optional(),
                               createdAt: z.string().min(1),
                               updatedAt: z.string().min(1),
                             }).passthrough();
  const cacheQuerySchema = toJsonSchema(
      z.object({limit: IntegerLikeSchema.optional()}).strict(),
      'CacheListQuery');
  const cacheListResponseSchema = toJsonSchema(
      z.object({caches: z.array(cacheRecordSchema)}).strict(),
      'CacheListResponse');

  const registerActorRoutes = (scope: FastifyInstance) => {
    const auth = {preHandler: [scope.authenticate]};

    scope.get(
        '/actors', {
          ...auth,
          schema: {
            summary: 'List actors',
            description: 'Lists actors for the authenticated user.',
            operationId: 'actor_list',
            tags: ['actor'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            querystring: toJsonSchema(
                z.object({
                   type: ActorTypeSchema.optional(),
                   category: z.string().min(1).optional(),
                   limit: IntegerLikeSchema.optional(),
                 }).strict(),
                'ActorListQuery'),
            response: {
              200: withExamples(
                  toJsonSchema(
                      z.object({
                         actors: z.array(actorSchema),
                       }).strict(),
                      'ActorListResponse'),
                  [{
                    actors: [{
                      id: 'actor_01',
                      label: 'Primary account',
                      type: 'bank-account',
                      category: 'finance',
                    }],
                  }]),
              ...StandardErrorResponses,
            },
          },
        },
        async (request) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const query = request.query as {
            type?: string;
            category?: string;
            limit?: number|string;
          };
          const where: Prisma.ActorWhereInput = {userId};
          const type = normalizeActorType(query?.type);
          const category = optionalString(query?.category);
          if (type) where.type = type;
          if (category) where.category = category;

          const limit = clampLimit(query?.limit, 50, 1, 200);
          const actors = await prisma.actor.findMany({
            where,
            orderBy: {updatedAt: 'desc'},
            take: limit,
          });

          await rt({
            eventType: 'actor.list',
            source: 'api',
            payload: {count: actors.length, limit, type, category},
          });

          return {actors};
        });

    scope.post(
        '/actors', {
          ...auth,
          schema: {
            summary: 'Create actor',
            description: 'Creates a new actor for the authenticated user.',
            operationId: 'actor_create',
            tags: ['actor'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            body: toJsonSchema(
                z.object({
                   label: z.string().min(1),
                   type: ActorTypeSchema,
                   note: z.string().nullable().optional(),
                   source: z.string().nullable().optional(),
                   metadata: z.unknown().optional(),
                   category: z.string().nullable().optional(),
                 }).strict(),
                'ActorCreateBody'),
            response: {
              200: withExamples(
                  toJsonSchema(
                      z.object({actor: actorSchema}).strict(),
                      'ActorCreateResponse'),
                  [{
                    actor: {
                      id: 'actor_02',
                      label: 'Freight tracker',
                      type: 'freight',
                      category: 'logistics',
                    },
                  }]),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const body = request.body as {
            label?: string;
            type?: string;
            note?: string|null;
            source?: string|null;
            metadata?: Prisma.JsonValue;
            category?: string|null;
          };

          const label = normalizeString(body?.label);
          const type = normalizeActorType(body?.type);
          if (!label)
            return reply.status(400).send({error: 'label is required'});
          if (!type) return reply.status(400).send({error: 'type is required'});

          const actor = await prisma.actor.create({
            data: {
              userId,
              label,
              type,
              note: optionalString(body?.note),
              source: optionalString(body?.source),
              category: optionalString(body?.category),
              metadata: readJsonValue(body?.metadata),
            },
          });

          await rt({
            eventType: 'actor.create',
            source: 'api',
            payload: {actorId: actor.id, type: actor.type},
          });

          return {actor};
        });

    scope.get(
        '/actors/:id', {
          ...auth,
          schema: {
            summary: 'Get actor',
            description: 'Fetches a single actor by id.',
            operationId: 'actor_get',
            tags: ['actor'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: actorIdParamsSchema,
            response: {
              200: toJsonSchema(
                  z.object({actor: actorSchema}).strict(), 'ActorGetResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const actorId = normalizeString(params?.id);
          if (!actorId)
            return reply.status(400).send({error: 'id is required'});

          const actor =
              await prisma.actor.findFirst({where: {id: actorId, userId}});
          if (!actor) return reply.status(404).send({error: 'Actor not found'});

          await rt({
            eventType: 'actor.fetch',
            source: 'api',
            payload: {actorId},
          });

          return {actor};
        });

    scope.patch(
        '/actors/:id', {
          ...auth,
          schema: {
            summary: 'Update actor',
            description: 'Updates mutable actor fields.',
            operationId: 'actor_update',
            tags: ['actor'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: actorIdParamsSchema,
            body: toJsonSchema(
                z.object({
                   label: z.string().min(1).optional(),
                   note: z.string().nullable().optional(),
                   source: z.string().nullable().optional(),
                   metadata: z.unknown().optional(),
                   category: z.string().nullable().optional(),
                   lastSeenAt: z.string()
                                   .min(1)
                                   .describe('ISO date-time')
                                   .nullable()
                                   .optional(),
                 }).strict(),
                'ActorUpdateBody'),
            response: {
              200: toJsonSchema(
                  z.object({actor: actorSchema}).strict(),
                  'ActorUpdateResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const actorId = normalizeString(params?.id);
          if (!actorId)
            return reply.status(400).send({error: 'id is required'});

          const existing = await requireActor(prisma, reply, actorId, userId);
          if (!existing) return;

          const body = request.body as {
            label?: string;
            note?: string|null;
            source?: string|null;
            metadata?: Prisma.JsonValue;
            category?: string|null;
            lastSeenAt?: string|Date|null;
          };

          const update: Prisma.ActorUpdateInput = {};
          if (body?.label !== undefined)
            update.label = normalizeString(body.label);
          if (body?.note !== undefined) update.note = optionalString(body.note);
          if (body?.source !== undefined)
            update.source = optionalString(body.source);
          if (body?.category !== undefined)
            update.category = optionalString(body.category);
          if (body?.metadata !== undefined)
            update.metadata = readJsonValue(body.metadata);
          if (body?.lastSeenAt !== undefined) {
            const date = body.lastSeenAt ? new Date(body.lastSeenAt) : null;
            update.lastSeenAt =
                date && !Number.isNaN(date.getTime()) ? date : null;
          }

          const actor = await prisma.actor.update({
            where: {id: actorId},
            data: update,
          });

          await rt({
            eventType: 'actor.update',
            source: 'api',
            payload: {actorId},
          });

          return {actor};
        });

    scope.delete(
        '/actors/:id', {
          ...auth,
          schema: {
            summary: 'Delete actor',
            description: 'Deletes an actor by id.',
            operationId: 'actor_delete',
            tags: ['actor'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: actorIdParamsSchema,
            response: {
              200: toJsonSchema(
                  z.object({ok: z.literal(true)}).strict(),
                  'ActorDeleteResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const actorId = normalizeString(params?.id);
          if (!actorId)
            return reply.status(400).send({error: 'id is required'});

          const existing = await requireActor(prisma, reply, actorId, userId);
          if (!existing) return;

          await prisma.actor.delete({where: {id: actorId}});

          await rt({
            eventType: 'actor.delete',
            source: 'api',
            payload: {actorId},
          });

          return {ok: true};
        });

    scope.get(
        '/actors/:actorId/entities', {
          ...auth,
          schema: {
            summary: 'List actor entities',
            description: 'Lists entities for a specific actor.',
            operationId: 'actor_entity_list',
            tags: ['entity'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({actorId: z.string().min(1)}).strict(),
                'ActorIdParams'),
            querystring: toJsonSchema(
                z.object({
                   kind: EntityKindSchema.optional(),
                   direction: EntityDirectionSchema.optional(),
                   targetType: z.string().min(1).optional(),
                   targetId: z.string().min(1).optional(),
                   limit: IntegerLikeSchema.optional(),
                 }).strict(),
                'ActorEntityListQuery'),
            response: {
              200: toJsonSchema(
                  z.object({entities: z.array(entitySchema)}).strict(),
                  'ActorEntityListResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {actorId?: string};
          const actorId = normalizeString(params?.actorId);
          if (!actorId)
            return reply.status(400).send({error: 'actorId is required'});

          const actor = await requireActor(prisma, reply, actorId, userId);

          if (!actor) return;

          const query = request.query as {
            kind?: string;
            direction?: string;
            targetType?: string;
            targetId?: string;
            limit?: number|string;
          };

          const where: Prisma.EntityWhereInput = {actorId};
          const kind = normalizeEntityKind(query?.kind);
          const direction = normalizeEntityDirection(query?.direction);
          const targetType = optionalString(query?.targetType);
          const targetId = optionalString(query?.targetId);
          if (kind) where.kind = kind;
          if (direction) where.direction = direction;
          if (targetType) where.targetType = targetType;
          if (targetId) where.targetId = targetId;

          const limit = clampLimit(query?.limit, 100, 1, 500);
          const entities = await prisma.entity.findMany({
            where,
            orderBy: {createdAt: 'desc'},
            take: limit,
          });

          await rt({
            eventType: 'entity.list',
            source: 'api',
            payload: {actorId, count: entities.length, limit, kind, direction},
          });

          return {entities};
        });

    scope.get(
        '/actors/:actorId/caches', {
          ...auth,
          schema: {
            summary: 'List actor caches',
            description: 'Lists caches for a specific actor.',
            operationId: 'actor_cache_list',
            tags: ['actor', 'cache'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({actorId: z.string().min(1)}).strict(),
                'ActorIdParams'),
            querystring: cacheQuerySchema,
            response: {
              200: cacheListResponseSchema,
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {actorId?: string};
          const actorId = normalizeString(params?.actorId);
          if (!actorId)
            return reply.status(400).send({error: 'actorId is required'});

          const actor = await requireActor(prisma, reply, actorId, userId);
          if (!actor) return;

          const query = request.query as {limit?: number | string};
          const limit = clampLimit(query?.limit, 100, 1, 500);
          const caches = await prisma.actorCache.findMany({
            where: {actorId},
            orderBy: {createdAt: 'desc'},
            take: limit,
          });

          await rt({
            eventType: 'actor.cache.list',
            source: 'api',
            payload: {
              actorId,
              count: caches.length,
              limit,
            },
          });

          return {caches};
        });

    scope.post(
        '/actors/:actorId/entities', {
          ...auth,
          schema:
              {
                summary: 'Create entity',
                description: 'Creates an entity for an actor.',
                operationId: 'actor_entity_create',
                tags: ['entity'],
                headers: authHeader,
                security: [{bearerAuth: []}],
                params: toJsonSchema(
                    z.object({actorId: z.string().min(1)}).strict(),
                    'ActorIdParams'),
                body: toJsonSchema(
                    z.object({
                       kind: EntityKindSchema,
                       direction: EntityDirectionSchema.nullable().optional(),
                       name: z.string().nullable().optional(),
                       targetType: z.string().nullable().optional(),
                       targetId: z.string().nullable().optional(),
                       source: z.string().nullable().optional(),
                       metadata: z.unknown().optional(),
                     }).strict(),
                    'ActorEntityCreateBody'),
                response:
                    {
                      200: toJsonSchema(
                          z.object({entity: entitySchema}).strict(),
                          'ActorEntityCreateResponse'),
                      ...StandardErrorResponses,
                    },
              },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {actorId?: string};
          const actorId = normalizeString(params?.actorId);
          if (!actorId)
            return reply.status(400).send({error: 'actorId is required'});

          const actor = await requireActor(prisma, reply, actorId, userId);
          if (!actor) return;

          const body = request.body as {
            kind?: string;
            direction?: string|null;
            name?: string|null;
            targetType?: string|null;
            targetId?: string|null;
            source?: string|null;
            metadata?: Prisma.JsonValue;
          };

          const kind = normalizeEntityKind(body?.kind);
          if (!kind) return reply.status(400).send({error: 'kind is required'});

          const entity = await prisma.entity.create({
            data: {
              actorId: actor.id,
              kind,
              direction: normalizeEntityDirection(body?.direction),
              name: optionalString(body?.name),
              targetType: optionalString(body?.targetType),
              targetId: optionalString(body?.targetId),
              source: optionalString(body?.source),
              metadata: readJsonValue(body?.metadata),
            },
          });

          await rt({
            eventType: 'entity.create',
            source: 'api',
            payload: {actorId: actor.id, entityId: entity.id, kind},
          });

          return {entity};
        });
  };

  const registerEntityRoutes = (scope: FastifyInstance) => {
    const auth = {preHandler: [scope.authenticate]};

    scope.get(
        '/entities/:id', {
          ...auth,
          schema: {
            summary: 'Get entity',
            description: 'Fetches a single entity by id.',
            operationId: 'entity_get',
            tags: ['entity'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({id: z.string().min(1)}).strict(), 'EntityIdParams'),
            response: {
              200: toJsonSchema(
                  z.object({entity: entitySchema}).strict(),
                  'EntityGetResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const entityId = normalizeString(params?.id);
          if (!entityId)
            return reply.status(400).send({error: 'id is required'});

          const entity = await prisma.entity.findFirst({
            where: {id: entityId, actor: {userId}},
          });
          if (!entity)
            return reply.status(404).send({error: 'Entity not found'});

          await rt({
            eventType: 'entity.fetch',
            source: 'api',
            payload: {entityId},
          });

          return {entity};
        });

    scope.get(
        '/entities/:id/caches', {
          ...auth,
          schema: {
            summary: 'List entity caches',
            description: 'Lists caches for a specific entity.',
            operationId: 'entity_cache_list',
            tags: ['entity', 'cache'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({id: z.string().min(1)}).strict(), 'EntityIdParams'),
            querystring: cacheQuerySchema,
            response: {
              200: cacheListResponseSchema,
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const entityId = normalizeString(params?.id);
          if (!entityId)
            return reply.status(400).send({error: 'id is required'});

          const entity = await requireEntity(prisma, reply, entityId, userId);
          if (!entity) return;

          const query = request.query as {limit?: number | string};
          const limit = clampLimit(query?.limit, 100, 1, 500);
          const caches = await prisma.entityCache.findMany({
            where: {entityId},
            orderBy: {createdAt: 'desc'},
            take: limit,
          });

          await rt({
            eventType: 'entity.cache.list',
            source: 'api',
            payload: {
              entityId,
              count: caches.length,
              limit,
            },
          });

          return {caches};
        });

    scope.patch(
        '/entities/:id', {
          ...auth,
          schema: {
            summary: 'Update entity',
            description: 'Updates an entity by id.',
            operationId: 'entity_update',
            tags: ['entity'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({id: z.string().min(1)}).strict(), 'EntityIdParams'),
            body: toJsonSchema(
                z.object({
                   kind: EntityKindSchema.optional(),
                   direction: EntityDirectionSchema.nullable().optional(),
                   name: z.string().nullable().optional(),
                   targetType: z.string().nullable().optional(),
                   targetId: z.string().nullable().optional(),
                   source: z.string().nullable().optional(),
                   metadata: z.unknown().optional(),
                 }).strict(),
                'EntityUpdateBody'),
            response: {
              200: toJsonSchema(
                  z.object({entity: entitySchema}).strict(),
                  'EntityUpdateResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const entityId = normalizeString(params?.id);
          if (!entityId)
            return reply.status(400).send({error: 'id is required'});

          const existing = await requireEntity(prisma, reply, entityId, userId);
          if (!existing) return;

          const body = request.body as {
            kind?: string;
            direction?: string|null;
            name?: string|null;
            targetType?: string|null;
            targetId?: string|null;
            source?: string|null;
            metadata?: Prisma.JsonValue;
          };

          const update: Prisma.EntityUpdateInput = {};
          if (body?.kind !== undefined)
            update.kind = normalizeEntityKind(body.kind) ?? undefined;
          if (body?.direction !== undefined)
            update.direction = normalizeEntityDirection(body.direction);
          if (body?.name !== undefined) update.name = optionalString(body.name);
          if (body?.targetType !== undefined)
            update.targetType = optionalString(body.targetType);
          if (body?.targetId !== undefined)
            update.targetId = optionalString(body.targetId);
          if (body?.source !== undefined)
            update.source = optionalString(body.source);
          if (body?.metadata !== undefined)
            update.metadata = readJsonValue(body.metadata);

          const entity = await prisma.entity.update({
            where: {id: entityId},
            data: update,
          });

          await rt({
            eventType: 'entity.update',
            source: 'api',
            payload: {entityId},
          });

          return {entity};
        });

    scope.delete(
        '/entities/:id', {
          ...auth,
          schema: {
            summary: 'Delete entity',
            description: 'Deletes an entity by id.',
            operationId: 'entity_delete',
            tags: ['entity'],
            headers: authHeader,
            security: [{bearerAuth: []}],
            params: toJsonSchema(
                z.object({id: z.string().min(1)}).strict(), 'EntityIdParams'),
            response: {
              200: toJsonSchema(
                  z.object({ok: z.literal(true)}).strict(),
                  'EntityDeleteResponse'),
              ...StandardErrorResponses,
            },
          },
        },
        async (request, reply) => {
          const rt = withTelemetryBase(recordTelemetry, request);
          const userId = (request.user as {sub: string}).sub;
          const params = request.params as {id?: string};
          const entityId = normalizeString(params?.id);
          if (!entityId)
            return reply.status(400).send({error: 'id is required'});

          const existing = await requireEntity(prisma, reply, entityId, userId);
          if (!existing) return;

          await prisma.entity.delete({where: {id: entityId}});

          await rt({
            eventType: 'entity.delete',
            source: 'api',
            payload: {entityId},
          });

          return {ok: true};
        });
  };

  void server.register(async (scope) => registerActorRoutes(scope), {
    prefix: '/actor',
  });
  void server.register(async (scope) => registerEntityRoutes(scope), {
    prefix: '/entity',
  });
}

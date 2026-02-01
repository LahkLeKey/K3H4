import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {type ActorType, type EntityDirection, type EntityKind,} from '../lib/actor-entity-constants';

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
  const auth = {preHandler: [server.authenticate]};

  server.get('/actors', auth, async (request) => {
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

  server.post('/actors', auth, async (request, reply) => {
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
    if (!label) return reply.status(400).send({error: 'label is required'});
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

  server.get('/actors/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const actorId = normalizeString(params?.id);
    if (!actorId) return reply.status(400).send({error: 'id is required'});

    const actor = await prisma.actor.findFirst({where: {id: actorId, userId}});
    if (!actor) return reply.status(404).send({error: 'Actor not found'});

    await rt({
      eventType: 'actor.fetch',
      source: 'api',
      payload: {actorId},
    });

    return {actor};
  });

  server.patch('/actors/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const actorId = normalizeString(params?.id);
    if (!actorId) return reply.status(400).send({error: 'id is required'});

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
    if (body?.label !== undefined) update.label = normalizeString(body.label);
    if (body?.note !== undefined) update.note = optionalString(body.note);
    if (body?.source !== undefined) update.source = optionalString(body.source);
    if (body?.category !== undefined)
      update.category = optionalString(body.category);
    if (body?.metadata !== undefined)
      update.metadata = readJsonValue(body.metadata);
    if (body?.lastSeenAt !== undefined) {
      const date = body.lastSeenAt ? new Date(body.lastSeenAt) : null;
      update.lastSeenAt = date && !Number.isNaN(date.getTime()) ? date : null;
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

  server.delete('/actors/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const actorId = normalizeString(params?.id);
    if (!actorId) return reply.status(400).send({error: 'id is required'});

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

  server.get('/actors/:actorId/entities', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {actorId?: string};
    const actorId = normalizeString(params?.actorId);
    if (!actorId) return reply.status(400).send({error: 'actorId is required'});

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

  server.post('/actors/:actorId/entities', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {actorId?: string};
    const actorId = normalizeString(params?.actorId);
    if (!actorId) return reply.status(400).send({error: 'actorId is required'});

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

  server.get('/entities/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const entityId = normalizeString(params?.id);
    if (!entityId) return reply.status(400).send({error: 'id is required'});

    const entity = await prisma.entity.findFirst({
      where: {id: entityId, actor: {userId}},
    });
    if (!entity) return reply.status(404).send({error: 'Entity not found'});

    await rt({
      eventType: 'entity.fetch',
      source: 'api',
      payload: {entityId},
    });

    return {entity};
  });

  server.patch('/entities/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const entityId = normalizeString(params?.id);
    if (!entityId) return reply.status(400).send({error: 'id is required'});

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
    if (body?.source !== undefined) update.source = optionalString(body.source);
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

  server.delete('/entities/:id', auth, async (request, reply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const userId = (request.user as {sub: string}).sub;
    const params = request.params as {id?: string};
    const entityId = normalizeString(params?.id);
    if (!entityId) return reply.status(400).send({error: 'id is required'});

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
}

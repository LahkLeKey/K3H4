import {type Entity, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import * as assignmentActor from '../actors/Assignment/Assignment';
import {findPersonaMap, findPersonaRecord} from '../kits/persona-matching';
import {createAssignment, createAssignmentTimecard, payAssignmentTimecard} from '../kits/assignment-ledger';
import {serializeAssignmentList} from '../kits/assignment-view';
import * as personaLedger from '../entities/Persona/Persona';
import type {PersonaRecord} from '../entities/Persona/Persona';
import {ENTITY_DIRECTIONS, ENTITY_KINDS} from '../lib/actor-entity-constants';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const EntityKind = ENTITY_KINDS;
const EntityDirection = ENTITY_DIRECTIONS;

const serializeMoney = (value: Prisma.Decimal) => value.toFixed(2);

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {} as Record<string, unknown>;
};

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return null;
};

const metadataDecimal =
    (metadata: Record<string, unknown>, key: string, fallback = '0.00') => {
      const value = metadata[key];
      if (typeof value === 'string' && value.length)
        return new Prisma.Decimal(value);
      if (typeof value === 'number' && Number.isFinite(value))
        return new Prisma.Decimal(value);
      if (value instanceof Prisma.Decimal) return value;
      if (typeof value === 'bigint')
        return new Prisma.Decimal(value.toString());
      return new Prisma.Decimal(fallback);
    };

const buildAssignmentRecordFromEntity = (entity: Entity) => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    title: metadataString(metadata, 'title') ?? '',
    hourlyRate: metadataDecimal(metadata, 'hourlyRate'),
    personaId: metadataString(metadata, 'personaId'),
  };
};

const buildTimecardRecord = (entity: Entity) => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    hours: metadataDecimal(metadata, 'hours'),
    amount: metadataDecimal(metadata, 'amount'),
    note: metadataString(metadata, 'note'),
    status: metadataString(metadata, 'status') ?? 'approved',
  };
};

const buildPayoutRecord = (entity: Entity) => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    amount: metadataDecimal(metadata, 'amount'),
    note: metadataString(metadata, 'note'),
    invoiceUrl: metadataString(metadata, 'invoiceUrl'),
    status: metadataString(metadata, 'status') ?? 'paid',
  };
};

const resolvePersonaResponse = (
    personaId: string|null|undefined,
    personaMap: Map<string, PersonaRecord>,
    ) => {
  if (!personaId) return null;
  const personaRecord = personaMap.get(personaId);
  return personaRecord ? personaLedger.personaRecordToResponse(personaRecord) :
                         null;
};

export function registerAssignmentRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/assignments',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const personaMap = await findPersonaMap(prisma, userId);
        const assignmentActorRecord =
            await assignmentActor.ensureAssignmentActor(prisma, userId);
        const {assignments, timecards, payouts} =
            await assignmentActor.loadAssignmentActorEntities(
                prisma, assignmentActorRecord.id);

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'assignment.list',
          source: 'api',
          payload: {count: assignments.length},
        });

        return {
          assignments: serializeAssignmentList(
              assignments, timecards, payouts, personaMap)
        };
      },
  );

  server.post(
      '/assignments',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          title?: string;
          personaId?: string;
          hourlyRate?: number|string
        }
        |undefined;

        const title = body?.title?.trim();
        const personaId = body?.personaId?.trim();
        const hourlyRate =
            body?.hourlyRate !== undefined ? Number(body.hourlyRate) : 100;
        if (!title || !personaId)
          return reply.status(400).send(
              {error: 'title and personaId are required'});
        if (!Number.isFinite(hourlyRate) || hourlyRate <= 0)
          return reply.status(400).send({error: 'hourlyRate must be positive'});

        const personaActor =
            await personaLedger.ensurePersonaActor(prisma, userId);
        const personaRecord = await findPersonaRecord(
            prisma, personaActor.id, personaId);
        if (!personaRecord)
          return reply.status(404).send({error: 'Persona not found'});

        const assignmentActorRecord =
            await assignmentActor.ensureAssignmentActor(prisma, userId);
        const assignment = await createAssignment(prisma, {
          userId,
          assignmentActorId: assignmentActorRecord.id,
          title,
          personaId,
          hourlyRate,
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'assignment.create',
          source: 'api',
          payload: {personaId},
        });

        const response = {
          ...assignment,
          persona: personaLedger.personaRecordToResponse(personaRecord),
          timecards: [],
          payouts: [],
        };
        return {assignment: response};
      },
  );

  server.post(
      '/assignments/:id/timecards',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const assignmentId = (request.params as {id: string}).id;
        const body = request.body as {
          hours?: number|string;
          note?: string
        }
        |undefined;

        const details = await assignmentActor.loadAssignmentDetails(
            prisma, userId, assignmentId);
        if (!details)
          return reply.status(404).send({error: 'Assignment not found'});
        const assignment = buildAssignmentRecordFromEntity(details.assignment);

        const hours = body?.hours !== undefined ? Number(body.hours) : NaN;
        if (!Number.isFinite(hours) || hours <= 0)
          return reply.status(400).send({error: 'hours must be positive'});

        const timecard = await prisma.$transaction(
            async (tx) => createAssignmentTimecard(tx, {
              assignmentActorId: details.assignment.actorId,
              assignmentId,
              hourlyRate: assignment.hourlyRate.toFixed(2),
              hours: hours.toFixed(2),
              note: body?.note,
            }));

        const personaMap = await findPersonaMap(prisma, userId);
        const updatedDetails = await assignmentActor.loadAssignmentDetails(
            prisma, userId, assignmentId);
        if (!updatedDetails)
          return reply.status(404).send({error: 'Assignment not found'});

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'assignment.timecard.create',
          source: 'api',
          payload: {
            assignmentId,
            hours,
            amount: timecard.amount,
          },
        });

        const response = serializeAssignmentList(
          [updatedDetails.assignment], updatedDetails.timecards,
          updatedDetails.payouts, personaMap)[0];
        return {assignment: response, timecard};
      },
  );

  const handleAssignmentPay = async (request: any, reply: any) => {
    const userId = (request.user as {sub: string}).sub;
    const assignmentId = (request.params as {id: string}).id;
    const body = request.body as {
      timecardId?: string;
      note?: string
    }
    |undefined;

    const details = await assignmentActor.loadAssignmentDetails(
        prisma, userId, assignmentId);
    if (!details)
      return reply.status(404).send({error: 'Assignment not found'});

    const timecardId = body?.timecardId?.trim();
    if (!timecardId)
      return reply.status(400).send({error: 'timecardId is required'});
    const timecardEntity = details.timecards.find((tc) => tc.id === timecardId);
    if (!timecardEntity)
      return reply.status(404).send({error: 'Timecard not found'});
    const timecard = buildTimecardRecord(timecardEntity);
    if (timecard.status === 'paid')
      return reply.status(400).send({error: 'Timecard already paid'});

    const personaMap = await findPersonaMap(prisma, userId);
    const assignmentMetadata = asRecord(details.assignment.metadata);
    const assignmentTitle =
        metadataString(assignmentMetadata, 'title') ?? 'assignment';
    try {
      const result = await prisma.$transaction(async (tx) =>
        payAssignmentTimecard(tx, {
          userId,
          assignmentActorId: details.assignment.actorId,
          assignmentId,
          assignmentTitle,
          timecardId,
          amount: timecard.amount.toFixed(2),
          note: body?.note,
        }));

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'assignment.payout',
        source: 'api',
        payload: {
          assignmentId,
          timecardId,
          amount: timecard.amount.toFixed(2),
        },
      });

      const updatedDetails = await assignmentActor.loadAssignmentDetails(
          prisma, userId, assignmentId);

        const assignmentResponse = updatedDetails ?
          serializeAssignmentList(
            [updatedDetails.assignment], updatedDetails.timecards,
            updatedDetails.payouts, personaMap)[0] :
          null;
      return {assignment: assignmentResponse, payout: result.payout};
    } catch (err) {
      request.log.error({err}, 'assignment payout failed');
      return reply.status(400).send({
        error: err instanceof Error ? err.message : 'Unable to process payout'
      });
    }
  };

  server.post(
      '/assignments/:id/actions/pay',
      {preHandler: [server.authenticate]},
      handleAssignmentPay,
  );
}

import {faker} from '@faker-js/faker';
import {type Entity, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import * as assignmentActor from '../actors/Assignment/Assignment';
import {recordBankTransactionEntity} from '../actors/Bank/Bank';
import * as personaLedger from '../entities/Persona/Persona';
import type {PersonaRecord} from '../entities/Persona/Persona';
import {ENTITY_DIRECTIONS, ENTITY_KINDS} from '../lib/actor-entity-constants';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const EntityKind = ENTITY_KINDS;
const EntityDirection = ENTITY_DIRECTIONS;

const serializeMoney = (value: Prisma.Decimal) => value.toFixed(2);

const serializeAssignment = (assignment: any) => ({
  ...assignment,
  hourlyRate: serializeMoney(assignment.hourlyRate),
  persona: assignment.persona,
  timecards: assignment.timecards?.map((tc: any) => ({
                                         ...tc,
                                         hours: serializeMoney(tc.hours),
                                         amount: serializeMoney(tc.amount),
                                       })) ??
      [],
  payouts: assignment.payouts?.map((p: any) => ({
                                     ...p,
                                     amount: serializeMoney(p.amount),
                                   })) ??
      [],
});

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

const groupByTargetId = (entities: Entity[]) => {
  const map = new Map<string, Entity[]>();
  entities.forEach((entity) => {
    if (!entity.targetId) return;
    const list = map.get(entity.targetId) ?? [];
    list.push(entity);
    map.set(entity.targetId, list);
  });
  return map;
};

const buildSerializedAssignment = (
    entity: Entity,
    timecards: Entity[],
    payouts: Entity[],
    personaMap: Map<string, PersonaRecord>,
    ) => {
  const assignment = buildAssignmentRecordFromEntity(entity);
  const persona = resolvePersonaResponse(assignment.personaId, personaMap);
  return serializeAssignment({
    ...assignment,
    persona,
    timecards: timecards.map(buildTimecardRecord),
    payouts: payouts.map(buildPayoutRecord),
  });
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
        const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
        const assignmentActorRecord =
            await assignmentActor.ensureAssignmentActor(prisma, userId);
        const {assignments, timecards, payouts} =
            await assignmentActor.loadAssignmentActorEntities(
                prisma, assignmentActorRecord.id);

        const timecardsByAssignment = groupByTargetId(timecards);
        const payoutsByAssignment = groupByTargetId(payouts);

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'assignment.list',
          source: 'api',
          payload: {count: assignments.length},
        });

        return {
          assignments: assignments.map(
              (assignment) => buildSerializedAssignment(
                  assignment, timecardsByAssignment.get(assignment.id) ?? [],
                  payoutsByAssignment.get(assignment.id) ?? [], personaMap))
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
        const personaRecord = await personaLedger.loadPersonaRecordById(
            prisma, personaActor.id, personaId);
        if (!personaRecord)
          return reply.status(404).send({error: 'Persona not found'});

        const assignmentActorRecord =
            await assignmentActor.ensureAssignmentActor(prisma, userId);
        const entity = await prisma.entity.create({
          data: {
            actorId: assignmentActorRecord.id,
            kind: EntityKind.ASSIGNMENT,
            targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
            name: title,
            source: assignmentActor.ASSIGNMENT_ACTOR_SOURCE,
            metadata: {
              title,
              hourlyRate: new Prisma.Decimal(hourlyRate).toFixed(2),
              personaId,
            },
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'assignment.create',
          source: 'api',
          payload: {personaId},
        });

        const assignment = buildAssignmentRecordFromEntity(entity);
        const response = serializeAssignment({
          ...assignment,
          persona: personaLedger.personaRecordToResponse(personaRecord),
          timecards: [],
          payouts: [],
        });
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

        const hoursDecimal = new Prisma.Decimal(hours.toFixed(2));
        const amount = hoursDecimal.mul(assignment.hourlyRate);
        const timecardEntity = await prisma.entity.create({
          data: {
            actorId: details.assignment.actorId,
            kind: EntityKind.ASSIGNMENT_TIMECARD,
            targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
            targetId: assignmentId,
            source: assignmentActor.ASSIGNMENT_ACTOR_SOURCE,
            metadata: {
              hours: hoursDecimal.toFixed(2),
              amount: amount.toFixed(2),
              note: body?.note?.trim() || null,
              status: 'approved',
            },
          },
        });

        const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
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
            amount: amount.toFixed(2),
          },
        });

        const response = buildSerializedAssignment(
            updatedDetails.assignment, updatedDetails.timecards,
            updatedDetails.payouts, personaMap);
        const timecardResponse =
            serializeAssignment({
              hourlyRate: assignment.hourlyRate,
              persona: null,
              timecards: [buildTimecardRecord(timecardEntity)],
              payouts: [],
            }).timecards[0];

        return {assignment: response, timecard: timecardResponse};
      },
  );

  server.post(
      '/assignments/:id/pay',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
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
        const timecardEntity =
            details.timecards.find((tc) => tc.id === timecardId);
        if (!timecardEntity)
          return reply.status(404).send({error: 'Timecard not found'});
        const timecard = buildTimecardRecord(timecardEntity);
        if (timecard.status === 'paid')
          return reply.status(400).send({error: 'Timecard already paid'});

        const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
        const assignmentMetadata = asRecord(details.assignment.metadata);
        const assignmentTitle =
            metadataString(assignmentMetadata, 'title') ?? 'assignment';
        try {
          const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
              where: {id: userId},
              select: {k3h4CoinBalance: true},
            });
            if (!user) throw new Error('User not found');

            const nextBalance = user.k3h4CoinBalance.sub(timecard.amount);
            const savedUser = await tx.user.update({
              where: {id: userId},
              data: {k3h4CoinBalance: nextBalance},
            });

            const bankTxn = await recordBankTransactionEntity(tx, {
              userId,
              amount: timecard.amount,
              direction: EntityDirection.DEBIT,
              kind: EntityKind.ASSIGNMENT_PAYOUT,
              note: body?.note ?? `Payout for ${assignmentTitle}`,
              balanceAfter: savedUser.k3h4CoinBalance,
              targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
              targetId: assignmentId,
              name: assignmentTitle,
            });

            const payoutEntity = await tx.entity.create({
              data: {
                actorId: details.assignment.actorId,
                kind: EntityKind.ASSIGNMENT_PAYOUT,
                targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
                targetId: assignmentId,
                source: assignmentActor.ASSIGNMENT_ACTOR_SOURCE,
                metadata: {
                  amount: timecard.amount.toFixed(2),
                  note: body?.note?.trim() ?? `Timecard payout ${timecard.id}`,
                  invoiceUrl: `https://invoices.k3h4.local/${
                      faker.string.alphanumeric(8).toLowerCase()}`,
                  status: 'paid',
                },
              },
            });

            const existingMetadata = asRecord(timecardEntity.metadata);
            await tx.entity.update({
              where: {id: timecardEntity.id},
              data: {metadata: {...existingMetadata, status: 'paid'}},
            });

            return {bankTxn, payoutEntity};
          });

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
              buildSerializedAssignment(
                  updatedDetails.assignment, updatedDetails.timecards,
                  updatedDetails.payouts, personaMap) :
              null;
          const payoutResponse =
              serializeAssignment({
                hourlyRate:
                    buildAssignmentRecordFromEntity(
                        updatedDetails?.assignment ?? details.assignment)
                        .hourlyRate,
                persona: null,
                timecards: [],
                payouts: [buildPayoutRecord(result.payoutEntity)],
              }).payouts[0];

          return {assignment: assignmentResponse, payout: payoutResponse};
        } catch (err) {
          request.log.error({err}, 'assignment payout failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to process payout'
          });
        }
      },
  );
}

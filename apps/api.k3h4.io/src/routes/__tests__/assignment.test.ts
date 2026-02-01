import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import * as assignmentActor from '../../actors/Assignment/Assignment';
import * as personaLedger from '../../entities/Persona/Persona';
import type {PersonaRecord} from '../../entities/Persona/Persona';
import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {registerAssignmentRoutes} from '../assignment';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
const EntityKind = ENTITY_KINDS;
const personaActor = {
  id: 'actor-1',
  userId,
  type: 'persona'
};
const personaRecord: PersonaRecord = {
  id: 'p1',
  alias: 'Alias',
  account: 'alias@test.com',
  handle: '@alias',
  note: null,
  tags: [],
  attributes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
const assignmentActorStub = {
  id: 'assignment-actor-1',
  userId,
  type: 'assignment'
};

const buildAssignmentEntity = (overrides: Partial<any> = {}) => {
  const baseMetadata = {
    title: 'Gig',
    hourlyRate: '100.00',
    personaId: personaRecord.id,
  };
  return {
    id: 'a1',
    actorId: assignmentActorStub.id,
    kind: EntityKind.ASSIGNMENT,
    targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
    targetId: null,
    name: null,
    source: null,
    direction: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
    metadata: {...baseMetadata, ...(overrides.metadata ?? {})},
  };
};

const buildTimecardEntity =
    (assignmentId: string, overrides: Partial<any> = {}) => {
      const baseMetadata = {
        hours: '1.00',
        amount: '100.00',
        status: 'approved',
        note: 'demo',
      };
      return {
        id: 't1',
        actorId: assignmentActorStub.id,
        kind: EntityKind.ASSIGNMENT_TIMECARD,
        targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        name: null,
        source: null,
        direction: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
        metadata: {...baseMetadata, ...(overrides.metadata ?? {})},
      };
    };

const buildPayoutEntity =
    (assignmentId: string, overrides: Partial<any> = {}) => {
      const baseMetadata = {
        amount: '100.00',
        note: 'payout',
        status: 'paid',
        invoiceUrl: 'https://example.com/invoice',
      };
      return {
        id: 'p1',
        actorId: assignmentActorStub.id,
        kind: EntityKind.ASSIGNMENT_PAYOUT,
        targetType: assignmentActor.ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        name: null,
        source: null,
        direction: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
        metadata: {...baseMetadata, ...(overrides.metadata ?? {})},
      };
    };

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerAssignmentRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe('assignment routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    vi.restoreAllMocks();
    vi.spyOn(personaLedger, 'ensurePersonaActor')
        .mockResolvedValue(personaActor as any);
    vi.spyOn(personaLedger, 'personaRecordToResponse')
        .mockImplementation(
            (persona) => ({
              id: persona.id,
              alias: persona.alias,
              account: persona.account,
              handle: persona.handle ?? undefined,
              note: persona.note ?? undefined,
              tags: persona.tags,
              attributes: persona.attributes.map((attr) => ({
                                                   id: attr.id,
                                                   category: attr.category,
                                                   value: attr.value,
                                                   weight: attr.weight,
                                                 })),
              createdAt: persona.createdAt,
              updatedAt: persona.updatedAt,
            }));
    vi.spyOn(assignmentActor, 'ensureAssignmentActor')
        .mockResolvedValue(assignmentActorStub as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('lists assignments', async () => {
    const loadMapSpy =
        vi.spyOn(personaLedger, 'loadPersonaMap')
            .mockResolvedValue(new Map([[personaRecord.id, personaRecord]]));
    const assignmentEntity = buildAssignmentEntity();
    const loadEntitiesSpy =
        vi.spyOn(assignmentActor, 'loadAssignmentActorEntities')
            .mockResolvedValue({
              assignments: [assignmentEntity],
              timecards: [buildTimecardEntity(assignmentEntity.id)],
              payouts: [],
            });
    const prisma = {entity: {}};
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/assignments'});
    expect(res.statusCode).toBe(200);
    expect(loadMapSpy).toHaveBeenCalled();
    expect(loadEntitiesSpy).toHaveBeenCalled();
    expect(res.json().assignments[0].persona).toEqual(expect.objectContaining({
      id: personaRecord.id,
      alias: personaRecord.alias,
    }));
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'assignment.list'}));
  });

  it('creates an assignment', async () => {
    const loadRecordSpy = vi.spyOn(personaLedger, 'loadPersonaRecordById')
                              .mockResolvedValue(personaRecord);
    const createSpy = vi.fn().mockResolvedValue(buildAssignmentEntity({
      id: 'a2',
      metadata:
          {title: 'New Gig', hourlyRate: '50.00', personaId: personaRecord.id},
    }));
    const prisma = {entity: {create: createSpy}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/assignments',
      payload: {title: 'New Gig', personaId: 'p1', hourlyRate: 50}
    });
    expect(res.statusCode).toBe(200);
    expect(createSpy).toHaveBeenCalled();
    expect(loadRecordSpy).toHaveBeenCalledWith(prisma, personaActor.id, 'p1');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'assignment.create'}));
  });

  it('rejects missing title', async () => {
    const prisma = {
      persona: {findFirst: vi.fn()},
      assignment: {create: vi.fn()}
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/assignments', payload: {personaId: 'p1'}});
    expect(res.statusCode).toBe(400);
  });

  it('creates a timecard and payout', async () => {
    const assignment = buildAssignmentEntity({id: 'a3'});
    const timecard = buildTimecardEntity(assignment.id);
    const paidTimecard = buildTimecardEntity(
        assignment.id, {metadata: {...timecard.metadata, status: 'paid'}});
    const payout = buildPayoutEntity(assignment.id);
    const loadDetailsSpy =
        vi.spyOn(assignmentActor, 'loadAssignmentDetails')
            .mockResolvedValueOnce({assignment, timecards: [], payouts: []})
            .mockResolvedValueOnce(
                {assignment, timecards: [timecard], payouts: []})
            .mockResolvedValueOnce(
                {assignment, timecards: [timecard], payouts: []})
            .mockResolvedValueOnce(
                {assignment, timecards: [paidTimecard], payouts: [payout]});
    const loadMapSpy =
        vi.spyOn(personaLedger, 'loadPersonaMap')
            .mockResolvedValue(new Map([[personaRecord.id, personaRecord]]));

    const txUser = {
      findUnique: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('200.00')}),
      update: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('100.00')}),
    };
    const txActor = {
      findFirst: vi.fn().mockResolvedValue({id: 'actor-1'}),
      create: vi.fn()
    };
    const txEntity = {
      create: vi.fn().mockResolvedValue({
        id: 'txn-1',
        direction: 'DEBIT',
        kind: 'ASSIGNMENT_PAYOUT',
        metadata: {
          amount: '100.00',
          balanceAfter: '100.00',
          direction: 'debit',
          kind: 'assignment_payout',
          note: 'pay now'
        },
        createdAt: new Date()
      }),
      update: vi.fn(),
    };
    const txPayout = {
      create: vi.fn().mockResolvedValue(
          {id: 'pay1', amount: new Prisma.Decimal('100')})
    };
    const txTimecard = {update: vi.fn()};

    const createTimecardSpy = vi.fn().mockResolvedValue(timecard);
    const prisma = {
      entity: {create: createTimecardSpy},
      user: {},
      $transaction: vi.fn(async (cb) => cb({
                            user: txUser,
                            actor: txActor,
                            entity: txEntity,
                            assignmentPayout: txPayout,
                            assignmentTimecard: txTimecard,
                          } as any)),
    };
    const server = buildServer(prisma);

    const timecardRes = await server.inject({
      method: 'POST',
      url: '/assignments/a3/timecards',
      payload: {hours: 1}
    });
    expect(timecardRes.statusCode).toBe(200);
    expect(createTimecardSpy).toHaveBeenCalled();

    const payRes = await server.inject({
      method: 'POST',
      url: '/assignments/a3/pay',
      payload: {timecardId: 't1', note: 'pay now'}
    });
    expect(payRes.statusCode).toBe(200);
    expect(txEntity.create).toHaveBeenCalled();
    expect(loadDetailsSpy).toHaveBeenCalledTimes(4);
    expect(loadMapSpy).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'assignment.payout'}));
  });

  it('rejects invalid timecard hours', async () => {
    const assignment = buildAssignmentEntity({id: 'a3'});
    vi.spyOn(assignmentActor, 'loadAssignmentDetails')
        .mockResolvedValue({assignment, timecards: [], payouts: []});
    const prisma = {entity: {}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/assignments/a3/timecards',
      payload: {hours: 0}
    });
    expect(res.statusCode).toBe(400);
  });

  it('handles payout errors gracefully', async () => {
    const assignment = buildAssignmentEntity({id: 'a4'});
    const timecard = buildTimecardEntity(assignment.id);
    const findFirstSpy = vi.fn().mockResolvedValue(assignment);
    const findManySpy = vi.fn(({where}) => {
      if (where.kind === EntityKind.ASSIGNMENT_TIMECARD) return [timecard];
      if (where.kind === EntityKind.ASSIGNMENT_PAYOUT) return [];
      return [];
    });
    const prisma = {
      entity: {
        findFirst: findFirstSpy,
        findMany: findManySpy,
        name: null,
        source: null,
        direction: null,
      },
      user: {},
      actor: {
        findFirst: vi.fn().mockResolvedValue(assignmentActorStub),
        create: vi.fn().mockResolvedValue(assignmentActorStub),
      },
      assignmentPayout: {},
      assignmentTimecard: {},
      $transaction: vi.fn(async () => {
        throw new Error('payout fail');
      }),
    };
    const loadMapSpy =
        vi.spyOn(personaLedger, 'loadPersonaMap').mockResolvedValue(new Map());
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/assignments/a4/pay',
      payload: {timecardId: 't1'}
    });
    expect(res.statusCode).toBe(400);
  });

  it('returns payout even when refreshed assignment missing', async () => {
    const assignment = buildAssignmentEntity({id: 'a5'});
    const timecard = buildTimecardEntity(assignment.id);
    const loadDetailsSpy =
        vi.spyOn(assignmentActor, 'loadAssignmentDetails')
            .mockResolvedValueOnce(
                {assignment, timecards: [timecard], payouts: []})
            .mockResolvedValueOnce(null);
    const loadMapSpy =
        vi.spyOn(personaLedger, 'loadPersonaMap')
            .mockResolvedValue(new Map([[personaRecord.id, personaRecord]]));
    const txUser = {
      findUnique: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('100.00')}),
      update: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('50.00')}),
    };
    const txActor = {
      findFirst: vi.fn().mockResolvedValue({id: 'actor-1'}),
      create: vi.fn()
    };
    const txEntity = {
      create: vi.fn().mockResolvedValue({
        id: 'txn-2',
        direction: 'DEBIT',
        kind: 'ASSIGNMENT_PAYOUT',
        metadata: {
          amount: '50.00',
          balanceAfter: '50.00',
          direction: 'debit',
          kind: 'assignment_payout',
          note: ''
        },
        createdAt: new Date()
      }),
      update: vi.fn(),
    };
    const txPayout = {
      create: vi.fn().mockResolvedValue(
          {id: 'pay-missing', amount: new Prisma.Decimal('50'), note: ''}),
    };
    const prisma = {
      entity: {},
      user: txUser,
      actor: txActor,
      assignmentPayout: txPayout,
      $transaction: vi.fn(async (cb) => cb({
                            user: txUser,
                            actor: txActor,
                            entity: txEntity,
                            assignmentPayout: txPayout,
                            assignmentTimecard: {update: txEntity.update},
                          } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/assignments/a5/pay',
      payload: {timecardId: 't1'}
    });
    if (res.statusCode !== 200) {
      console.error('payout missing assignment error', res.json());
    }
    expect(res.statusCode).toBe(200);
    expect(loadDetailsSpy).toHaveBeenCalledTimes(2);
    expect(loadMapSpy).toHaveBeenCalled();
    expect(res.json().assignment).toBeNull();
    expect(res.json().payout).toBeDefined();
  });
});

import '../../test/vitest-setup';

import {Entity} from '@prisma/client';
import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import * as staffingActor from '../../actors/Staffing/Staffing';
import * as personaLedger from '../../entities/Persona/Persona';
import type {PersonaRecord} from '../../entities/Persona/Persona';
import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {registerStaffingRoutes} from '../staffing';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
const EntityKind = ENTITY_KINDS;
const staffingLedger = {
  id: 'actor-staff',
  userId,
  type: 'staffing'
};
const personaLedgerActor = {
  id: 'actor-persona',
  userId,
  type: 'persona'
};

const samplePersona: PersonaRecord = {
  id: 'p1',
  alias: 'Ada',
  account: 'ada@test.com',
  handle: '@ada',
  note: 'dev',
  tags: [],
  attributes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerStaffingRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

const buildEntity = (overrides: Partial<Entity>): Entity => ({
  id: overrides.id ?? 'entity-1',
  actorId: staffingLedger.id,
  kind: overrides.kind ?? EntityKind.STAFFING_ENGAGEMENT,
  direction: null,
  name: null,
  targetType: null,
  targetId: null,
  source: null,
  metadata: overrides.metadata ?? {},
  createdAt: overrides.createdAt ?? new Date(),
  updatedAt: overrides.updatedAt ?? new Date(),
});

describe('staffing routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    vi.restoreAllMocks();
    vi.spyOn(staffingActor, 'ensureStaffingActor')
        .mockResolvedValue(staffingLedger as any);
    vi.spyOn(personaLedger, 'ensurePersonaActor')
        .mockResolvedValue(personaLedgerActor as any);
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the dashboard and emits telemetry', async () => {
    vi.spyOn(personaLedger, 'loadPersonaMap')
        .mockResolvedValue(new Map([[samplePersona.id, samplePersona]]));
    vi.spyOn(staffingActor, 'loadStaffingEntities').mockResolvedValue({
      engagements: [buildEntity({
        id: 'eng-1',
        metadata: {
          name: 'Ops Engagement',
          client: 'k3h4',
          startDate: new Date().toISOString()
        },
      })],
      roles: [buildEntity({
        id: 'role-1',
        kind: EntityKind.STAFFING_ROLE,
        metadata: {engagementId: 'eng-1', title: 'Estimator', status: 'OPEN'},
      })],
      candidates: [buildEntity({
        id: 'candidate-1',
        kind: EntityKind.STAFFING_CANDIDATE,
        metadata: {
          engagementId: 'eng-1',
          roleId: 'role-1',
          personaId: 'p1',
          fullName: 'Ada Candidate',
        },
      })],
      shifts: [buildEntity({
        id: 'shift-1',
        kind: EntityKind.STAFFING_SHIFT,
        metadata: {
          roleId: 'role-1',
          title: 'Shift 1',
          startsAt: new Date().toISOString(),
          endsAt: new Date(Date.now() + 3600000).toISOString(),
        },
      })],
      placements: [],
    });

    const server = buildServer({});
    const res =
        await server.inject({method: 'GET', url: '/staffing/dashboard'});
    expect(res.statusCode).toBe(200);
    expect(res.json().engagements[0].name).toBe('Ops Engagement');
    expect(res.json().roles[0].title).toBe('Estimator');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.dashboard.loaded'}));
  });

  it('creates an engagement and records telemetry', async () => {
    const entityCreate = vi.fn().mockResolvedValue(buildEntity({
      id: 'eng-2',
      metadata: {name: 'New Engagement'},
    }));
    const prisma = {entity: {create: entityCreate}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/staffing/engagements',
      payload: {name: 'New Engagement', status: 'ACTIVE'}
    });
    expect(res.statusCode).toBe(200);
    expect(entityCreate).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({kind: EntityKind.STAFFING_ENGAGEMENT})
    }));
    expect(res.json().engagement.name).toBe('New Engagement');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.engagement.create'}));
  });

  it('updates candidate stage and returns serialized candidate', async () => {
    const candidateEntity = buildEntity({
      id: 'candidate-1',
      kind: EntityKind.STAFFING_CANDIDATE,
      metadata: {stage: 'prospect', fullName: 'Ada Candidate'},
    });
    vi.spyOn(staffingActor, 'loadStaffingEntityByKind')
        .mockResolvedValue(candidateEntity);
    vi.spyOn(personaLedger, 'loadPersonaMap')
        .mockResolvedValue(new Map([[samplePersona.id, samplePersona]]));
    const findUnique = vi.fn().mockResolvedValue(buildEntity({
      id: 'candidate-1',
      kind: EntityKind.STAFFING_CANDIDATE,
      metadata: {stage: 'interviewing', fullName: 'Ada Candidate'},
    }));
    const update = vi.fn().mockResolvedValue({});
    const entity = {findUnique, update};

    const prisma = {entity};
    const server = buildServer(prisma);

    const res = await server.inject({
      method: 'POST',
      url: '/staffing/candidates/candidate-1/actions/stage',
      payload: {stage: 'interviewing'}
    });
    expect(res.statusCode).toBe(200);
    expect(update).toHaveBeenCalled();
    expect(findUnique).toHaveBeenCalled();
    expect(res.json().candidate.stage).toBe('interviewing');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.candidate.stage'}));
  });

  it('returns 400 when stage payload is missing', async () => {
    const prisma = {entity: {findUnique: vi.fn(), update: vi.fn()}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/staffing/candidates/candidate-1/actions/stage',
      payload: {} as any
    });
    expect(res.statusCode).toBe(400);
  });
});

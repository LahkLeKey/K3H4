import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as personaLedger from '../../services/persona-ledger';
import type {PersonaRecord} from '../../services/persona-ledger';
import {registerPersonaRoutes} from '../persona';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';
const actorStub = {
  id: 'actor-1',
  userId,
  type: 'persona',
  label: 'Persona Ledger',
  note: 'ledger',
  source: 'tests',
};

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerPersonaRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

const buildPersonaRecord = (
    overrides?: Partial<PersonaRecord>,
    ): PersonaRecord => ({
  id: 'persona-1',
  alias: 'Persona Alias',
  account: 'persona@k3h4.io',
  handle: '@persona',
  note: 'demo',
  tags: ['alpha'],
  attributes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('persona routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    vi.restoreAllMocks();
    vi.spyOn(personaLedger, 'ensurePersonaActor')
        .mockResolvedValue(actorStub as any);
    vi.spyOn(personaLedger, 'personaRecordToResponse')
        .mockImplementation((persona) => ({
                              id: persona.id,
                              alias: persona.alias,
                            }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('seeds personas when none exist', async () => {
    const record = buildPersonaRecord({id: 'p1'});
    const loadSpy = vi.spyOn(personaLedger, 'loadPersonaRecordsByActor')
                        .mockResolvedValueOnce([])
                        .mockResolvedValueOnce([record])
                        .mockResolvedValue([record]);
    const prisma = {
      entity: {
        createMany: vi.fn().mockResolvedValue({count: 3}),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/personas'});
    expect(res.statusCode).toBe(200);
    expect(prisma.entity.createMany).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalledTimes(3);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'persona.list'}));
    expect(res.json().personas).toEqual([{id: 'p1', alias: 'Persona Alias'}]);
  });

  it('creates a persona with attributes', async () => {
    const persona = buildPersonaRecord({id: 'p2'});
    vi.spyOn(personaLedger, 'loadPersonaRecordById').mockResolvedValue(persona);
    const buildAttributesSpy =
        vi.spyOn(personaLedger, 'buildPersonaAttributeEntities')
            .mockReturnValue([
              {
                actorId: actorStub.id,
                kind: 'persona_attribute',
                targetType: 'persona',
                targetId: persona.id,
                metadata: {category: 'skill', value: 'ops', weight: 1},
              },
            ] as any);
    const prisma = {
      entity: {
        create: vi.fn().mockResolvedValue({id: persona.id}),
        createMany: vi.fn().mockResolvedValue({count: 1}),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/personas',
      payload: {
        alias: 'Persona Alias',
        account: 'persona@k3h4.io',
        attributes: [{category: 'skill', values: ['ops']}],
      },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.entity.create).toHaveBeenCalled();
    expect(buildAttributesSpy).toHaveBeenCalled();
    expect(prisma.entity.createMany).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'persona.create'}));
    expect(res.json().persona)
        .toEqual({id: persona.id, alias: 'Persona Alias'});
  });

  it('updates persona attributes', async () => {
    const persona = buildPersonaRecord({id: 'p3'});
    vi.spyOn(personaLedger, 'loadPersonaRecordById').mockResolvedValue(persona);
    const buildAttributesSpy =
        vi.spyOn(personaLedger, 'buildPersonaAttributeEntities')
            .mockReturnValue([
              {
                actorId: actorStub.id,
                kind: 'persona_attribute',
                targetType: 'persona',
                targetId: persona.id,
                metadata: {category: 'tone', value: 'playful', weight: 1},
              },
            ] as any);
    const prisma = {
      entity: {
        deleteMany: vi.fn().mockResolvedValue({count: 1}),
        createMany: vi.fn().mockResolvedValue({count: 1}),
      },
      $transaction: vi.fn(async (ops: Promise<unknown>[]) => Promise.all(ops)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'PUT',
      url: '/personas/p3/attributes',
      payload: {attributes: [{category: 'tone', values: ['playful']}]},
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.entity.deleteMany).toHaveBeenCalled();
    expect(buildAttributesSpy).toHaveBeenCalled();
    expect(prisma.entity.createMany).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'persona.attributes.update'}));
  });
});

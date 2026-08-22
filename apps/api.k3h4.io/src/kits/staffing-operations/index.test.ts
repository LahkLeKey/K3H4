import '../../test/vitest-setup';

import {Prisma, type Entity} from '@prisma/client';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as staffingActor from '../../actors/Staffing/Staffing';
import * as personaMatching from '../persona-matching';
import {createStaffingCandidate, createStaffingEngagement, createStaffingPlacement, createStaffingRole, createStaffingShift, getStaffingDashboard, StaffingOperationsError, updateStaffingCandidateStage} from './index';

vi.mock('../persona-matching', () => ({
  findPersonaMap: vi.fn(),
}));

const userId = 'user-1';
const actorId = 'staffing-actor-1';
const now = new Date('2026-08-22T12:00:00.000Z');

const entity = (
    id: string, kind: Entity['kind'], metadata: Record<string, unknown>,
    ): Entity => ({
  id,
  actorId,
  kind,
  direction: null,
  name: null,
  targetType: null,
  targetId: null,
  source: 'k3h4-staffing',
  metadata: metadata as Prisma.JsonObject,
  isGlobal: false,
  createdAt: now,
  updatedAt: now,
});

describe('Staffing operations Kit', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(staffingActor, 'ensureStaffingActor').mockResolvedValue({
      id: actorId,
      userId,
      type: 'staffing',
    } as any);
    vi.mocked(personaMatching.findPersonaMap).mockResolvedValue(new Map([[
      'persona-1',
      {
        id: 'persona-1',
        alias: 'Ada',
        account: 'ada@example.com',
        handle: '@ada',
      } as any,
    ]]));
  });

  it('builds the staffing dashboard with coverage and persona summaries', async () => {
    vi.spyOn(staffingActor, 'loadStaffingEntities').mockResolvedValue({
      engagements: [entity('engagement-1', 'staffing_engagement', {
        name: 'Launch',
        budget: '1000.00',
      })],
      roles: [entity('role-1', 'staffing_role', {
        engagementId: 'engagement-1',
        title: 'Operator',
        openings: 2,
        status: 'OPEN',
        billRate: '80.00',
      })],
      candidates: [entity('candidate-1', 'staffing_candidate', {
        engagementId: 'engagement-1',
        roleId: 'role-1',
        personaId: 'persona-1',
        fullName: 'Ada Candidate',
        score: '91.50',
      })],
      shifts: [entity('shift-1', 'staffing_shift', {
        roleId: 'role-1',
        title: 'Morning',
        assignedPersonaId: 'persona-1',
      })],
      placements: [entity('placement-1', 'staffing_placement', {
        engagementId: 'engagement-1',
        roleId: 'role-1',
        candidateId: 'candidate-1',
        personaId: 'persona-1',
        status: 'ACTIVE',
        billRate: '80.00',
        payRate: '50.00',
      })],
    });

    const dashboard = await getStaffingDashboard({} as any, userId);

    expect(dashboard.metrics).toEqual({
      openRoles: 1,
      activeCandidates: 1,
      scheduledShifts: 1,
      activePlacements: 1,
      fillRate: 50,
    });
    expect(dashboard.engagements[0]).toEqual(expect.objectContaining({
      id: 'engagement-1',
      budget: '1000.00',
      roles: [expect.objectContaining({id: 'role-1', billRate: '80.00'})],
      candidates: [expect.objectContaining({
        id: 'candidate-1',
        score: '91.50',
        persona: {
          id: 'persona-1',
          alias: 'Ada',
          account: 'ada@example.com',
          handle: '@ada',
        },
      })],
      placements: [expect.objectContaining({
        id: 'placement-1',
        margin: '30.00',
      })],
    }));
  });

  it('creates an engagement with the existing entity format', async () => {
    const create = vi.fn().mockImplementation(async ({data}) => entity(
        'engagement-2', data.kind, data.metadata));
    const prisma = {entity: {create}} as any;

    const engagement = await createStaffingEngagement(prisma, userId, {
      name: '  Expansion  ',
      client: '  K3H4  ',
      status: 'ACTIVE',
      budget: 1250,
    });

    expect(create).toHaveBeenCalledWith({data: {
      actorId,
      kind: 'staffing_engagement',
      source: 'k3h4-staffing',
      metadata: {
        name: 'Expansion',
        client: 'K3H4',
        priority: 'MEDIUM',
        status: 'ACTIVE',
        startDate: null,
        endDate: null,
        budget: '1250.00',
        forecast: null,
        notes: null,
      },
    }});
    expect(engagement).toEqual(expect.objectContaining({
      id: 'engagement-2',
      name: 'Expansion',
      budget: '1250.00',
      roles: [],
      candidates: [],
      placements: [],
    }));
  });

  it('creates roles and candidates with owned references and Persona Kit data', async () => {
    const engagement = entity(
        'engagement-1', 'staffing_engagement', {name: 'Launch'});
    vi.spyOn(staffingActor, 'loadStaffingEntityByKind')
        .mockResolvedValueOnce(engagement)
        .mockResolvedValueOnce(engagement)
        .mockResolvedValueOnce(entity(
            'role-1', 'staffing_role', {title: 'Operator'}));
    const create = vi.fn()
        .mockImplementationOnce(async ({data}) =>
          entity('role-1', data.kind, data.metadata))
        .mockImplementationOnce(async ({data}) =>
          entity('candidate-1', data.kind, data.metadata));
    const prisma = {entity: {create}} as any;

    const role = await createStaffingRole(prisma, userId, {
      engagementId: 'engagement-1',
      title: ' Operator ',
      openings: '2',
      skills: [' Dispatch ', ''],
    });
    const candidate = await createStaffingCandidate(prisma, userId, {
      engagementId: 'engagement-1',
      roleId: 'role-1',
      personaId: 'persona-1',
      fullName: ' Ada Candidate ',
      score: 91.5,
    });

    expect(role).toEqual(expect.objectContaining({
      id: 'role-1',
      title: 'Operator',
      openings: 2,
      skills: ['Dispatch'],
    }));
    expect(candidate).toEqual(expect.objectContaining({
      id: 'candidate-1',
      fullName: 'Ada Candidate',
      score: '91.50',
      persona: expect.objectContaining({id: 'persona-1', alias: 'Ada'}),
    }));
    expect(personaMatching.findPersonaMap).toHaveBeenCalledWith(prisma, userId);
  });

  it('updates candidate stage and rejects records outside the staffing actor', async () => {
    vi.spyOn(staffingActor, 'loadStaffingEntityByKind')
        .mockResolvedValueOnce(entity('candidate-1', 'staffing_candidate', {
          fullName: 'Ada Candidate',
          stage: 'prospect',
        }))
        .mockResolvedValueOnce(null);
    const updated = entity('candidate-1', 'staffing_candidate', {
      fullName: 'Ada Candidate',
      stage: 'interviewing',
    });
    const prisma = {entity: {
      update: vi.fn().mockResolvedValue(updated),
      findUnique: vi.fn().mockResolvedValue(updated),
    }} as any;

    await expect(updateStaffingCandidateStage(
        prisma, userId, 'candidate-1', 'interviewing'))
        .resolves.toEqual(expect.objectContaining({stage: 'interviewing'}));
    await expect(updateStaffingCandidateStage(
        prisma, userId, 'other-candidate', 'archived'))
        .rejects.toEqual(new StaffingOperationsError(
            'CANDIDATE_NOT_FOUND', 'Candidate not found'));
  });

  it('creates shifts and placements with coverage and margin summaries', async () => {
    vi.spyOn(staffingActor, 'loadStaffingEntityByKind')
        .mockResolvedValueOnce(entity('role-1', 'staffing_role', {
          title: 'Operator',
        }))
        .mockResolvedValueOnce(entity('candidate-1', 'staffing_candidate', {
          fullName: 'Ada Candidate',
          stage: 'ready',
        }))
        .mockResolvedValueOnce(entity('role-1', 'staffing_role', {
          title: 'Operator',
        }))
        .mockResolvedValueOnce(entity('engagement-1', 'staffing_engagement', {
          name: 'Launch',
        }))
        .mockResolvedValueOnce(entity('candidate-1', 'staffing_candidate', {
          fullName: 'Ada Candidate',
          stage: 'ready',
        }));
    const create = vi.fn()
        .mockImplementationOnce(async ({data}) =>
          entity('shift-1', data.kind, data.metadata))
        .mockImplementationOnce(async ({data}) =>
          entity('placement-1', data.kind, data.metadata));
    const prisma = {entity: {create}} as any;

    const shift = await createStaffingShift(prisma, userId, {
      roleId: 'role-1',
      title: 'Morning',
      startsAt: '2026-08-22T08:00:00.000Z',
      endsAt: '2026-08-22T12:00:00.000Z',
      assignedPersonaId: 'persona-1',
      assignedCandidateId: 'candidate-1',
    });
    const placement = await createStaffingPlacement(prisma, userId, {
      engagementId: 'engagement-1',
      roleId: 'role-1',
      candidateId: 'candidate-1',
      personaId: 'persona-1',
      startDate: '2026-08-22',
      billRate: 80,
      payRate: 50,
    });

    expect(shift).toEqual(expect.objectContaining({
      id: 'shift-1',
      coverageStatus: 'UNFILLED',
      assignedCandidate: {
        id: 'candidate-1',
        fullName: 'Ada Candidate',
        stage: 'ready',
      },
    }));
    expect(placement).toEqual(expect.objectContaining({
      id: 'placement-1',
      billRate: '80.00',
      payRate: '50.00',
      margin: '30.00',
      persona: expect.objectContaining({id: 'persona-1'}),
    }));
  });
});
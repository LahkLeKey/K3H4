import '../../test/vitest-setup';

import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import * as staffingOperations from '../../kits/staffing-operations';
import {registerStaffingRoutes} from '../staffing';
import {type RecordTelemetryFn} from '../types';

vi.mock('../../kits/staffing-operations', async (importOriginal) => ({
  ...await importOriginal<typeof import('../../kits/staffing-operations')>(),
  getStaffingDashboard: vi.fn(),
  createStaffingEngagement: vi.fn(),
  createStaffingRole: vi.fn(),
  createStaffingCandidate: vi.fn(),
  updateStaffingCandidateStage: vi.fn(),
  createStaffingShift: vi.fn(),
  createStaffingPlacement: vi.fn(),
}));

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerStaffingRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe('staffing routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the dashboard and emits telemetry', async () => {
    vi.mocked(staffingOperations.getStaffingDashboard).mockResolvedValue({
      engagements: [{id: 'eng-1', name: 'Ops Engagement'}],
      roles: [{id: 'role-1', title: 'Estimator'}],
      candidates: [{id: 'candidate-1'}],
      shifts: [{id: 'shift-1'}],
      placements: [],
      metrics: {openRoles: 1, activeCandidates: 1, scheduledShifts: 1,
        activePlacements: 0, fillRate: 0},
    } as any);

    const server = buildServer({});
    const res =
        await server.inject({method: 'GET', url: '/staffing/dashboard'});
    expect(res.statusCode).toBe(200);
    expect(res.json().engagements[0].name).toBe('Ops Engagement');
    expect(res.json().roles[0].title).toBe('Estimator');
    expect(staffingOperations.getStaffingDashboard)
      .toHaveBeenCalledWith(expect.anything(), userId);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.dashboard.loaded'}));
  });

  it('creates an engagement and records telemetry', async () => {
    vi.mocked(staffingOperations.createStaffingEngagement).mockResolvedValue({
      id: 'eng-2',
      name: 'New Engagement',
    } as any);
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/staffing/engagements',
      payload: {name: 'New Engagement', status: 'ACTIVE'}
    });
    expect(res.statusCode).toBe(200);
    expect(staffingOperations.createStaffingEngagement)
        .toHaveBeenCalledWith(
            expect.anything(), userId,
            expect.objectContaining({name: 'New Engagement'}));
    expect(res.json().engagement.name).toBe('New Engagement');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.engagement.create'}));
  });

  it('updates candidate stage and returns serialized candidate', async () => {
    vi.mocked(staffingOperations.updateStaffingCandidateStage)
        .mockResolvedValue({
      id: 'candidate-1',
      stage: 'interviewing',
      fullName: 'Ada Candidate',
    } as any);
    const prisma = {};
    const server = buildServer(prisma);

    const res = await server.inject({
      method: 'POST',
      url: '/staffing/candidates/candidate-1/actions/stage',
      payload: {stage: 'interviewing'}
    });
    expect(res.statusCode).toBe(200);
    expect(staffingOperations.updateStaffingCandidateStage)
      .toHaveBeenCalledWith(
        expect.anything(), userId, 'candidate-1', 'interviewing');
    expect(res.json().candidate.stage).toBe('interviewing');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'staffing.candidate.stage'}));
  });

  it('returns 400 when stage payload is missing', async () => {
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/staffing/candidates/candidate-1/actions/stage',
      payload: {} as any
    });
    expect(res.statusCode).toBe(400);
  });

  it('maps missing owned records from the Kit to 404', async () => {
    vi.mocked(staffingOperations.createStaffingRole).mockRejectedValue(
        new staffingOperations.StaffingOperationsError(
            'ENGAGEMENT_NOT_FOUND', 'Engagement not found'));
    const server = buildServer({});

    const res = await server.inject({
      method: 'POST',
      url: '/staffing/roles',
      payload: {title: 'Operator', engagementId: 'missing'},
    });

    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({error: 'Engagement not found'});
    expect(recordTelemetry).not.toHaveBeenCalled();
  });

  it('delegates role, candidate, shift, and placement creation with telemetry', async () => {
    vi.mocked(staffingOperations.createStaffingRole).mockResolvedValue({
      id: 'role-1',
      engagementId: 'engagement-1',
      title: 'Operator',
    } as any);
    vi.mocked(staffingOperations.createStaffingCandidate).mockResolvedValue({
      id: 'candidate-1',
      roleId: 'role-1',
      stage: 'prospect',
    } as any);
    vi.mocked(staffingOperations.createStaffingShift).mockResolvedValue({
      id: 'shift-1',
      roleId: 'role-1',
      title: 'Morning',
    } as any);
    vi.mocked(staffingOperations.createStaffingPlacement).mockResolvedValue({
      id: 'placement-1',
      roleId: 'role-1',
    } as any);
    const server = buildServer({});

    const responses = await Promise.all([
      server.inject({
        method: 'POST',
        url: '/staffing/roles',
        payload: {title: 'Operator', engagementId: 'engagement-1'},
      }),
      server.inject({
        method: 'POST',
        url: '/staffing/candidates',
        payload: {fullName: 'Ada Candidate', roleId: 'role-1'},
      }),
      server.inject({
        method: 'POST',
        url: '/staffing/shifts',
        payload: {
          title: 'Morning',
          roleId: 'role-1',
          startsAt: '2026-08-22T08:00:00.000Z',
          endsAt: '2026-08-22T12:00:00.000Z',
        },
      }),
      server.inject({
        method: 'POST',
        url: '/staffing/placements',
        payload: {
          roleId: 'role-1',
          startDate: '2026-08-22',
        },
      }),
    ]);

    expect(responses.map((response) => response.statusCode))
        .toEqual([200, 200, 200, 200]);
    expect(recordTelemetry.mock.calls.map(([, event]) => event.eventType))
        .toEqual(expect.arrayContaining([
          'staffing.role.create',
          'staffing.candidate.create',
          'staffing.shift.create',
          'staffing.placement.create',
        ]));
  });
});

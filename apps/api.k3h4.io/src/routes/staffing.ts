import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply} from 'fastify';

import {createStaffingCandidate, createStaffingEngagement, createStaffingPlacement, createStaffingRole, createStaffingShift, getStaffingDashboard, StaffingOperationsError, updateStaffingCandidateStage} from '../kits/staffing-operations';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const sendStaffingError = (error: unknown, reply: FastifyReply) => {
  if (!(error instanceof StaffingOperationsError)) throw error;
  const status = error.code === 'INVALID_OPENINGS' ||
          error.code === 'INVALID_SHIFT_DATES' ? 400 : 404;
  return reply.status(status).send({error: error.message});
};

export function registerStaffingRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/staffing/dashboard',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const dashboard = await getStaffingDashboard(prisma, userId);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.dashboard.loaded',
          source: 'api',
          payload: {
            engagements: dashboard.engagements.length,
            roles: dashboard.roles.length,
            candidates: dashboard.candidates.length,
          },
        });
        return dashboard;
      },
  );

  server.post(
      '/staffing/engagements',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          name?: string;
          client?: string;
          priority?: string;
          status?: string;
          startDate?: string;
          endDate?: string;
          budget?: number|string;
          forecast?: number|string;
          notes?: string;
        }|undefined;
        if (!body?.name?.trim())
          return reply.status(400).send({error: 'name is required'});
        const engagement = await createStaffingEngagement(prisma, userId, {
          ...body,
          name: body.name,
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.engagement.create',
          source: 'api',
          payload: {engagementId: engagement.id},
        });
        return {engagement};
      },
  );

  server.post(
      '/staffing/roles',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          engagementId?: string;
          title?: string;
          location?: string;
          modality?: string;
          openings?: number|string;
          rateMin?: number|string;
          rateMax?: number|string;
          billRate?: number|string;
          payRate?: number|string;
          priority?: string;
          status?: string;
          tags?: string;
          skills?: string[];
        }|undefined;
        if (!body?.title?.trim())
          return reply.status(400).send({error: 'title is required'});
        try {
          const role = await createStaffingRole(prisma, userId, {
            ...body,
            title: body.title,
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'staffing.role.create',
            source: 'api',
            payload: {roleId: role.id, engagementId: body.engagementId ?? null},
          });
          return {role};
        } catch (error) {
          return sendStaffingError(error, reply);
        }
      },
  );

  server.post(
      '/staffing/candidates',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          fullName?: string;
          email?: string;
          phone?: string;
          source?: string;
          stage?: string;
          score?: number|string;
          desiredRate?: number|string;
          availability?: string;
          location?: string;
          note?: string;
          tags?: string[];
          engagementId?: string;
          roleId?: string;
          personaId?: string;
        }|undefined;
        if (!body?.fullName?.trim())
          return reply.status(400).send({error: 'fullName is required'});
        try {
          const candidate = await createStaffingCandidate(prisma, userId, {
            ...body,
            fullName: body.fullName,
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'staffing.candidate.create',
            source: 'api',
            payload: {
              candidateId: candidate.id,
              roleId: candidate.roleId,
              stage: candidate.stage,
            },
          });
          return {candidate};
        } catch (error) {
          return sendStaffingError(error, reply);
        }
      },
  );

  server.post(
      '/staffing/candidates/:id/actions/stage',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const candidateId = (request.params as {id: string}).id;
        const body = request.body as {stage?: string}|undefined;
        const stage = body?.stage?.trim();
        if (!stage)
          return reply.status(400).send({error: 'stage is required'});
        try {
          const candidate = await updateStaffingCandidateStage(
              prisma, userId, candidateId, stage);
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'staffing.candidate.stage',
            source: 'api',
            payload: {candidateId, stage},
          });
          return {candidate};
        } catch (error) {
          return sendStaffingError(error, reply);
        }
      },
  );

  server.post(
      '/staffing/shifts',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          roleId?: string;
          title?: string;
          location?: string;
          startsAt?: string;
          endsAt?: string;
          status?: string;
          coverageStatus?: string;
          assignedPersonaId?: string;
          assignedCandidateId?: string;
          notes?: string;
        }|undefined;
        if (!body?.title?.trim())
          return reply.status(400).send({error: 'title is required'});
        try {
          const shift = await createStaffingShift(prisma, userId, {
            ...body,
            title: body.title,
            startsAt: body.startsAt ?? '',
            endsAt: body.endsAt ?? '',
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'staffing.shift.create',
            source: 'api',
            payload: {shiftId: shift.id, roleId: shift.roleId},
          });
          return {shift};
        } catch (error) {
          return sendStaffingError(error, reply);
        }
      },
  );

  server.post(
      '/staffing/placements',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          engagementId?: string;
          roleId?: string;
          candidateId?: string;
          personaId?: string;
          startDate?: string;
          endDate?: string;
          status?: string;
          billRate?: number|string;
          payRate?: number|string;
          note?: string;
        }|undefined;
        if (!body?.startDate || Number.isNaN(new Date(body.startDate).getTime()))
          return reply.status(400).send({error: 'startDate is required'});
        try {
          const placement = await createStaffingPlacement(prisma, userId, {
            ...body,
            startDate: body.startDate,
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'staffing.placement.create',
            source: 'api',
            payload: {placementId: placement.id, roleId: body.roleId ?? null},
          });
          return {placement};
        } catch (error) {
          return sendStaffingError(error, reply);
        }
      },
  );
}

import {CoverageStatus, EngagementPriority, LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {coverageStatusOrDefault, engagementPriorityOrDefault, lifecycleStatusOrDefault} from '../lib/status-utils';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const money = (value?: Prisma.Decimal|null) =>
    (value ? value.toFixed(2) : null);

const serializePersona = (persona: any) => persona ? {
  id: persona.id,
  alias: persona.alias,
  account: persona.account,
  handle: persona.handle,
} :
                                                     null;

const serializeEngagement = (engagement: any) => ({
  ...engagement,
  budget: money(engagement.budget),
  forecast: money(engagement.forecast),
  roles: engagement.roles?.map(serializeRole) ?? [],
  candidates: engagement.candidates?.map(serializeCandidate) ?? [],
  placements: engagement.placements?.map(serializePlacement) ?? [],
});

const serializeRole = (role: any) => ({
  ...role,
  rateMin: money(role.rateMin),
  rateMax: money(role.rateMax),
  billRate: money(role.billRate),
  payRate: money(role.payRate),
});

const serializeCandidate = (candidate: any) => ({
  ...candidate,
  score: candidate.score ? candidate.score.toFixed(2) : null,
  desiredRate: money(candidate.desiredRate),
  persona: serializePersona(candidate.persona),
});

const serializeShift = (shift: any) => ({
  ...shift,
  assignedPersona: serializePersona(shift.assignedPersona),
  assignedCandidate: shift.assignedCandidate ? {
    id: shift.assignedCandidate.id,
    fullName: shift.assignedCandidate.fullName,
    stage: shift.assignedCandidate.stage
  } :
                                               null,
});

const serializePlacement = (placement: any) => ({
  ...placement,
  billRate: money(placement.billRate),
  payRate: money(placement.payRate),
  margin: money(placement.margin),
  persona: serializePersona(placement.persona),
});

const parseDate = (value: string|undefined|null) => {
  if (!value) return null;
  const dt = new Date(value);
  return Number.isNaN(dt.getTime()) ? null : dt;
};

const parseMoney = (value: number|string|undefined|null) => {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? new Prisma.Decimal(num.toFixed(2)) : null;
};

const assertUserOwns = async<T extends {userId: string}>(
    entity: T|null,
    reply: any,
    message: string,
    ) => {
  if (!entity) {
    await reply.status(404).send({error: message});
    return null;
  }
  return entity;
};

export function registerStaffingRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/staffing/dashboard',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;

        const [engagements, roles, candidates, shifts, placements] =
            await Promise.all([
              prisma.staffingEngagement.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                include: {
                  roles: {
                    orderBy: {createdAt: 'desc'},
                    include: {placements: true, shifts: true}
                  },
                  candidates: {
                    orderBy: {updatedAt: 'desc'},
                    include: {
                      persona: {
                        select:
                            {id: true, alias: true, account: true, handle: true}
                      }
                    }
                  },
                  placements: true,
                },
              }),
              prisma.staffingRole.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                include: {engagement: true},
              }),
              prisma.staffingCandidate.findMany({
                where: {userId},
                orderBy: {updatedAt: 'desc'},
                include: {
                  persona: {
                    select: {id: true, alias: true, account: true, handle: true}
                  },
                  role: true
                },
              }),
              prisma.staffingShift.findMany({
                where: {userId},
                orderBy: {startsAt: 'asc'},
                include: {
                  role: true,
                  assignedPersona: {
                    select: {id: true, alias: true, account: true, handle: true}
                  },
                  assignedCandidate:
                      {select: {id: true, fullName: true, stage: true}},
                },
              }),
              prisma.staffingPlacement.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                include: {
                  role: true,
                  engagement: true,
                  candidate: {select: {id: true, fullName: true, stage: true}},
                  persona: {
                    select: {id: true, alias: true, account: true, handle: true}
                  },
                },
              }),
            ]);

        const totalOpenings =
            roles.reduce((sum, role) => sum + (role.openings || 0), 0);
        const totalFilled =
            roles.reduce((sum, role) => sum + (role.filled || 0), 0);
        const fillRate = totalOpenings > 0 ?
            Number(((totalFilled / totalOpenings) * 100).toFixed(1)) :
            0;

        const metrics = {
          openRoles:
              roles.filter((r) => r.status !== LifecycleStatus.CLOSED).length,
          activeCandidates:
              candidates.filter((c) => c.stage !== 'archived').length,
          scheduledShifts: shifts.length,
          activePlacements:
              placements.filter((p) => p.status === LifecycleStatus.ACTIVE)
                  .length,
          fillRate,
        };

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.dashboard.loaded',
          source: 'api',
          payload: {
            engagements: engagements.length,
            roles: roles.length,
            candidates: candidates.length
          },
        });

        return {
          engagements: engagements.map(serializeEngagement),
          roles: roles.map(serializeRole),
          candidates: candidates.map(serializeCandidate),
          shifts: shifts.map(serializeShift),
          placements: placements.map(serializePlacement),
          metrics,
        };
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
          notes?: string
        }
        |undefined;

        const name = body?.name?.trim();
        if (!name) return reply.status(400).send({error: 'name is required'});

        const engagement = await prisma.staffingEngagement.create({
          data: {
            userId,
            name,
            client: body?.client?.trim() || null,
            priority: engagementPriorityOrDefault(
                body?.priority, EngagementPriority.MEDIUM),
            status:
                lifecycleStatusOrDefault(body?.status, LifecycleStatus.ACTIVE),
            startDate: parseDate(body?.startDate),
            endDate: parseDate(body?.endDate),
            budget: parseMoney(body?.budget),
            forecast: parseMoney(body?.forecast),
            notes: body?.notes?.trim() || null,
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.engagement.create',
          source: 'api',
          payload: {engagementId: engagement.id, priority: engagement.priority},
        });

        return {engagement: serializeEngagement(engagement)};
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
          skills?: string[]|undefined
        }
        |undefined;

        const title = body?.title?.trim();
        if (!title) return reply.status(400).send({error: 'title is required'});

        if (body?.engagementId) {
          const engagement = await prisma.staffingEngagement.findFirst(
              {where: {id: body.engagementId, userId}});
          if (!engagement)
            return reply.status(404).send({error: 'Engagement not found'});
        }

        const openings =
            body?.openings !== undefined ? Number(body.openings) : 1;
        if (!Number.isFinite(openings) || openings <= 0)
          return reply.status(400).send({error: 'openings must be positive'});

        const role = await prisma.staffingRole.create({
          data: {
            userId,
            engagementId: body?.engagementId || null,
            title,
            location: body?.location?.trim() || null,
            modality: body?.modality?.trim() || null,
            openings,
            priority: engagementPriorityOrDefault(
                body?.priority, EngagementPriority.NORMAL),
            status:
                lifecycleStatusOrDefault(body?.status, LifecycleStatus.OPEN),
            rateMin: parseMoney(body?.rateMin),
            rateMax: parseMoney(body?.rateMax),
            billRate: parseMoney(body?.billRate),
            payRate: parseMoney(body?.payRate),
            tags: body?.tags?.trim() || null,
            skills: Array.isArray(body?.skills) ? body?.skills : undefined,
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.role.create',
          source: 'api',
          payload: {roleId: role.id, engagementId: role.engagementId},
        });

        return {role: serializeRole(role)};
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
          personaId?: string
        }
        |undefined;

        const fullName = body?.fullName?.trim();
        if (!fullName)
          return reply.status(400).send({error: 'fullName is required'});

        if (body?.engagementId) {
          const engagement = await prisma.staffingEngagement.findFirst(
              {where: {id: body.engagementId, userId}});
          if (!engagement)
            return reply.status(404).send({error: 'Engagement not found'});
        }
        if (body?.roleId) {
          const role = await prisma.staffingRole.findFirst(
              {where: {id: body.roleId, userId}});
          if (!role) return reply.status(404).send({error: 'Role not found'});
        }
        if (body?.personaId) {
          const persona = await prisma.persona.findFirst(
              {where: {id: body.personaId, userId}});
          if (!persona)
            return reply.status(404).send({error: 'Persona not found'});
        }

        const candidate = await prisma.staffingCandidate.create({
          data: {
            userId,
            engagementId: body?.engagementId || null,
            roleId: body?.roleId || null,
            personaId: body?.personaId || null,
            fullName,
            email: body?.email?.trim() || null,
            phone: body?.phone?.trim() || null,
            source: body?.source?.trim() || null,
            stage: body?.stage?.trim() || 'prospect',
            score: body?.score !== undefined && body?.score !== null &&
                    body.score !== '' ?
                new Prisma.Decimal(Number(body.score).toFixed(2)) :
                null,
            desiredRate: parseMoney(body?.desiredRate),
            availability: body?.availability?.trim() || null,
            location: body?.location?.trim() || null,
            note: body?.note?.trim() || null,
            tags: Array.isArray(body?.tags) ? body?.tags : undefined,
          },
          include: {
            persona:
                {select: {id: true, alias: true, account: true, handle: true}}
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.candidate.create',
          source: 'api',
          payload: {
            candidateId: candidate.id,
            roleId: candidate.roleId,
            stage: candidate.stage
          },
        });

        return {candidate: serializeCandidate(candidate)};
      },
  );

  server.post(
      '/staffing/candidates/:id/stage',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const candidateId = (request.params as {id: string}).id;
        const body = request.body as {stage?: string} | undefined;
        const stage = body?.stage?.trim();
        if (!stage) return reply.status(400).send({error: 'stage is required'});

        const candidate = await prisma.staffingCandidate.findFirst({
          where: {id: candidateId, userId},
          include: {
            persona:
                {select: {id: true, alias: true, account: true, handle: true}}
          }
        });
        const owned =
            await assertUserOwns(candidate, reply, 'Candidate not found');
        if (!owned) return;

        const updated = await prisma.staffingCandidate.update(
            {where: {id: candidateId}, data: {stage}});

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.candidate.stage',
          source: 'api',
          payload: {candidateId, stage},
        });

        return {candidate: serializeCandidate({...owned, ...updated})};
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
          notes?: string
        }
        |undefined;

        const title = body?.title?.trim();
        if (!title) return reply.status(400).send({error: 'title is required'});

        const startsAt = parseDate(body?.startsAt);
        const endsAt = parseDate(body?.endsAt);
        if (!startsAt || !endsAt || startsAt >= endsAt)
          return reply.status(400).send(
              {error: 'startsAt and endsAt must be valid and ordered'});

        if (body?.roleId) {
          const role = await prisma.staffingRole.findFirst(
              {where: {id: body.roleId, userId}});
          if (!role) return reply.status(404).send({error: 'Role not found'});
        }
        if (body?.assignedPersonaId) {
          const persona = await prisma.persona.findFirst(
              {where: {id: body.assignedPersonaId, userId}});
          if (!persona)
            return reply.status(404).send({error: 'Persona not found'});
        }
        if (body?.assignedCandidateId) {
          const candidate = await prisma.staffingCandidate.findFirst(
              {where: {id: body.assignedCandidateId, userId}});
          if (!candidate)
            return reply.status(404).send({error: 'Candidate not found'});
        }

        const shift = await prisma.staffingShift.create({
          data: {
            userId,
            roleId: body?.roleId || null,
            title,
            location: body?.location?.trim() || null,
            startsAt,
            endsAt,
            status: lifecycleStatusOrDefault(
                body?.status, LifecycleStatus.SCHEDULED),
            coverageStatus: coverageStatusOrDefault(
                body?.coverageStatus, CoverageStatus.UNFILLED),
            assignedPersonaId: body?.assignedPersonaId || null,
            assignedCandidateId: body?.assignedCandidateId || null,
            notes: body?.notes?.trim() || null,
          },
          include: {
            assignedPersona:
                {select: {id: true, alias: true, account: true, handle: true}},
            assignedCandidate:
                {select: {id: true, fullName: true, stage: true}},
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.shift.create',
          source: 'api',
          payload: {
            shiftId: shift.id,
            roleId: shift.roleId,
            startsAt: shift.startsAt
          },
        });

        return {shift: serializeShift(shift)};
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
          note?: string
        }
        |undefined;

        const startDate = parseDate(body?.startDate);
        if (!startDate)
          return reply.status(400).send({error: 'startDate is required'});

        if (body?.engagementId) {
          const engagement = await prisma.staffingEngagement.findFirst(
              {where: {id: body.engagementId, userId}});
          if (!engagement)
            return reply.status(404).send({error: 'Engagement not found'});
        }
        if (body?.roleId) {
          const role = await prisma.staffingRole.findFirst(
              {where: {id: body.roleId, userId}});
          if (!role) return reply.status(404).send({error: 'Role not found'});
        }
        if (body?.candidateId) {
          const candidate = await prisma.staffingCandidate.findFirst(
              {where: {id: body.candidateId, userId}});
          if (!candidate)
            return reply.status(404).send({error: 'Candidate not found'});
        }
        if (body?.personaId) {
          const persona = await prisma.persona.findFirst(
              {where: {id: body.personaId, userId}});
          if (!persona)
            return reply.status(404).send({error: 'Persona not found'});
        }

        const billRate = parseMoney(body?.billRate);
        const payRate = parseMoney(body?.payRate);
        const margin =
            billRate && payRate ? billRate.sub(payRate) : billRate ?? null;

        const placement = await prisma.staffingPlacement.create({
          data: {
            userId,
            engagementId: body?.engagementId || null,
            roleId: body?.roleId || null,
            candidateId: body?.candidateId || null,
            personaId: body?.personaId || null,
            startDate,
            endDate: parseDate(body?.endDate),
            status:
                lifecycleStatusOrDefault(body?.status, LifecycleStatus.ACTIVE),
            billRate,
            payRate,
            margin,
            note: body?.note?.trim() || null,
          },
          include: {
            role: true,
            engagement: true,
            candidate: {select: {id: true, fullName: true, stage: true}},
            persona:
                {select: {id: true, alias: true, account: true, handle: true}},
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.placement.create',
          source: 'api',
          payload: {placementId: placement.id, roleId: placement.roleId},
        });

        return {placement: serializePlacement(placement)};
      },
  );
}

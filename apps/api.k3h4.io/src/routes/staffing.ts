import {CoverageStatus, EngagementPriority, Entity, EntityKind, LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {coverageStatusOrDefault, engagementPriorityOrDefault, lifecycleStatusOrDefault} from '../lib/status-utils';
import {ensurePersonaActor, loadPersonaMap, loadPersonaRecordById, personaRecordToResponse} from '../services/persona-ledger';
import {ensureStaffingActor, loadStaffingEntities, loadStaffingEntityByKind, STAFFING_ACTOR_SOURCE} from '../services/staffing-actor';
import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const money = (value?: Prisma.Decimal|null) => (value ? value.toFixed(2) : null);

const serializePersona = (persona: any) => persona ? {
  id: persona.id,
  alias: persona.alias,
  account: persona.account,
  handle: persona.handle,
} : null;

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

const metadataDecimal = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string' && value.length) return new Prisma.Decimal(value);
  if (typeof value === 'number' && Number.isFinite(value)) return new Prisma.Decimal(value);
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === 'bigint') return new Prisma.Decimal(value.toString());
  return null;
};

const metadataNumber = (metadata: Record<string, unknown>, key: string, fallback = 0) => {
  const value = metadata[key];
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const metadataDate = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') {
    const dt = new Date(value);
    if (!Number.isNaN(dt.getTime())) return dt;
  }
  if (value instanceof Date) return value;
  return null;
};

const metadataStringArray = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (Array.isArray(value)) {
    return value
        .map((entry) => {
          if (typeof entry === 'string') return entry.trim();
          if (typeof entry === 'number') return String(entry);
          return null;
        })
        .filter((entry): entry is string => typeof entry === 'string' && entry.length);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? [trimmed] : [];
  }
  return [];
};

type EngagementFields = {
  id: string;
  name: string;
  client: string|null;
  priority: EngagementPriority;
  status: LifecycleStatus;
  startDate: Date|null;
  endDate: Date|null;
  budget: Prisma.Decimal|null;
  forecast: Prisma.Decimal|null;
  notes: string|null;
};

type CandidateSummary = {id: string; fullName: string; stage: string|null};

const buildEngagementFields = (entity: Entity): EngagementFields => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    name: metadataString(metadata, 'name') ?? '',
    client: metadataString(metadata, 'client'),
    priority: engagementPriorityOrDefault(
        metadataString(metadata, 'priority'), EngagementPriority.MEDIUM),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status'), LifecycleStatus.ACTIVE),
    startDate: metadataDate(metadata, 'startDate'),
    endDate: metadataDate(metadata, 'endDate'),
    budget: metadataDecimal(metadata, 'budget'),
    forecast: metadataDecimal(metadata, 'forecast'),
    notes: metadataString(metadata, 'notes'),
  };
};

const buildRoleFields = (
    entity: Entity,
    engagementMap: Map<string, EngagementFields>,
    placementsByRole: Map<string, Entity[]>) => {
  const metadata = asRecord(entity.metadata);
  const engagementId = metadataString(metadata, 'engagementId');
  const openings = metadataNumber(metadata, 'openings', 1);
  const filled = placementsByRole.get(entity.id)?.length ?? 0;
  const engagement = engagementId ? engagementMap.get(engagementId) : null;
  return {
    id: entity.id,
    engagementId,
    title: metadataString(metadata, 'title') ?? '',
    location: metadataString(metadata, 'location'),
    modality: metadataString(metadata, 'modality'),
    openings,
    filled,
    priority: engagementPriorityOrDefault(
        metadataString(metadata, 'priority'), EngagementPriority.NORMAL),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status'), LifecycleStatus.OPEN),
    rateMin: metadataDecimal(metadata, 'rateMin'),
    rateMax: metadataDecimal(metadata, 'rateMax'),
    billRate: metadataDecimal(metadata, 'billRate'),
    payRate: metadataDecimal(metadata, 'payRate'),
    tags: metadataString(metadata, 'tags'),
    skills: metadataStringArray(metadata, 'skills'),
    engagement,
  };
};

const buildCandidateFields = (
    entity: Entity,
    personaMap: Map<string, ReturnType<typeof personaRecordToResponse>>,
    roleMap: Map<string, ReturnType<typeof serializeRole>>) => {
  const metadata = asRecord(entity.metadata);
  const roleId = metadataString(metadata, 'roleId');
  const personaId = metadataString(metadata, 'personaId');
  const persona = personaId ?
      personaRecordToResponse(personaMap.get(personaId) ?? null) :
      null;
  return {
    id: entity.id,
    engagementId: metadataString(metadata, 'engagementId'),
    roleId,
    fullName: metadataString(metadata, 'fullName') ?? '',
    email: metadataString(metadata, 'email'),
    phone: metadataString(metadata, 'phone'),
    source: metadataString(metadata, 'source'),
    stage: metadataString(metadata, 'stage') ?? 'prospect',
    score: metadataDecimal(metadata, 'score'),
    desiredRate: metadataDecimal(metadata, 'desiredRate'),
    availability: metadataString(metadata, 'availability'),
    location: metadataString(metadata, 'location'),
    note: metadataString(metadata, 'note'),
    tags: metadataStringArray(metadata, 'tags'),
    personaId,
    persona,
    role: roleId ? roleMap.get(roleId) ?? null : null,
  };
};

const buildShiftFields = (
    entity: Entity,
    personaMap: Map<string, ReturnType<typeof personaRecordToResponse>>,
    candidateSummaries: Map<string, CandidateSummary>) => {
  const metadata = asRecord(entity.metadata);
  const assignedPersonaId = metadataString(metadata, 'assignedPersonaId');
  const assignedCandidateId = metadataString(metadata, 'assignedCandidateId');
  const assignedPersona = assignedPersonaId ?
      personaRecordToResponse(personaMap.get(assignedPersonaId) ?? null) :
      null;
  const assignedCandidate = assignedCandidateId ?
      candidateSummaries.get(assignedCandidateId) ?? null :
      null;
  return {
    id: entity.id,
    roleId: metadataString(metadata, 'roleId'),
    title: metadataString(metadata, 'title') ?? '',
    location: metadataString(metadata, 'location'),
    startsAt: metadataDate(metadata, 'startsAt'),
    endsAt: metadataDate(metadata, 'endsAt'),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status'), LifecycleStatus.SCHEDULED),
    coverageStatus: coverageStatusOrDefault(
        metadataString(metadata, 'coverageStatus'), CoverageStatus.UNFILLED),
    assignedPersona,
    assignedCandidate,
    notes: metadataString(metadata, 'notes'),
  };
};

const buildPlacementFields = (
    entity: Entity,
    personaMap: Map<string, ReturnType<typeof personaRecordToResponse>>,
    roleMap: Map<string, ReturnType<typeof serializeRole>>,
    engagementMap: Map<string, EngagementFields>,
    candidateSummaries: Map<string, CandidateSummary>) => {
  const metadata = asRecord(entity.metadata);
  const billRate = metadataDecimal(metadata, 'billRate');
  const payRate = metadataDecimal(metadata, 'payRate');
  const margin = billRate && payRate ? billRate.sub(payRate) : billRate ?? null;
  const personaId = metadataString(metadata, 'personaId');
  const roleId = metadataString(metadata, 'roleId');
  const engagementId = metadataString(metadata, 'engagementId');
  const candidateId = metadataString(metadata, 'candidateId');
  return {
    id: entity.id,
    engagementId,
    roleId,
    candidateId,
    startDate: metadataDate(metadata, 'startDate'),
    endDate: metadataDate(metadata, 'endDate'),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status'), LifecycleStatus.ACTIVE),
    billRate,
    payRate,
    margin,
    note: metadataString(metadata, 'note'),
    persona: personaId ?
        personaRecordToResponse(personaMap.get(personaId) ?? null) :
        null,
    candidate: candidateId ?
        candidateSummaries.get(candidateId) ?? null :
        null,
    role: roleId ? roleMap.get(roleId) ?? null : null,
    engagement: engagementId ? engagementMap.get(engagementId) ?? null : null,
  };
};

const groupByMetadataKey = (entities: Entity[], key: string) => {
  const map = new Map<string, Entity[]>();
  entities.forEach((entity) => {
    const metadata = asRecord(entity.metadata);
    const value = metadataString(metadata, key);
    if (!value) return;
    const list = map.get(value) ?? [];
    list.push(entity);
    map.set(value, list);
  });
  return map;
};

const assertOwnedEntity = async (
    entity: Entity|null,
    reply: any,
    message: string,) => {
  if (!entity) {
    await reply.status(404).send({error: message});
    return null;
  }
  return entity;
};

const normalizeSkills = (skills?: string[]|null) => {
  if (!Array.isArray(skills)) return undefined;
  const normalized = skills.map((skill) => skill.trim()).filter((value) => value.length);
  return normalized.length ? normalized : undefined;
};

export function registerStaffingRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/staffing/dashboard',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const personaMap = await loadPersonaMap(prisma, userId);
        const staffingActor = await ensureStaffingActor(prisma, userId);
        const collections = await loadStaffingEntities(prisma, staffingActor.id);

        const engagementMap = new Map<string, EngagementFields>();
        collections.engagements.forEach((entity) => {
          engagementMap.set(entity.id, buildEngagementFields(entity));
        });

        const placementsByRole = groupByMetadataKey(collections.placements, 'roleId');
        const placementsByEngagement =
            groupByMetadataKey(collections.placements, 'engagementId');

        const roleDetails = collections.roles.map((entity) => {
          const fields = buildRoleFields(entity, engagementMap, placementsByRole);
          return {entity, fields, serialized: serializeRole(fields)};
        });
        const roleMap = new Map(roleDetails.map((detail) => [detail.entity.id, detail.serialized]));

        const candidateDetails = collections.candidates.map((entity) => {
          const fields = buildCandidateFields(entity, personaMap, roleMap);
          return {entity, fields, serialized: serializeCandidate(fields)};
        });
        const candidateSummaries = new Map<string, CandidateSummary>();
        candidateDetails.forEach(({entity, fields}) => {
          candidateSummaries.set(entity.id, {
            id: fields.id,
            fullName: fields.fullName,
            stage: fields.stage,
          });
        });

        const shiftPayloads = collections.shifts.map((entity) =>
            serializeShift(buildShiftFields(entity, personaMap, candidateSummaries)));

        const placementDetails = collections.placements.map((entity) => {
          const fields = buildPlacementFields(
              entity, personaMap, roleMap, engagementMap, candidateSummaries);
          return {entity, fields, serialized: serializePlacement(fields)};
        });

        const candidatesByEngagementSerialized = new Map<string, ReturnType<typeof serializeCandidate>[]>();
        candidateDetails.forEach((detail) => {
          const engagementId = detail.fields.engagementId;
          if (!engagementId) return;
          const list = candidatesByEngagementSerialized.get(engagementId) ?? [];
          list.push(detail.serialized);
          candidatesByEngagementSerialized.set(engagementId, list);
        });

        const rolesByEngagementSerialized = new Map<string, ReturnType<typeof serializeRole>[]>();
        roleDetails.forEach((detail) => {
          const engagementId = detail.fields.engagementId;
          if (!engagementId) return;
          const list = rolesByEngagementSerialized.get(engagementId) ?? [];
          list.push(detail.serialized);
          rolesByEngagementSerialized.set(engagementId, list);
        });

        const placementsByEngagementSerialized = new Map<string, ReturnType<typeof serializePlacement>[]>();
        placementDetails.forEach((detail) => {
          const engagementId = detail.fields.engagementId;
          if (!engagementId) return;
          const list = placementsByEngagementSerialized.get(engagementId) ?? [];
          list.push(detail.serialized);
          placementsByEngagementSerialized.set(engagementId, list);
        });

        const engagementResponse = collections.engagements.map((entity) => {
          const base = buildEngagementFields(entity);
          return serializeEngagement({
            ...base,
            roles: rolesByEngagementSerialized.get(entity.id) ?? [],
            candidates: candidatesByEngagementSerialized.get(entity.id) ?? [],
            placements: placementsByEngagementSerialized.get(entity.id) ?? [],
          });
        });

        const totalOpenings = roleDetails
                                  .map((detail) => detail.fields.openings)
                                  .reduce((sum, value) => sum + value, 0);
        const totalFilled = roleDetails
                                  .map((detail) => detail.fields.filled)
                                  .reduce((sum, value) => sum + value, 0);
        const fillRate = totalOpenings > 0 ?
            Number(((totalFilled / totalOpenings) * 100).toFixed(1)) :
            0;
        const metrics = {
          openRoles: roleDetails.filter(
                               (detail) =>
                                   detail.fields.status !== LifecycleStatus.CLOSED)
                               .length,
          activeCandidates: candidateDetails.filter(
                                   (detail) => detail.fields.stage !== 'archived')
                               .length,
          scheduledShifts: shiftPayloads.length,
          activePlacements: placementDetails.filter(
                                      (detail) =>
                                          detail.fields.status ===
                                          LifecycleStatus.ACTIVE)
                                      .length,
          fillRate,
        };

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.dashboard.loaded',
          source: 'api',
          payload: {
            engagements: collections.engagements.length,
            roles: collections.roles.length,
            candidates: collections.candidates.length,
          },
        });

        return {
          engagements: engagementResponse,
          roles: roleDetails.map((detail) => detail.serialized),
          candidates: candidateDetails.map((detail) => detail.serialized),
          shifts: shiftPayloads,
          placements: placementDetails.map((detail) => detail.serialized),
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
          notes?: string;
        } | undefined;

        const name = body?.name?.trim();
        if (!name) return reply.status(400).send({error: 'name is required'});

        const startDate = parseDate(body?.startDate);
        const endDate = parseDate(body?.endDate);
        const budget = parseMoney(body?.budget);
        const forecast = parseMoney(body?.forecast);
        const actor = await ensureStaffingActor(prisma, userId);

        const engagementEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.STAFFING_ENGAGEMENT,
            source: STAFFING_ACTOR_SOURCE,
            metadata: {
              name,
              client: body?.client?.trim() || null,
              priority: engagementPriorityOrDefault(
                  body?.priority, EngagementPriority.MEDIUM),
              status: lifecycleStatusOrDefault(
                  body?.status, LifecycleStatus.ACTIVE),
              startDate: startDate?.toISOString() ?? null,
              endDate: endDate?.toISOString() ?? null,
              budget: budget?.toFixed(2) ?? null,
              forecast: forecast?.toFixed(2) ?? null,
              notes: body?.notes?.trim() || null,
            },
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.engagement.create',
          source: 'api',
          payload: {engagementId: engagementEntity.id},
        });

        return {
          engagement: serializeEngagement({
            ...buildEngagementFields(engagementEntity),
            roles: [],
            candidates: [],
            placements: [],
          }),
        };
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
        } | undefined;

        const title = body?.title?.trim();
        if (!title) return reply.status(400).send({error: 'title is required'});

        if (body?.engagementId) {
          const engagement = await loadStaffingEntityByKind(
              prisma, userId, EntityKind.STAFFING_ENGAGEMENT,
              body.engagementId);
          if (!engagement)
            return reply.status(404).send({error: 'Engagement not found'});
        }

        const openings = body?.openings !== undefined ?
            Number(body.openings) :
            1;
        if (!Number.isFinite(openings) || openings <= 0)
          return reply.status(400).send({error: 'openings must be positive'});

        const rateMin = parseMoney(body?.rateMin);
        const rateMax = parseMoney(body?.rateMax);
        const billRate = parseMoney(body?.billRate);
        const payRate = parseMoney(body?.payRate);
        const actor = await ensureStaffingActor(prisma, userId);

        const roleEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.STAFFING_ROLE,
            source: STAFFING_ACTOR_SOURCE,
            targetId: body?.engagementId || null,
            metadata: {
              engagementId: body?.engagementId || null,
              title,
              location: body?.location?.trim() || null,
              modality: body?.modality?.trim() || null,
              openings,
              priority: engagementPriorityOrDefault(
                  body?.priority, EngagementPriority.NORMAL),
              status: lifecycleStatusOrDefault(
                  body?.status, LifecycleStatus.OPEN),
              rateMin: rateMin?.toFixed(2) ?? null,
              rateMax: rateMax?.toFixed(2) ?? null,
              billRate: billRate?.toFixed(2) ?? null,
              payRate: payRate?.toFixed(2) ?? null,
              tags: body?.tags?.trim() || null,
              skills: normalizeSkills(body?.skills),
            },
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.role.create',
          source: 'api',
          payload: {roleId: roleEntity.id, engagementId: body?.engagementId ?? null},
        });

        return {role: serializeRole(buildRoleFields(roleEntity, new Map(), new Map()))};
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
        } | undefined;

        const fullName = body?.fullName?.trim();
        if (!fullName)
          return reply.status(400).send({error: 'fullName is required'});

        if (body?.engagementId) {
          const engagement = await loadStaffingEntityByKind(
              prisma, userId, EntityKind.STAFFING_ENGAGEMENT,
              body.engagementId);
          if (!engagement)
            return reply.status(404).send({error: 'Engagement not found'});
        }
        if (body?.roleId) {
          const role = await loadStaffingEntityByKind(
              prisma, userId, EntityKind.STAFFING_ROLE, body.roleId);
          if (!role) return reply.status(404).send({error: 'Role not found'});
        }
        if (body?.personaId) {
          const personaActor = await ensurePersonaActor(prisma, userId);
          const persona = await loadPersonaRecordById(
              prisma, personaActor.id, body.personaId);
          if (!persona) return reply.status(404).send({error: 'Persona not found'});
        }

        const score = parseMoney(body?.score);
        const desiredRate = parseMoney(body?.desiredRate);
        const tags = normalizeSkills(body?.tags);
        const actor = await ensureStaffingActor(prisma, userId);

        const candidateEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.STAFFING_CANDIDATE,
            source: STAFFING_ACTOR_SOURCE,
            targetId: body?.roleId || body?.engagementId || null,
            metadata: {
              engagementId: body?.engagementId || null,
              roleId: body?.roleId || null,
              personaId: body?.personaId || null,
              fullName,
              email: body?.email?.trim() || null,
              phone: body?.phone?.trim() || null,
              source: body?.source?.trim() || null,
              stage: body?.stage?.trim() || 'prospect',
              score: score?.toFixed(2) ?? null,
              desiredRate: desiredRate?.toFixed(2) ?? null,
              availability: body?.availability?.trim() || null,
              location: body?.location?.trim() || null,
              note: body?.note?.trim() || null,
              tags,
            },
          },
        });

        const candidateMetadata = asRecord(candidateEntity.metadata);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.candidate.create',
          source: 'api',
          payload: {
            candidateId: candidateEntity.id,
            roleId: metadataString(candidateMetadata, 'roleId'),
            stage: metadataString(candidateMetadata, 'stage') ?? 'prospect',
          },
        });

        return {
          candidate: serializeCandidate(
              buildCandidateFields(
                  candidateEntity, await loadPersonaMap(prisma, userId), new Map())),
        };
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

        const entity = await loadStaffingEntityByKind(
            prisma, userId, EntityKind.STAFFING_CANDIDATE, candidateId);
        const owned = await assertOwnedEntity(entity, reply, 'Candidate not found');
        if (!owned) return;

        const metadata = {...asRecord(owned.metadata), stage};
        await prisma.entity.update({where: {id: candidateId}, data: {metadata}});

        const updated = await prisma.entity.findUnique({where: {id: candidateId}});
        if (!updated) return reply.status(404).send({error: 'Candidate not found'});

        const personaMap = await loadPersonaMap(prisma, userId);
        const candidateResponse = serializeCandidate(
            buildCandidateFields(updated, personaMap, new Map()));

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.candidate.stage',
          source: 'api',
          payload: {candidateId, stage},
        });

        return {candidate: candidateResponse};
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
        } | undefined;

        const title = body?.title?.trim();
        if (!title) return reply.status(400).send({error: 'title is required'});

        const startsAt = parseDate(body?.startsAt);
        const endsAt = parseDate(body?.endsAt);
        if (!startsAt || !endsAt || startsAt >= endsAt)
          return reply.status(400).send({error: 'startsAt and endsAt must be valid and ordered'});

        if (body?.roleId) {
          const role = await loadStaffingEntityByKind(
              prisma, userId, EntityKind.STAFFING_ROLE, body.roleId);
          if (!role) return reply.status(404).send({error: 'Role not found'});
        }
        if (body?.assignedPersonaId) {
          const personaActor = await ensurePersonaActor(prisma, userId);
          const persona = await loadPersonaRecordById(
              prisma, personaActor.id, body.assignedPersonaId);
          if (!persona)
            return reply.status(404).send({error: 'Persona not found'});
        }
        let assignedCandidate: Entity|null = null;
        if (body?.assignedCandidateId) {
          assignedCandidate = await loadStaffingEntityByKind(
              prisma, userId, EntityKind.STAFFING_CANDIDATE, body.assignedCandidateId);
          if (!assignedCandidate)
            return reply.status(404).send({error: 'Candidate not found'});
        }

        const actor = await ensureStaffingActor(prisma, userId);
        const shiftEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.STAFFING_SHIFT,
            source: STAFFING_ACTOR_SOURCE,
            targetId: body?.roleId || null,
            metadata: {
              roleId: body?.roleId || null,
              title,
              location: body?.location?.trim() || null,
              startsAt: startsAt.toISOString(),
              endsAt: endsAt.toISOString(),
              status: lifecycleStatusOrDefault(
                  body?.status, LifecycleStatus.SCHEDULED),
              coverageStatus: coverageStatusOrDefault(
                  body?.coverageStatus, CoverageStatus.UNFILLED),
              assignedPersonaId: body?.assignedPersonaId || null,
              assignedCandidateId: body?.assignedCandidateId || null,
              notes: body?.notes?.trim() || null,
            },
          },
        });

        const personaMap = await loadPersonaMap(prisma, userId);
        const candidateSummaries = new Map<string, CandidateSummary>();
        if (assignedCandidate) {
          const candidateFields = buildCandidateFields(
              assignedCandidate, personaMap, new Map());
          candidateSummaries.set(assignedCandidate.id, {
            id: candidateFields.id,
            fullName: candidateFields.fullName,
            stage: candidateFields.stage,
          });
        }

        const shiftPayload = serializeShift(
            buildShiftFields(shiftEntity, personaMap, candidateSummaries));

        const shiftMetadata = asRecord(shiftEntity.metadata);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.shift.create',
          source: 'api',
          payload: {
            shiftId: shiftEntity.id,
            roleId: metadataString(shiftMetadata, 'roleId'),
          },
        });

        return {shift: shiftPayload};
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
        } | undefined;

        const startDate = parseDate(body?.startDate);
        if (!startDate)
          return reply.status(400).send({error: 'startDate is required'});

        const roleEntity = body?.roleId ?
            await loadStaffingEntityByKind(
                prisma, userId, EntityKind.STAFFING_ROLE, body.roleId) :
            null;
        if (body?.roleId && !roleEntity)
          return reply.status(404).send({error: 'Role not found'});

        const engagementEntity = body?.engagementId ?
            await loadStaffingEntityByKind(
                prisma, userId, EntityKind.STAFFING_ENGAGEMENT, body.engagementId) :
            null;
        if (body?.engagementId && !engagementEntity)
          return reply.status(404).send({error: 'Engagement not found'});

        const candidateEntity = body?.candidateId ?
            await loadStaffingEntityByKind(
                prisma, userId, EntityKind.STAFFING_CANDIDATE, body.candidateId) :
            null;
        if (body?.candidateId && !candidateEntity)
          return reply.status(404).send({error: 'Candidate not found'});

        if (body?.personaId) {
          const personaActor = await ensurePersonaActor(prisma, userId);
          const persona = await loadPersonaRecordById(
              prisma, personaActor.id, body.personaId);
          if (!persona)
            return reply.status(404).send({error: 'Persona not found'});
        }

        const billRate = parseMoney(body?.billRate);
        const payRate = parseMoney(body?.payRate);
        const margin = billRate && payRate ? billRate.sub(payRate) : billRate ?? null;
        const actor = await ensureStaffingActor(prisma, userId);

        const placementEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.STAFFING_PLACEMENT,
            source: STAFFING_ACTOR_SOURCE,
            targetId: body?.roleId || body?.engagementId || null,
            metadata: {
              engagementId: body?.engagementId || null,
              roleId: body?.roleId || null,
              candidateId: body?.candidateId || null,
              personaId: body?.personaId || null,
              startDate: startDate.toISOString(),
              endDate: parseDate(body?.endDate)?.toISOString() || null,
              status: lifecycleStatusOrDefault(
                  body?.status, LifecycleStatus.ACTIVE),
              billRate: billRate?.toFixed(2) ?? null,
              payRate: payRate?.toFixed(2) ?? null,
              margin: margin?.toFixed(2) ?? null,
              note: body?.note?.trim() || null,
            },
          },
        });

        const personaMap = await loadPersonaMap(prisma, userId);
        const roleSerializationMap = new Map<string, ReturnType<typeof serializeRole>>();
        if (roleEntity) {
          roleSerializationMap.set(
              roleEntity.id, serializeRole(buildRoleFields(roleEntity, new Map(), new Map())));
        }
        const engagementFieldsMap = new Map<string, EngagementFields>();
        if (engagementEntity) {
          engagementFieldsMap.set(engagementEntity.id, buildEngagementFields(engagementEntity));
        }
        const candidateSummaries = new Map<string, CandidateSummary>();
        if (candidateEntity) {
          const candidateFields = buildCandidateFields(candidateEntity, personaMap, roleSerializationMap);
          candidateSummaries.set(candidateEntity.id, {
            id: candidateFields.id,
            fullName: candidateFields.fullName,
            stage: candidateFields.stage,
          });
        }

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'staffing.placement.create',
          source: 'api',
          payload: {placementId: placementEntity.id, roleId: body?.roleId ?? null},
        });

        return {
          placement: serializePlacement(
              buildPlacementFields(
                  placementEntity,
                  personaMap,
                  roleSerializationMap,
                  engagementFieldsMap,
                  candidateSummaries)),
        };
      },
  );
}

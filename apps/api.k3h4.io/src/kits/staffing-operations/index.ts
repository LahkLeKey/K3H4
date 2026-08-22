import {type Entity, Prisma, type PrismaClient} from '@prisma/client';

import {ensureStaffingActor, loadStaffingEntities, loadStaffingEntityByKind, STAFFING_ACTOR_SOURCE} from '../../actors/Staffing/Staffing';
import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {COVERAGE_STATUSES, ENGAGEMENT_PRIORITIES, LIFECYCLE_STATUSES, type EngagementPriority, type LifecycleStatus} from '../../lib/domain-constants';
import {coverageStatusOrDefault, engagementPriorityOrDefault, lifecycleStatusOrDefault} from '../../lib/status-utils';
import {findPersonaMap} from '../persona-matching';

type PersonaMap = Awaited<ReturnType<typeof findPersonaMap>>;

type StaffingTransaction = PrismaClient|Prisma.TransactionClient;

export type CreateStaffingEngagementCommand = {
  name: string;
  client?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  budget?: number|string;
  forecast?: number|string;
  notes?: string;
};

export type CreateStaffingRoleCommand = {
  engagementId?: string;
  title: string;
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
};

export type CreateStaffingCandidateCommand = {
  fullName: string;
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
};

export type CreateStaffingShiftCommand = {
  roleId?: string;
  title: string;
  location?: string;
  startsAt: string;
  endsAt: string;
  status?: string;
  coverageStatus?: string;
  assignedPersonaId?: string;
  assignedCandidateId?: string;
  notes?: string;
};

export type CreateStaffingPlacementCommand = {
  engagementId?: string;
  roleId?: string;
  candidateId?: string;
  personaId?: string;
  startDate: string;
  endDate?: string;
  status?: string;
  billRate?: number|string;
  payRate?: number|string;
  note?: string;
};

export type StaffingOperationsErrorCode =
    'ENGAGEMENT_NOT_FOUND'|'ROLE_NOT_FOUND'|'CANDIDATE_NOT_FOUND'|
    'PERSONA_NOT_FOUND'|'INVALID_OPENINGS'|'INVALID_SHIFT_DATES';

export class StaffingOperationsError extends Error {
  constructor(
      public readonly code: StaffingOperationsErrorCode, message: string) {
    super(message);
    this.name = 'StaffingOperationsError';
  }
}

const money = (value?: Prisma.Decimal|null) => value ? value.toFixed(2) : null;

const parseDate = (value: string|undefined|null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseMoney = (value: number|string|undefined|null) => {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? new Prisma.Decimal(number.toFixed(2)) : null;
};

const normalizeSkills = (skills?: string[]|null) => {
  if (!Array.isArray(skills)) return undefined;
  const normalized = skills.map((skill) => skill.trim()).filter(Boolean);
  return normalized.length ? normalized : undefined;
};

const serializePersona = (persona: PersonaMap extends Map<string, infer Record> ? Record : never) => persona ? {
  id: persona.id,
  alias: persona.alias,
  account: persona.account,
  handle: persona.handle,
} : null;

const serializeEngagement = (engagement: any) => ({
  ...engagement,
  budget: money(engagement.budget),
  forecast: money(engagement.forecast),
  roles: engagement.roles ?? [],
  candidates: engagement.candidates ?? [],
  placements: engagement.placements ?? [],
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
  persona: candidate.persona ? serializePersona(candidate.persona) : null,
});

const serializeShift = (shift: any) => ({
  ...shift,
  assignedPersona: shift.assignedPersona ?
      serializePersona(shift.assignedPersona) : null,
});

const serializePlacement = (placement: any) => ({
  ...placement,
  billRate: money(placement.billRate),
  payRate: money(placement.payRate),
  margin: money(placement.margin),
  persona: placement.persona ? serializePersona(placement.persona) : null,
});

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
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
  if (typeof value === 'number' && Number.isFinite(value))
    return new Prisma.Decimal(value);
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === 'bigint') return new Prisma.Decimal(value.toString());
  return null;
};

const metadataNumber =
    (metadata: Record<string, unknown>, key: string, fallback = 0) => {
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
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (value instanceof Date) return value;
  return null;
};

const metadataStringArray =
    (metadata: Record<string, unknown>, key: string) => {
      const value = metadata[key];
      if (Array.isArray(value)) {
        return value.map((entry) => {
          if (typeof entry === 'string') return entry.trim();
          if (typeof entry === 'number') return String(entry);
          return null;
        }).filter((entry): entry is string => Boolean(entry));
      }
      if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
      return [];
    };

const resolvePersona = (personaId: string|null, personaMap: PersonaMap) =>
  personaId ? personaMap.get(personaId) ?? null : null;

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
        metadataString(metadata, 'priority') ?? undefined,
        ENGAGEMENT_PRIORITIES.MEDIUM),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status') ?? undefined,
        LIFECYCLE_STATUSES.ACTIVE),
    startDate: metadataDate(metadata, 'startDate'),
    endDate: metadataDate(metadata, 'endDate'),
    budget: metadataDecimal(metadata, 'budget'),
    forecast: metadataDecimal(metadata, 'forecast'),
    notes: metadataString(metadata, 'notes'),
  };
};

const buildRoleFields = (
    entity: Entity, engagementMap: Map<string, EngagementFields>,
    placementsByRole: Map<string, Entity[]>) => {
  const metadata = asRecord(entity.metadata);
  const engagementId = metadataString(metadata, 'engagementId');
  return {
    id: entity.id,
    engagementId,
    title: metadataString(metadata, 'title') ?? '',
    location: metadataString(metadata, 'location'),
    modality: metadataString(metadata, 'modality'),
    openings: metadataNumber(metadata, 'openings', 1),
    filled: placementsByRole.get(entity.id)?.length ?? 0,
    priority: engagementPriorityOrDefault(
        metadataString(metadata, 'priority') ?? undefined,
        ENGAGEMENT_PRIORITIES.NORMAL),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status') ?? undefined,
        LIFECYCLE_STATUSES.OPEN),
    rateMin: metadataDecimal(metadata, 'rateMin'),
    rateMax: metadataDecimal(metadata, 'rateMax'),
    billRate: metadataDecimal(metadata, 'billRate'),
    payRate: metadataDecimal(metadata, 'payRate'),
    tags: metadataString(metadata, 'tags'),
    skills: metadataStringArray(metadata, 'skills'),
    engagement: engagementId ? engagementMap.get(engagementId) ?? null : null,
  };
};

const buildCandidateFields = (
    entity: Entity, personaMap: PersonaMap,
    roleMap: Map<string, ReturnType<typeof serializeRole>>) => {
  const metadata = asRecord(entity.metadata);
  const roleId = metadataString(metadata, 'roleId');
  const personaId = metadataString(metadata, 'personaId');
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
    persona: resolvePersona(personaId, personaMap),
    role: roleId ? roleMap.get(roleId) ?? null : null,
  };
};

const buildShiftFields = (
    entity: Entity, personaMap: PersonaMap,
    candidateSummaries: Map<string, CandidateSummary>) => {
  const metadata = asRecord(entity.metadata);
  const assignedPersonaId = metadataString(metadata, 'assignedPersonaId');
  const assignedCandidateId = metadataString(metadata, 'assignedCandidateId');
  return {
    id: entity.id,
    roleId: metadataString(metadata, 'roleId'),
    title: metadataString(metadata, 'title') ?? '',
    location: metadataString(metadata, 'location'),
    startsAt: metadataDate(metadata, 'startsAt'),
    endsAt: metadataDate(metadata, 'endsAt'),
    status: lifecycleStatusOrDefault(
        metadataString(metadata, 'status') ?? undefined,
        LIFECYCLE_STATUSES.SCHEDULED),
    coverageStatus: coverageStatusOrDefault(
        metadataString(metadata, 'coverageStatus') ?? undefined,
        COVERAGE_STATUSES.UNFILLED),
    assignedPersona: resolvePersona(assignedPersonaId, personaMap),
    assignedCandidate: assignedCandidateId ?
        candidateSummaries.get(assignedCandidateId) ?? null : null,
    notes: metadataString(metadata, 'notes'),
  };
};

const buildPlacementFields = (
    entity: Entity, personaMap: PersonaMap,
    roleMap: Map<string, ReturnType<typeof serializeRole>>,
    engagementMap: Map<string, EngagementFields>,
    candidateSummaries: Map<string, CandidateSummary>) => {
  const metadata = asRecord(entity.metadata);
  const billRate = metadataDecimal(metadata, 'billRate');
  const payRate = metadataDecimal(metadata, 'payRate');
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
        metadataString(metadata, 'status') ?? undefined,
        LIFECYCLE_STATUSES.ACTIVE),
    billRate,
    payRate,
    margin: billRate && payRate ? billRate.sub(payRate) : billRate ?? null,
    note: metadataString(metadata, 'note'),
    persona: resolvePersona(personaId, personaMap),
    candidate: candidateId ? candidateSummaries.get(candidateId) ?? null : null,
    role: roleId ? roleMap.get(roleId) ?? null : null,
    engagement: engagementId ? engagementMap.get(engagementId) ?? null : null,
  };
};

const groupByMetadataKey = (entities: Entity[], key: string) => {
  const grouped = new Map<string, Entity[]>();
  entities.forEach((entity) => {
    const value = metadataString(asRecord(entity.metadata), key);
    if (!value) return;
    const entries = grouped.get(value) ?? [];
    entries.push(entity);
    grouped.set(value, entries);
  });
  return grouped;
};

export async function createStaffingEngagement(
    transaction: StaffingTransaction, userId: string,
    command: CreateStaffingEngagementCommand) {
  const actor = await ensureStaffingActor(transaction, userId);
  const startDate = parseDate(command.startDate);
  const endDate = parseDate(command.endDate);
  const budget = parseMoney(command.budget);
  const forecast = parseMoney(command.forecast);
  const engagement = await transaction.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.STAFFING_ENGAGEMENT,
      source: STAFFING_ACTOR_SOURCE,
      metadata: {
        name: command.name.trim(),
        client: command.client?.trim() || null,
        priority: engagementPriorityOrDefault(
            command.priority, ENGAGEMENT_PRIORITIES.MEDIUM),
        status: lifecycleStatusOrDefault(
            command.status, LIFECYCLE_STATUSES.ACTIVE),
        startDate: startDate?.toISOString() ?? null,
        endDate: endDate?.toISOString() ?? null,
        budget: budget?.toFixed(2) ?? null,
        forecast: forecast?.toFixed(2) ?? null,
        notes: command.notes?.trim() || null,
      },
    },
  });
  return serializeEngagement({
    ...buildEngagementFields(engagement),
    roles: [],
    candidates: [],
    placements: [],
  });
}

const requireOwnedEntity = async (
    transaction: StaffingTransaction, userId: string, kind: Entity['kind'],
    id: string, code: StaffingOperationsErrorCode, message: string) => {
  const record = await loadStaffingEntityByKind(
      transaction as PrismaClient, userId, kind as any, id);
  if (!record) throw new StaffingOperationsError(code, message);
  return record;
};

const loadPersonas = async (
    transaction: StaffingTransaction, userId: string) =>
  findPersonaMap(transaction as PrismaClient, userId);

const requirePersona = async (
    transaction: StaffingTransaction, userId: string, personaId: string) => {
  const personas = await loadPersonas(transaction, userId);
  if (!personas.has(personaId)) {
    throw new StaffingOperationsError('PERSONA_NOT_FOUND', 'Persona not found');
  }
  return personas;
};

export async function createStaffingRole(
    transaction: StaffingTransaction, userId: string,
    command: CreateStaffingRoleCommand) {
  if (command.engagementId) {
    await requireOwnedEntity(
        transaction, userId, ENTITY_KINDS.STAFFING_ENGAGEMENT,
        command.engagementId, 'ENGAGEMENT_NOT_FOUND', 'Engagement not found');
  }
  const openings = command.openings === undefined ? 1 : Number(command.openings);
  if (!Number.isFinite(openings) || openings <= 0) {
    throw new StaffingOperationsError(
        'INVALID_OPENINGS', 'openings must be positive');
  }
  const actor = await ensureStaffingActor(transaction, userId);
  const role = await transaction.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.STAFFING_ROLE,
      source: STAFFING_ACTOR_SOURCE,
      targetId: command.engagementId || null,
      metadata: {
        engagementId: command.engagementId || null,
        title: command.title.trim(),
        location: command.location?.trim() || null,
        modality: command.modality?.trim() || null,
        openings,
        priority: engagementPriorityOrDefault(
            command.priority, ENGAGEMENT_PRIORITIES.NORMAL),
        status: lifecycleStatusOrDefault(
            command.status, LIFECYCLE_STATUSES.OPEN),
        rateMin: parseMoney(command.rateMin)?.toFixed(2) ?? null,
        rateMax: parseMoney(command.rateMax)?.toFixed(2) ?? null,
        billRate: parseMoney(command.billRate)?.toFixed(2) ?? null,
        payRate: parseMoney(command.payRate)?.toFixed(2) ?? null,
        tags: command.tags?.trim() || null,
        skills: normalizeSkills(command.skills),
      },
    },
  });
  return serializeRole(buildRoleFields(role, new Map(), new Map()));
}

export async function createStaffingCandidate(
    transaction: StaffingTransaction, userId: string,
    command: CreateStaffingCandidateCommand) {
  if (command.engagementId) {
    await requireOwnedEntity(
        transaction, userId, ENTITY_KINDS.STAFFING_ENGAGEMENT,
        command.engagementId, 'ENGAGEMENT_NOT_FOUND', 'Engagement not found');
  }
  if (command.roleId) {
    await requireOwnedEntity(
        transaction, userId, ENTITY_KINDS.STAFFING_ROLE, command.roleId,
        'ROLE_NOT_FOUND', 'Role not found');
  }
  const personaMap = command.personaId ?
      await requirePersona(transaction, userId, command.personaId) :
      await loadPersonas(transaction, userId);
  const actor = await ensureStaffingActor(transaction, userId);
  const candidate = await transaction.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.STAFFING_CANDIDATE,
      source: STAFFING_ACTOR_SOURCE,
      targetId: command.roleId || command.engagementId || null,
      metadata: {
        engagementId: command.engagementId || null,
        roleId: command.roleId || null,
        personaId: command.personaId || null,
        fullName: command.fullName.trim(),
        email: command.email?.trim() || null,
        phone: command.phone?.trim() || null,
        source: command.source?.trim() || null,
        stage: command.stage?.trim() || 'prospect',
        score: parseMoney(command.score)?.toFixed(2) ?? null,
        desiredRate: parseMoney(command.desiredRate)?.toFixed(2) ?? null,
        availability: command.availability?.trim() || null,
        location: command.location?.trim() || null,
        note: command.note?.trim() || null,
        tags: normalizeSkills(command.tags),
      },
    },
  });
  return serializeCandidate(
      buildCandidateFields(candidate, personaMap, new Map()));
}

export async function updateStaffingCandidateStage(
    transaction: StaffingTransaction, userId: string, candidateId: string,
    stage: string) {
  const candidate = await requireOwnedEntity(
      transaction, userId, ENTITY_KINDS.STAFFING_CANDIDATE, candidateId,
      'CANDIDATE_NOT_FOUND', 'Candidate not found');
  const metadata = {...asRecord(candidate.metadata), stage: stage.trim()};
  await transaction.entity.update({
    where: {id: candidateId},
    data: {metadata},
  });
  const updated = await transaction.entity.findUnique({where: {id: candidateId}});
  if (!updated) {
    throw new StaffingOperationsError(
        'CANDIDATE_NOT_FOUND', 'Candidate not found');
  }
  const personaMap = await loadPersonas(transaction, userId);
  return serializeCandidate(buildCandidateFields(updated, personaMap, new Map()));
}

export async function createStaffingShift(
    transaction: StaffingTransaction, userId: string,
    command: CreateStaffingShiftCommand) {
  const startsAt = parseDate(command.startsAt);
  const endsAt = parseDate(command.endsAt);
  if (!startsAt || !endsAt || startsAt >= endsAt) {
    throw new StaffingOperationsError(
        'INVALID_SHIFT_DATES',
        'startsAt and endsAt must be valid and ordered');
  }
  if (command.roleId) {
    await requireOwnedEntity(
        transaction, userId, ENTITY_KINDS.STAFFING_ROLE, command.roleId,
        'ROLE_NOT_FOUND', 'Role not found');
  }
  const personaMap = command.assignedPersonaId ?
      await requirePersona(transaction, userId, command.assignedPersonaId) :
      await loadPersonas(transaction, userId);
  const assignedCandidate = command.assignedCandidateId ?
      await requireOwnedEntity(
          transaction, userId, ENTITY_KINDS.STAFFING_CANDIDATE,
          command.assignedCandidateId, 'CANDIDATE_NOT_FOUND',
          'Candidate not found') : null;
  const actor = await ensureStaffingActor(transaction, userId);
  const shift = await transaction.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.STAFFING_SHIFT,
      source: STAFFING_ACTOR_SOURCE,
      targetId: command.roleId || null,
      metadata: {
        roleId: command.roleId || null,
        title: command.title.trim(),
        location: command.location?.trim() || null,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        status: lifecycleStatusOrDefault(
            command.status, LIFECYCLE_STATUSES.SCHEDULED),
        coverageStatus: coverageStatusOrDefault(
            command.coverageStatus, COVERAGE_STATUSES.UNFILLED),
        assignedPersonaId: command.assignedPersonaId || null,
        assignedCandidateId: command.assignedCandidateId || null,
        notes: command.notes?.trim() || null,
      },
    },
  });
  const candidates = new Map<string, CandidateSummary>();
  if (assignedCandidate) {
    const fields = buildCandidateFields(assignedCandidate, personaMap, new Map());
    candidates.set(assignedCandidate.id, {
      id: fields.id,
      fullName: fields.fullName,
      stage: fields.stage,
    });
  }
  return serializeShift(buildShiftFields(shift, personaMap, candidates));
}

export async function createStaffingPlacement(
    transaction: StaffingTransaction, userId: string,
    command: CreateStaffingPlacementCommand) {
  const role = command.roleId ? await requireOwnedEntity(
      transaction, userId, ENTITY_KINDS.STAFFING_ROLE, command.roleId,
      'ROLE_NOT_FOUND', 'Role not found') : null;
  const engagement = command.engagementId ? await requireOwnedEntity(
      transaction, userId, ENTITY_KINDS.STAFFING_ENGAGEMENT,
      command.engagementId, 'ENGAGEMENT_NOT_FOUND', 'Engagement not found') : null;
  const candidate = command.candidateId ? await requireOwnedEntity(
      transaction, userId, ENTITY_KINDS.STAFFING_CANDIDATE,
      command.candidateId, 'CANDIDATE_NOT_FOUND', 'Candidate not found') : null;
  const personaMap = command.personaId ?
      await requirePersona(transaction, userId, command.personaId) :
      await loadPersonas(transaction, userId);
  const actor = await ensureStaffingActor(transaction, userId);
  const billRate = parseMoney(command.billRate);
  const payRate = parseMoney(command.payRate);
  const margin = billRate && payRate ? billRate.sub(payRate) : billRate ?? null;
  const placement = await transaction.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.STAFFING_PLACEMENT,
      source: STAFFING_ACTOR_SOURCE,
      targetId: command.roleId || command.engagementId || null,
      metadata: {
        engagementId: command.engagementId || null,
        roleId: command.roleId || null,
        candidateId: command.candidateId || null,
        personaId: command.personaId || null,
        startDate: parseDate(command.startDate)?.toISOString() ?? null,
        endDate: parseDate(command.endDate)?.toISOString() || null,
        status: lifecycleStatusOrDefault(
            command.status, LIFECYCLE_STATUSES.ACTIVE),
        billRate: billRate?.toFixed(2) ?? null,
        payRate: payRate?.toFixed(2) ?? null,
        margin: margin?.toFixed(2) ?? null,
        note: command.note?.trim() || null,
      },
    },
  });
  const roleMap = new Map<string, ReturnType<typeof serializeRole>>();
  if (role) roleMap.set(
      role.id, serializeRole(buildRoleFields(role, new Map(), new Map())));
  const engagementMap = new Map<string, EngagementFields>();
  if (engagement) engagementMap.set(
      engagement.id, buildEngagementFields(engagement));
  const candidates = new Map<string, CandidateSummary>();
  if (candidate) {
    const fields = buildCandidateFields(candidate, personaMap, roleMap);
    candidates.set(candidate.id, {
      id: fields.id,
      fullName: fields.fullName,
      stage: fields.stage,
    });
  }
  return serializePlacement(buildPlacementFields(
      placement, personaMap, roleMap, engagementMap, candidates));
}

export async function getStaffingDashboard(
    prisma: PrismaClient, userId: string) {
  const [personaMap, staffingActor] = await Promise.all([
    findPersonaMap(prisma, userId),
    ensureStaffingActor(prisma, userId),
  ]);
  const collections = await loadStaffingEntities(prisma, staffingActor.id);
  const engagementMap = new Map(
      collections.engagements.map((item) => [item.id, buildEngagementFields(item)]));
  const placementsByRole = groupByMetadataKey(collections.placements, 'roleId');
  const roleDetails = collections.roles.map((item) => {
    const fields = buildRoleFields(item, engagementMap, placementsByRole);
    return {fields, serialized: serializeRole(fields)};
  });
  const roleMap = new Map(roleDetails.map(({fields, serialized}) =>
    [fields.id, serialized]));
  const candidateDetails = collections.candidates.map((item) => {
    const fields = buildCandidateFields(item, personaMap, roleMap);
    return {fields, serialized: serializeCandidate(fields)};
  });
  const candidateSummaries = new Map(candidateDetails.map(({fields}) => [
    fields.id,
    {id: fields.id, fullName: fields.fullName, stage: fields.stage},
  ]));
  const shifts = collections.shifts.map((item) =>
    serializeShift(buildShiftFields(item, personaMap, candidateSummaries)));
  const placementDetails = collections.placements.map((item) => {
    const fields = buildPlacementFields(
        item, personaMap, roleMap, engagementMap, candidateSummaries);
    return {fields, serialized: serializePlacement(fields)};
  });
  const groupSerialized = <Value extends {engagementId: string|null}>(
      values: Value[]) => {
    const grouped = new Map<string, Value[]>();
    values.forEach((value) => {
      if (!value.engagementId) return;
      const entries = grouped.get(value.engagementId) ?? [];
      entries.push(value);
      grouped.set(value.engagementId, entries);
    });
    return grouped;
  };
  const rolesByEngagement = groupSerialized(
      roleDetails.map(({serialized}) => serialized));
  const candidatesByEngagement = groupSerialized(
      candidateDetails.map(({serialized}) => serialized));
  const placementsByEngagement = groupSerialized(
      placementDetails.map(({serialized}) => serialized));
  const totalOpenings = roleDetails.reduce(
      (sum, {fields}) => sum + fields.openings, 0);
  const totalFilled = roleDetails.reduce(
      (sum, {fields}) => sum + fields.filled, 0);

  return {
    engagements: collections.engagements.map((item) => serializeEngagement({
      ...buildEngagementFields(item),
      roles: rolesByEngagement.get(item.id) ?? [],
      candidates: candidatesByEngagement.get(item.id) ?? [],
      placements: placementsByEngagement.get(item.id) ?? [],
    })),
    roles: roleDetails.map(({serialized}) => serialized),
    candidates: candidateDetails.map(({serialized}) => serialized),
    shifts,
    placements: placementDetails.map(({serialized}) => serialized),
    metrics: {
      openRoles: roleDetails.filter(
          ({fields}) => fields.status !== LIFECYCLE_STATUSES.CLOSED).length,
      activeCandidates: candidateDetails.filter(
          ({fields}) => fields.stage !== 'archived').length,
      scheduledShifts: shifts.length,
      activePlacements: placementDetails.filter(
          ({fields}) => fields.status === LIFECYCLE_STATUSES.ACTIVE).length,
      fillRate: totalOpenings > 0 ?
          Number(((totalFilled / totalOpenings) * 100).toFixed(1)) : 0,
    },
  };
}
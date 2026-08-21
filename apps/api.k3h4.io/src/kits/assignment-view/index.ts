import {Prisma, type Entity} from '@prisma/client';

import type {PersonaRecord} from '../../entities/Persona/Persona';

const metadataRecord = (value: Prisma.JsonValue|null|undefined) =>
    value && typeof value === 'object' && !Array.isArray(value) ?
    value as Record<string, unknown> : {};

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  return value == null ? null : String(value);
};

const metadataDecimal =
    (metadata: Record<string, unknown>, key: string, fallback = '0.00') => {
      const value = metadata[key];
      return typeof value === 'string' && value.length ?
          new Prisma.Decimal(value) :
          typeof value === 'number' && Number.isFinite(value) ?
          new Prisma.Decimal(value) :
          fallback;
    };

const serializeAssignment = (assignment: any) => ({
  id: assignment.id,
  title: assignment.title,
  hourlyRate: assignment.hourlyRate instanceof Prisma.Decimal ?
      assignment.hourlyRate.toFixed(2) :
      String(assignment.hourlyRate),
  persona: assignment.persona,
  timecards: (assignment.timecards ?? []).map((timecard: any) => ({
    ...timecard,
    hours: timecard.hours instanceof Prisma.Decimal ?
        timecard.hours.toFixed(2) :
        String(timecard.hours),
    amount: timecard.amount instanceof Prisma.Decimal ?
        timecard.amount.toFixed(2) :
        String(timecard.amount),
  })),
  payouts: (assignment.payouts ?? []).map((payout: any) => ({
    ...payout,
    amount: payout.amount instanceof Prisma.Decimal ?
        payout.amount.toFixed(2) :
        String(payout.amount),
  })),
});

const buildAssignmentRecord = (entity: Entity) => {
  const metadata = metadataRecord(entity.metadata);
  return {
    id: entity.id,
    title: metadataString(metadata, 'title') ?? '',
    hourlyRate: metadataDecimal(metadata, 'hourlyRate'),
    personaId: metadataString(metadata, 'personaId'),
  };
};

const buildTimecardRecord = (entity: Entity) => {
  const metadata = metadataRecord(entity.metadata);
  return {
    id: entity.id,
    hours: metadataDecimal(metadata, 'hours'),
    amount: metadataDecimal(metadata, 'amount'),
    note: metadataString(metadata, 'note'),
    status: metadataString(metadata, 'status') ?? 'approved',
  };
};

const buildPayoutRecord = (entity: Entity) => {
  const metadata = metadataRecord(entity.metadata);
  return {
    id: entity.id,
    amount: metadataDecimal(metadata, 'amount'),
    note: metadataString(metadata, 'note'),
    invoiceUrl: metadataString(metadata, 'invoiceUrl'),
    status: metadataString(metadata, 'status') ?? 'paid',
  };
};

const groupByTargetId = (entities: Entity[]) => {
  const grouped = new Map<string, Entity[]>();
  for (const entity of entities) {
    if (!entity.targetId) continue;
    const bucket = grouped.get(entity.targetId) ?? [];
    bucket.push(entity);
    grouped.set(entity.targetId, bucket);
  }
  return grouped;
};

const personaResponse = (personaId: string|null, personaMap: Map<string, PersonaRecord>) => {
  const persona = personaId ? personaMap.get(personaId) : null;
  if (!persona) return null;
  return {
    id: persona.id,
    alias: persona.alias,
    account: persona.account,
    handle: persona.handle ?? undefined,
    note: persona.note ?? undefined,
    tags: persona.tags,
    attributes: persona.attributes.map((attribute) => ({
      id: attribute.id,
      category: attribute.category,
      value: attribute.value,
      weight: attribute.weight,
    })),
    createdAt: persona.createdAt,
    updatedAt: persona.updatedAt,
  };
};

export function serializeAssignmentList(
    assignments: Entity[], timecards: Entity[], payouts: Entity[],
    personaMap: Map<string, PersonaRecord>) {
  const timecardsByAssignment = groupByTargetId(timecards);
  const payoutsByAssignment = groupByTargetId(payouts);
  return assignments.map((entity) => {
    const assignment = buildAssignmentRecord(entity);
    return serializeAssignment({
      ...assignment,
      persona: personaResponse(assignment.personaId, personaMap),
      timecards: (timecardsByAssignment.get(entity.id) ?? [])
          .map(buildTimecardRecord),
      payouts: (payoutsByAssignment.get(entity.id) ?? [])
          .map(buildPayoutRecord),
    });
  });
}
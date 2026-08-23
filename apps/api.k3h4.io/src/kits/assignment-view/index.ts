export type AssignmentViewRecord = {
  id: string;
  title: string;
  hourlyRate: string;
  personaId: string|null;
};

export type AssignmentTimecardViewRecord = {
  id: string;
  assignmentId: string;
  hours: string;
  amount: string;
  note: string|null;
  status: string;
};

export type AssignmentPayoutViewRecord = {
  id: string;
  assignmentId: string;
  amount: string;
  note: string|null;
  invoiceUrl: string|null;
  status: string;
};

export type AssignmentPersonaView = {
  id: string;
  alias: string;
  account: string;
  handle?: string|null;
  note?: string|null;
  tags: string[];
  attributes: Array<{
    id: string;
    category: string;
    value: string;
    weight: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

const serializeAssignment = (assignment: any) => ({
  id: assignment.id,
  title: assignment.title,
  hourlyRate: assignment.hourlyRate,
  persona: assignment.persona,
  timecards: (assignment.timecards ?? []).map((timecard: any) => {
    const {assignmentId: _, ...response} = timecard;
    return response;
  }),
  payouts: (assignment.payouts ?? []).map((payout: any) => {
    const {assignmentId: _, ...response} = payout;
    return response;
  }),
});

const groupByAssignmentId = <Record extends {assignmentId: string}>(
    records: Record[]) => {
  const grouped = new Map<string, Record[]>();
  for (const record of records) {
    const bucket = grouped.get(record.assignmentId) ?? [];
    bucket.push(record);
    grouped.set(record.assignmentId, bucket);
  }
  return grouped;
};

const personaResponse = (
    personaId: string|null,
    personaMap: Map<string, AssignmentPersonaView>) => {
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
    assignments: AssignmentViewRecord[],
    timecards: AssignmentTimecardViewRecord[],
    payouts: AssignmentPayoutViewRecord[],
    personaMap: Map<string, AssignmentPersonaView>) {
  const timecardsByAssignment = groupByAssignmentId(timecards);
  const payoutsByAssignment = groupByAssignmentId(payouts);
  return assignments.map((assignment) => {
    return serializeAssignment({
      ...assignment,
      persona: personaResponse(assignment.personaId, personaMap),
      timecards: timecardsByAssignment.get(assignment.id) ?? [],
      payouts: payoutsByAssignment.get(assignment.id) ?? [],
    });
  });
}
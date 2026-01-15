import * as z from 'zod';
// prettier-ignore
export const StaffingShiftModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    roleId: z.string().nullable(),
    role: z.unknown().nullable(),
    title: z.string(),
    location: z.string().nullable(),
    startsAt: z.date(),
    endsAt: z.date(),
    status: z.string(),
    coverageStatus: z.string(),
    assignedPersonaId: z.string().nullable(),
    assignedPersona: z.unknown().nullable(),
    assignedCandidateId: z.string().nullable(),
    assignedCandidate: z.unknown().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffingShiftPureType = z.infer<typeof StaffingShiftModelSchema>;

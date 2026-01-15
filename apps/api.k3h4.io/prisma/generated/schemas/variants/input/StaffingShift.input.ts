import * as z from 'zod';
// prettier-ignore
export const StaffingShiftInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    roleId: z.string().optional().nullable(),
    role: z.unknown().optional().nullable(),
    title: z.string(),
    location: z.string().optional().nullable(),
    startsAt: z.date(),
    endsAt: z.date(),
    status: z.string(),
    coverageStatus: z.string(),
    assignedPersonaId: z.string().optional().nullable(),
    assignedPersona: z.unknown().optional().nullable(),
    assignedCandidateId: z.string().optional().nullable(),
    assignedCandidate: z.unknown().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffingShiftInputType = z.infer<typeof StaffingShiftInputSchema>;

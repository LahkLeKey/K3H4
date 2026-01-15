import * as z from 'zod';
// prettier-ignore
export const StaffingPlacementResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().nullable(),
    engagement: z.unknown().nullable(),
    roleId: z.string().nullable(),
    role: z.unknown().nullable(),
    candidateId: z.string().nullable(),
    candidate: z.unknown().nullable(),
    personaId: z.string().nullable(),
    persona: z.unknown().nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    status: z.string(),
    billRate: z.number().nullable(),
    payRate: z.number().nullable(),
    margin: z.number().nullable(),
    note: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffingPlacementResultType = z.infer<typeof StaffingPlacementResultSchema>;

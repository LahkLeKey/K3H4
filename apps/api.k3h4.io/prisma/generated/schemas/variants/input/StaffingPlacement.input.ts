import * as z from 'zod';
// prettier-ignore
export const StaffingPlacementInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().optional().nullable(),
    engagement: z.unknown().optional().nullable(),
    roleId: z.string().optional().nullable(),
    role: z.unknown().optional().nullable(),
    candidateId: z.string().optional().nullable(),
    candidate: z.unknown().optional().nullable(),
    personaId: z.string().optional().nullable(),
    persona: z.unknown().optional().nullable(),
    startDate: z.date(),
    endDate: z.date().optional().nullable(),
    status: z.string(),
    billRate: z.number().optional().nullable(),
    payRate: z.number().optional().nullable(),
    margin: z.number().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffingPlacementInputType = z.infer<typeof StaffingPlacementInputSchema>;

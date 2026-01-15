import * as z from 'zod';
// prettier-ignore
export const StaffingRoleResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().nullable(),
    engagement: z.unknown().nullable(),
    title: z.string(),
    location: z.string().nullable(),
    modality: z.string().nullable(),
    openings: z.number().int(),
    filled: z.number().int(),
    priority: z.string(),
    status: z.string(),
    rateMin: z.number().nullable(),
    rateMax: z.number().nullable(),
    billRate: z.number().nullable(),
    payRate: z.number().nullable(),
    tags: z.string().nullable(),
    skills: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    candidates: z.array(z.unknown()),
    shifts: z.array(z.unknown()),
    placements: z.array(z.unknown())
}).strict();

export type StaffingRoleResultType = z.infer<typeof StaffingRoleResultSchema>;

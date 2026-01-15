import * as z from 'zod';
// prettier-ignore
export const StaffingRoleInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().optional().nullable(),
    engagement: z.unknown().optional().nullable(),
    title: z.string(),
    location: z.string().optional().nullable(),
    modality: z.string().optional().nullable(),
    openings: z.number().int(),
    filled: z.number().int(),
    priority: z.string(),
    status: z.string(),
    rateMin: z.number().optional().nullable(),
    rateMax: z.number().optional().nullable(),
    billRate: z.number().optional().nullable(),
    payRate: z.number().optional().nullable(),
    tags: z.string().optional().nullable(),
    skills: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    candidates: z.array(z.unknown()),
    shifts: z.array(z.unknown()),
    placements: z.array(z.unknown())
}).strict();

export type StaffingRoleInputType = z.infer<typeof StaffingRoleInputSchema>;

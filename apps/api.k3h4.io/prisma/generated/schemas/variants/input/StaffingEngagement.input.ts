import * as z from 'zod';
// prettier-ignore
export const StaffingEngagementInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    client: z.string().optional().nullable(),
    priority: z.string(),
    status: z.string(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    budget: z.number().optional().nullable(),
    forecast: z.number().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    roles: z.array(z.unknown()),
    candidates: z.array(z.unknown()),
    placements: z.array(z.unknown())
}).strict();

export type StaffingEngagementInputType = z.infer<typeof StaffingEngagementInputSchema>;

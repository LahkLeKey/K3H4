import * as z from 'zod';
// prettier-ignore
export const AgricultureTaskInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    plotId: z.string().optional().nullable(),
    plot: z.unknown().optional().nullable(),
    cropPlanId: z.string().optional().nullable(),
    cropPlan: z.unknown().optional().nullable(),
    title: z.string(),
    assignee: z.string().optional().nullable(),
    priority: z.number().int(),
    tags: z.unknown().optional().nullable(),
    notes: z.string().optional().nullable(),
    dueDate: z.date().optional().nullable(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureTaskInputType = z.infer<typeof AgricultureTaskInputSchema>;

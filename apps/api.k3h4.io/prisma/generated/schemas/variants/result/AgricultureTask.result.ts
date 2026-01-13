import * as z from 'zod';
// prettier-ignore
export const AgricultureTaskResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    plotId: z.string().nullable(),
    plot: z.unknown().nullable(),
    cropPlanId: z.string().nullable(),
    cropPlan: z.unknown().nullable(),
    title: z.string(),
    assignee: z.string().nullable(),
    priority: z.number().int(),
    tags: z.unknown().nullable(),
    notes: z.string().nullable(),
    dueDate: z.date().nullable(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureTaskResultType = z.infer<typeof AgricultureTaskResultSchema>;

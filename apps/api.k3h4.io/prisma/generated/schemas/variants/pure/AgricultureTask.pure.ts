import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const AgricultureTaskModelSchema = z.object({
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
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureTaskPureType = z.infer<typeof AgricultureTaskModelSchema>;

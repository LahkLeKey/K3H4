import * as z from 'zod';
import { EngagementPrioritySchema } from '../../enums/EngagementPriority.schema';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const StaffingEngagementModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    client: z.string().nullable(),
    priority: EngagementPrioritySchema,
    status: LifecycleStatusSchema,
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    budget: z.number().nullable(),
    forecast: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    roles: z.array(z.unknown()),
    candidates: z.array(z.unknown()),
    placements: z.array(z.unknown())
}).strict();

export type StaffingEngagementPureType = z.infer<typeof StaffingEngagementModelSchema>;

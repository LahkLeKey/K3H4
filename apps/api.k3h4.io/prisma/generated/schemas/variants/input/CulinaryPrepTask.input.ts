import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const CulinaryPrepTaskInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    task: z.string(),
    station: z.string(),
    dueAt: z.date().optional().nullable(),
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CulinaryPrepTaskInputType = z.infer<typeof CulinaryPrepTaskInputSchema>;

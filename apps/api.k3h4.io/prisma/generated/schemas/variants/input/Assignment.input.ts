import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const AssignmentInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    personaId: z.string(),
    persona: z.unknown(),
    title: z.string(),
    hourlyRate: z.number(),
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    timecards: z.array(z.unknown()),
    payouts: z.array(z.unknown())
}).strict();

export type AssignmentInputType = z.infer<typeof AssignmentInputSchema>;

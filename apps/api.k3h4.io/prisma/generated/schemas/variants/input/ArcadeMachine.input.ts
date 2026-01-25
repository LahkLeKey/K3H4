import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const ArcadeMachineInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    gameTitle: z.string(),
    status: LifecycleStatusSchema,
    location: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    sessions: z.array(z.unknown())
}).strict();

export type ArcadeMachineInputType = z.infer<typeof ArcadeMachineInputSchema>;

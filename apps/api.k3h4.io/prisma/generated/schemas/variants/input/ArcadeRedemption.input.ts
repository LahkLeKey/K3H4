import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const ArcadeRedemptionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    cardId: z.string().optional().nullable(),
    card: z.unknown().optional().nullable(),
    prizeId: z.string(),
    prize: z.unknown(),
    status: LifecycleStatusSchema,
    fulfilledAt: z.date().optional().nullable(),
    createdAt: z.date(),
    sessions: z.array(z.unknown())
}).strict();

export type ArcadeRedemptionInputType = z.infer<typeof ArcadeRedemptionInputSchema>;

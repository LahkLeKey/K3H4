import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const ArcadeRedemptionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    cardId: z.string().nullable(),
    card: z.unknown().nullable(),
    prizeId: z.string(),
    prize: z.unknown(),
    status: LifecycleStatusSchema,
    fulfilledAt: z.date().nullable(),
    createdAt: z.date(),
    sessions: z.array(z.unknown())
}).strict();

export type ArcadeRedemptionPureType = z.infer<typeof ArcadeRedemptionModelSchema>;

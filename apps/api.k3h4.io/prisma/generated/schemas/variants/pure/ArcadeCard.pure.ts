import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const ArcadeCardModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    label: z.string().nullable(),
    balance: z.number(),
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    topUps: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    redemptions: z.array(z.unknown())
}).strict();

export type ArcadeCardPureType = z.infer<typeof ArcadeCardModelSchema>;

import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const PosTicketModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    storeId: z.string(),
    store: z.unknown(),
    total: z.number(),
    itemsCount: z.number().int(),
    channel: z.string(),
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    lineItems: z.array(z.unknown())
}).strict();

export type PosTicketPureType = z.infer<typeof PosTicketModelSchema>;

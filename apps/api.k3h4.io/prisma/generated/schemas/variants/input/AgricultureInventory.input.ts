import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const AgricultureInventoryInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sku: z.string(),
    description: z.string().optional().nullable(),
    totalQuantity: z.number(),
    unit: z.string(),
    location: z.string().optional().nullable(),
    status: LifecycleStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    movements: z.array(z.unknown())
}).strict();

export type AgricultureInventoryInputType = z.infer<typeof AgricultureInventoryInputSchema>;

import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const CulinarySupplierNeedInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    item: z.string(),
    quantity: z.string(),
    status: LifecycleStatusSchema,
    dueDate: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CulinarySupplierNeedInputType = z.infer<typeof CulinarySupplierNeedInputSchema>;

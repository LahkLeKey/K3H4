import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
import { WarehouseCategorySchema } from '../../enums/WarehouseCategory.schema';
// prettier-ignore
export const WarehouseItemModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sku: z.string(),
    description: z.string().nullable(),
    quantity: z.number().int(),
    location: z.string(),
    status: LifecycleStatusSchema,
    freightLoadId: z.string().nullable(),
    freightLoad: z.unknown().nullable(),
    category: WarehouseCategorySchema,
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WarehouseItemPureType = z.infer<typeof WarehouseItemModelSchema>;

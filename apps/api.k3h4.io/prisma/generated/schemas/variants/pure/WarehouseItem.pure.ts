import * as z from 'zod';
// prettier-ignore
export const WarehouseItemModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sku: z.string(),
    description: z.string().nullable(),
    quantity: z.number().int(),
    location: z.string(),
    status: z.string(),
    freightLoadId: z.string().nullable(),
    freightLoad: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WarehouseItemPureType = z.infer<typeof WarehouseItemModelSchema>;

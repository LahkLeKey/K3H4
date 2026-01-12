import * as z from 'zod';
// prettier-ignore
export const WarehouseItemInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sku: z.string(),
    description: z.string().optional().nullable(),
    quantity: z.number().int(),
    location: z.string(),
    status: z.string(),
    freightLoadId: z.string().optional().nullable(),
    freightLoad: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WarehouseItemInputType = z.infer<typeof WarehouseItemInputSchema>;

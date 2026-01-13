import * as z from 'zod';
// prettier-ignore
export const AgricultureInventoryMovementResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    inventoryId: z.string(),
    inventory: z.unknown(),
    shipmentId: z.string().nullable(),
    shipment: z.unknown().nullable(),
    type: z.string(),
    quantity: z.number(),
    reason: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureInventoryMovementResultType = z.infer<typeof AgricultureInventoryMovementResultSchema>;

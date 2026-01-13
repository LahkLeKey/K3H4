import * as z from 'zod';
// prettier-ignore
export const AgricultureInventoryMovementInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    inventoryId: z.string(),
    inventory: z.unknown(),
    shipmentId: z.string().optional().nullable(),
    shipment: z.unknown().optional().nullable(),
    type: z.string(),
    quantity: z.number(),
    reason: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureInventoryMovementInputType = z.infer<typeof AgricultureInventoryMovementInputSchema>;

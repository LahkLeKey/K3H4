import * as z from 'zod';
// prettier-ignore
export const AgricultureShipmentInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    lot: z.string(),
    destination: z.string(),
    mode: z.string(),
    eta: z.date().optional().nullable(),
    freightLoadId: z.string().optional().nullable(),
    freightLoad: z.unknown().optional().nullable(),
    inventoryMovements: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureShipmentInputType = z.infer<typeof AgricultureShipmentInputSchema>;

import * as z from 'zod';
// prettier-ignore
export const AgricultureShipmentModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    lot: z.string(),
    destination: z.string(),
    mode: z.string(),
    eta: z.date().nullable(),
    freightLoadId: z.string().nullable(),
    freightLoad: z.unknown().nullable(),
    inventoryMovements: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureShipmentPureType = z.infer<typeof AgricultureShipmentModelSchema>;

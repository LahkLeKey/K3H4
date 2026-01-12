import * as z from 'zod';
export const AgricultureInventoryMovementFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  inventoryId: z.string(),
  inventory: z.unknown(),
  shipmentId: z.string().optional(),
  shipment: z.unknown().optional(),
  type: z.string(),
  quantity: z.number(),
  reason: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));
import * as z from 'zod';
export const AgricultureInventoryMovementFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});
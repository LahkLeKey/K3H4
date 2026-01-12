import * as z from 'zod';
export const AgricultureShipmentFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.date().optional(),
  freightLoadId: z.string().optional(),
  freightLoad: z.unknown().optional(),
  inventoryMovements: z.array(z.unknown()),
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
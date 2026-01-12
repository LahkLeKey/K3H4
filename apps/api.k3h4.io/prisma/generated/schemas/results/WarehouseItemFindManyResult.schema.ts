import * as z from 'zod';
export const WarehouseItemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sku: z.string(),
  description: z.string().optional(),
  quantity: z.number().int(),
  location: z.string(),
  status: z.string(),
  freightLoadId: z.string().optional(),
  freightLoad: z.unknown().optional(),
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
import * as z from 'zod';
export const AgricultureInventoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sku: z.string(),
  description: z.string().optional(),
  totalQuantity: z.number(),
  unit: z.string(),
  location: z.string().optional(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  movements: z.array(z.unknown())
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
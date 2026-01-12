import * as z from 'zod';
export const ArcadePrizeFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  sku: z.string().optional(),
  costCoins: z.number(),
  stock: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  redemptions: z.array(z.unknown())
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
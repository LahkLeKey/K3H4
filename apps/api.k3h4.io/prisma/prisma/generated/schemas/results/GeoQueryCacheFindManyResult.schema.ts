import * as z from 'zod';
export const GeoQueryCacheFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  type: z.string(),
  signature: z.string(),
  params: z.unknown(),
  payload: z.unknown(),
  count: z.number().int().optional(),
  expiresAt: z.date(),
  createdAt: z.date()
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
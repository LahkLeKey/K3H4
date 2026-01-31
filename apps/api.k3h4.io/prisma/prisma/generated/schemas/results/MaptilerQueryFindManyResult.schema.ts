import * as z from 'zod';
export const MaptilerQueryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  actorId: z.string().optional(),
  actor: z.unknown().optional(),
  signature: z.string(),
  kind: z.string(),
  path: z.string(),
  params: z.unknown().optional(),
  lastUsedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  cacheEntries: z.array(z.unknown())
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
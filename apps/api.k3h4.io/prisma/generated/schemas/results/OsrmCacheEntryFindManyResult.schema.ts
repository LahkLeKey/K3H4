import * as z from 'zod';
export const OsrmCacheEntryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  service: z.string(),
  profile: z.string(),
  coordinates: z.string().optional(),
  params: z.unknown().optional(),
  paramsHash: z.string(),
  signature: z.string(),
  url: z.string(),
  statusCode: z.number().int().optional(),
  payload: z.unknown().optional(),
  fetchedAt: z.date(),
  expiresAt: z.date().optional(),
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
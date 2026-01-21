import * as z from 'zod';
export const WikidataCacheEntryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  resource: z.string(),
  endpoint: z.string(),
  params: z.unknown().optional(),
  paramsHash: z.string(),
  url: z.string(),
  statusCode: z.number().int(),
  payload: z.unknown().optional(),
  fetchedAt: z.date(),
  expiresAt: z.date().optional(),
  cacheControlSeconds: z.number().int().optional(),
  etag: z.string().optional(),
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
import * as z from 'zod';
export const MaptilerCacheEntryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  queryId: z.string().optional(),
  query: z.unknown().optional(),
  kind: z.string(),
  path: z.string(),
  params: z.unknown().optional(),
  paramsHash: z.string(),
  signature: z.string(),
  method: z.string(),
  responseType: z.string(),
  url: z.string(),
  statusCode: z.number().int().optional(),
  payload: z.unknown().optional(),
  data: z.instanceof(Uint8Array).optional(),
  contentType: z.string().optional(),
  cacheControl: z.string().optional(),
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
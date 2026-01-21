import * as z from 'zod';
export const WikidataCacheEntryDeleteResultSchema = z.nullable(z.object({
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
}));
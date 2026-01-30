import * as z from 'zod';
export const ApiCacheEntryUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  provider: z.string(),
  scope: z.string(),
  endpoint: z.string(),
  params: z.unknown().optional(),
  paramsHash: z.string(),
  payload: z.unknown().optional(),
  fetchedAt: z.date(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));
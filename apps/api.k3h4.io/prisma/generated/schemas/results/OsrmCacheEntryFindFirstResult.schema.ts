import * as z from 'zod';
export const OsrmCacheEntryFindFirstResultSchema = z.nullable(z.object({
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
}));
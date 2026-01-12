import * as z from 'zod';
export const UsdaCacheEntryDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  dataset: z.string(),
  endpoint: z.string(),
  params: z.unknown().optional(),
  paramsHash: z.string(),
  payload: z.unknown().optional(),
  fetchedAt: z.date(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));
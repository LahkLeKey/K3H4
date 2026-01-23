import * as z from 'zod';
export const EnrichmentCacheDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  provider: z.string(),
  namespace: z.string(),
  kind: z.string(),
  sourceKey: z.string(),
  paramsHash: z.string().optional(),
  wikidataId: z.string().optional(),
  payload: z.unknown().optional(),
  status: z.string().optional(),
  fetchedAt: z.date(),
  expiresAt: z.date().optional(),
  note: z.string().optional()
}));
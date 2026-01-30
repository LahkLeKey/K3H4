import * as z from 'zod';
export const EnrichmentCacheFindManyResultSchema = z.object({
  data: z.array(z.object({
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
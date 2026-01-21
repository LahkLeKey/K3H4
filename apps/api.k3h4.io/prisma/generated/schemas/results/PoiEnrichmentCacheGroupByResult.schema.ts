import * as z from 'zod';
export const PoiEnrichmentCacheGroupByResultSchema = z.array(z.object({
  id: z.string(),
  includeHash: z.string(),
  payload: z.unknown(),
  fetchedAt: z.date(),
  expiresAt: z.date(),
  _count: z.object({
    id: z.number(),
    includeHash: z.number(),
    payload: z.number(),
    fetchedAt: z.number(),
    expiresAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    includeHash: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    includeHash: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable()
  }).nullable().optional()
}));
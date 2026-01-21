import * as z from 'zod';
export const PoiEnrichmentCacheAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});
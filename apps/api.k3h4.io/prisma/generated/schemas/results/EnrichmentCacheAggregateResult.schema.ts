import * as z from 'zod';
export const EnrichmentCacheAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    provider: z.number(),
    namespace: z.number(),
    kind: z.number(),
    sourceKey: z.number(),
    paramsHash: z.number(),
    wikidataId: z.number(),
    payload: z.number(),
    status: z.number(),
    fetchedAt: z.number(),
    expiresAt: z.number(),
    note: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    provider: z.string().nullable(),
    namespace: z.string().nullable(),
    kind: z.string().nullable(),
    sourceKey: z.string().nullable(),
    paramsHash: z.string().nullable(),
    wikidataId: z.string().nullable(),
    status: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    note: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    provider: z.string().nullable(),
    namespace: z.string().nullable(),
    kind: z.string().nullable(),
    sourceKey: z.string().nullable(),
    paramsHash: z.string().nullable(),
    wikidataId: z.string().nullable(),
    status: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    note: z.string().nullable()
  }).nullable().optional()});
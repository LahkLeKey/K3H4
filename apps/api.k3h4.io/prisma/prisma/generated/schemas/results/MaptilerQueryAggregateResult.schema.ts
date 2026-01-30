import * as z from 'zod';
export const MaptilerQueryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    signature: z.number(),
    kind: z.number(),
    path: z.number(),
    params: z.number(),
    lastUsedAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    cacheEntries: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    signature: z.string().nullable(),
    kind: z.string().nullable(),
    path: z.string().nullable(),
    lastUsedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    signature: z.string().nullable(),
    kind: z.string().nullable(),
    path: z.string().nullable(),
    lastUsedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
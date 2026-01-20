import * as z from 'zod';
export const GeoQueryCacheAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    type: z.number(),
    signature: z.number(),
    params: z.number(),
    payload: z.number(),
    count: z.number(),
    expiresAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    count: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    count: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    type: z.string().nullable(),
    signature: z.string().nullable(),
    count: z.number().int().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    type: z.string().nullable(),
    signature: z.string().nullable(),
    count: z.number().int().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
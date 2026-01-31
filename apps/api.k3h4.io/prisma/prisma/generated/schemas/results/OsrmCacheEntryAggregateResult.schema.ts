import * as z from 'zod';
export const OsrmCacheEntryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    actorId: z.number(),
    actor: z.number(),
    service: z.number(),
    profile: z.number(),
    coordinates: z.number(),
    params: z.number(),
    paramsHash: z.number(),
    signature: z.number(),
    url: z.number(),
    statusCode: z.number(),
    payload: z.number(),
    fetchedAt: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    statusCode: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    statusCode: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    actorId: z.string().nullable(),
    service: z.string().nullable(),
    profile: z.string().nullable(),
    coordinates: z.string().nullable(),
    paramsHash: z.string().nullable(),
    signature: z.string().nullable(),
    url: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    actorId: z.string().nullable(),
    service: z.string().nullable(),
    profile: z.string().nullable(),
    coordinates: z.string().nullable(),
    paramsHash: z.string().nullable(),
    signature: z.string().nullable(),
    url: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
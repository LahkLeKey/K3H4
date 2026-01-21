import * as z from 'zod';
export const WikidataCacheEntryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    resource: z.number(),
    endpoint: z.number(),
    params: z.number(),
    paramsHash: z.number(),
    url: z.number(),
    statusCode: z.number(),
    payload: z.number(),
    fetchedAt: z.number(),
    expiresAt: z.number(),
    cacheControlSeconds: z.number(),
    etag: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    statusCode: z.number().nullable(),
    cacheControlSeconds: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    statusCode: z.number().nullable(),
    cacheControlSeconds: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    resource: z.string().nullable(),
    endpoint: z.string().nullable(),
    paramsHash: z.string().nullable(),
    url: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    cacheControlSeconds: z.number().int().nullable(),
    etag: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    resource: z.string().nullable(),
    endpoint: z.string().nullable(),
    paramsHash: z.string().nullable(),
    url: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    cacheControlSeconds: z.number().int().nullable(),
    etag: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
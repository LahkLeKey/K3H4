import * as z from 'zod';
export const UsdaCacheEntryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    dataset: z.number(),
    endpoint: z.number(),
    params: z.number(),
    paramsHash: z.number(),
    payload: z.number(),
    fetchedAt: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    endpoint: z.string().nullable(),
    paramsHash: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    endpoint: z.string().nullable(),
    paramsHash: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
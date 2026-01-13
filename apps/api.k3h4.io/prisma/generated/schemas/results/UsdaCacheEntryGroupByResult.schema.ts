import * as z from 'zod';
export const UsdaCacheEntryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  dataset: z.string(),
  endpoint: z.string(),
  params: z.unknown(),
  paramsHash: z.string(),
  payload: z.unknown(),
  fetchedAt: z.date(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
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
  }).nullable().optional()
}));
import * as z from 'zod';
export const UsdaReleaseAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    dataset: z.number(),
    scope: z.number(),
    releasedOn: z.number(),
    note: z.number(),
    fetchedAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    scope: z.string().nullable(),
    releasedOn: z.date().nullable(),
    note: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    scope: z.string().nullable(),
    releasedOn: z.date().nullable(),
    note: z.string().nullable(),
    fetchedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
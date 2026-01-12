import * as z from 'zod';
export const UsdaCommodityAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    dataset: z.number(),
    code: z.number(),
    name: z.number(),
    extra: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    dataset: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
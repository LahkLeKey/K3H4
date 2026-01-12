import * as z from 'zod';
export const ArcadeTopUpAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    cardId: z.number(),
    card: z.number(),
    amount: z.number(),
    source: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    cardId: z.string().nullable(),
    amount: z.number().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    cardId: z.string().nullable(),
    amount: z.number().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
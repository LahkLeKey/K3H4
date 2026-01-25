import * as z from 'zod';
export const ArcadeRedemptionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    cardId: z.number(),
    card: z.number(),
    prizeId: z.number(),
    prize: z.number(),
    status: z.number(),
    fulfilledAt: z.number(),
    createdAt: z.number(),
    sessions: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    cardId: z.string().nullable(),
    prizeId: z.string().nullable(),
    fulfilledAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    cardId: z.string().nullable(),
    prizeId: z.string().nullable(),
    fulfilledAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
import * as z from 'zod';
export const ArcadeRedemptionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  cardId: z.string(),
  prizeId: z.string(),
  status: z.string(),
  fulfilledAt: z.date(),
  createdAt: z.date(),
  _count: z.object({
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
    status: z.string().nullable(),
    fulfilledAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    cardId: z.string().nullable(),
    prizeId: z.string().nullable(),
    status: z.string().nullable(),
    fulfilledAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));
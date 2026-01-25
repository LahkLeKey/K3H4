import * as z from 'zod';
export const ArcadeCardAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    label: z.number(),
    balance: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    topUps: z.number(),
    sessions: z.number(),
    redemptions: z.number()
  }).optional(),
  _sum: z.object({
    balance: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    balance: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    balance: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    balance: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
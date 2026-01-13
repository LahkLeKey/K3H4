import * as z from 'zod';
export const ArcadePrizeGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  sku: z.string(),
  costCoins: z.number(),
  stock: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    sku: z.number(),
    costCoins: z.number(),
    stock: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    redemptions: z.number()
  }).optional(),
  _sum: z.object({
    costCoins: z.number().nullable(),
    stock: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    costCoins: z.number().nullable(),
    stock: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    sku: z.string().nullable(),
    costCoins: z.number().nullable(),
    stock: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    sku: z.string().nullable(),
    costCoins: z.number().nullable(),
    stock: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
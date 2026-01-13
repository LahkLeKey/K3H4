import * as z from 'zod';
export const CulinaryMenuItemAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    prepMinutes: z.number(),
    cost: z.number(),
    price: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    prepMinutes: z.number().nullable(),
    cost: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    prepMinutes: z.number().nullable(),
    cost: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    prepMinutes: z.number().int().nullable(),
    cost: z.number().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    prepMinutes: z.number().int().nullable(),
    cost: z.number().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
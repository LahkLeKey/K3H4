import * as z from 'zod';
export const AgricultureInventoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    sku: z.number(),
    description: z.number(),
    totalQuantity: z.number(),
    unit: z.number(),
    location: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    movements: z.number()
  }).optional(),
  _sum: z.object({
    totalQuantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    totalQuantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sku: z.string().nullable(),
    description: z.string().nullable(),
    totalQuantity: z.number().nullable(),
    unit: z.string().nullable(),
    location: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sku: z.string().nullable(),
    description: z.string().nullable(),
    totalQuantity: z.number().nullable(),
    unit: z.string().nullable(),
    location: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
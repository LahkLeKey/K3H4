import * as z from 'zod';
export const WarehouseItemGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  sku: z.string(),
  description: z.string(),
  quantity: z.number().int(),
  location: z.string(),
  freightLoadId: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    sku: z.number(),
    description: z.number(),
    quantity: z.number(),
    location: z.number(),
    status: z.number(),
    freightLoadId: z.number(),
    freightLoad: z.number(),
    category: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sku: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number().int().nullable(),
    location: z.string().nullable(),
    freightLoadId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    sku: z.string().nullable(),
    description: z.string().nullable(),
    quantity: z.number().int().nullable(),
    location: z.string().nullable(),
    freightLoadId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
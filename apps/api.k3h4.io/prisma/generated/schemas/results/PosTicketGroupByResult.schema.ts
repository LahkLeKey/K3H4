import * as z from 'zod';
export const PosTicketGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  storeId: z.string(),
  total: z.number(),
  itemsCount: z.number().int(),
  channel: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    storeId: z.number(),
    store: z.number(),
    total: z.number(),
    itemsCount: z.number(),
    channel: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    lineItems: z.number()
  }).optional(),
  _sum: z.object({
    total: z.number().nullable(),
    itemsCount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    total: z.number().nullable(),
    itemsCount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    storeId: z.string().nullable(),
    total: z.number().nullable(),
    itemsCount: z.number().int().nullable(),
    channel: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    storeId: z.string().nullable(),
    total: z.number().nullable(),
    itemsCount: z.number().int().nullable(),
    channel: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
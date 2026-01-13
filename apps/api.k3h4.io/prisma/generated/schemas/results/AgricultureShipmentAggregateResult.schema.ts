import * as z from 'zod';
export const AgricultureShipmentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    lot: z.number(),
    destination: z.number(),
    mode: z.number(),
    eta: z.number(),
    freightLoadId: z.number(),
    freightLoad: z.number(),
    inventoryMovements: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    lot: z.string().nullable(),
    destination: z.string().nullable(),
    mode: z.string().nullable(),
    eta: z.date().nullable(),
    freightLoadId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    lot: z.string().nullable(),
    destination: z.string().nullable(),
    mode: z.string().nullable(),
    eta: z.date().nullable(),
    freightLoadId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
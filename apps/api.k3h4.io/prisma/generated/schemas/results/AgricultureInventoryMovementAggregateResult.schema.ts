import * as z from 'zod';
export const AgricultureInventoryMovementAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    inventoryId: z.number(),
    inventory: z.number(),
    shipmentId: z.number(),
    shipment: z.number(),
    type: z.number(),
    quantity: z.number(),
    reason: z.number(),
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
    inventoryId: z.string().nullable(),
    shipmentId: z.string().nullable(),
    type: z.string().nullable(),
    quantity: z.number().nullable(),
    reason: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    inventoryId: z.string().nullable(),
    shipmentId: z.string().nullable(),
    type: z.string().nullable(),
    quantity: z.number().nullable(),
    reason: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
import * as z from 'zod';
export const PosLineItemGroupByResultSchema = z.array(z.object({
  id: z.string(),
  ticketId: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    ticketId: z.number(),
    ticket: z.number(),
    name: z.number(),
    quantity: z.number(),
    price: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    ticketId: z.string().nullable(),
    name: z.string().nullable(),
    quantity: z.number().int().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    ticketId: z.string().nullable(),
    name: z.string().nullable(),
    quantity: z.number().int().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));
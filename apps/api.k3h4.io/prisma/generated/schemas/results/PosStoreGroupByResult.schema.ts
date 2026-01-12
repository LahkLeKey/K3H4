import * as z from 'zod';
export const PosStoreGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    channel: z.number(),
    tickets: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    channel: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    channel: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
import * as z from 'zod';
export const CulinarySupplierNeedGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  item: z.string(),
  quantity: z.string(),
  status: z.string(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    item: z.number(),
    quantity: z.number(),
    status: z.number(),
    dueDate: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    item: z.string().nullable(),
    quantity: z.string().nullable(),
    status: z.string().nullable(),
    dueDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    item: z.string().nullable(),
    quantity: z.string().nullable(),
    status: z.string().nullable(),
    dueDate: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
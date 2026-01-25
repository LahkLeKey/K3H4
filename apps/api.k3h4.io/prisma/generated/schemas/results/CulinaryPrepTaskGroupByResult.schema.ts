import * as z from 'zod';
export const CulinaryPrepTaskGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  task: z.string(),
  station: z.string(),
  dueAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    task: z.number(),
    station: z.number(),
    dueAt: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    task: z.string().nullable(),
    station: z.string().nullable(),
    dueAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    task: z.string().nullable(),
    station: z.string().nullable(),
    dueAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
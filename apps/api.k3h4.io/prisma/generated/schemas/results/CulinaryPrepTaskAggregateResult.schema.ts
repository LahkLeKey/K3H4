import * as z from 'zod';
export const CulinaryPrepTaskAggregateResultSchema = z.object({  _count: z.object({
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
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    task: z.string().nullable(),
    station: z.string().nullable(),
    dueAt: z.date().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
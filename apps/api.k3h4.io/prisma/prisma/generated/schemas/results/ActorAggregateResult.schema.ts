import * as z from 'zod';
export const ActorAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    label: z.number(),
    type: z.number(),
    note: z.number(),
    source: z.number(),
    metadata: z.number(),
    category: z.number(),
    lastSeenAt: z.number(),
    isGlobal: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    entities: z.number(),
    caches: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    type: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    category: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    type: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    category: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
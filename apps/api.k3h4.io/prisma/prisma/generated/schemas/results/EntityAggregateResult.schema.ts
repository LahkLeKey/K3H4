import * as z from 'zod';
export const EntityAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    actorId: z.number(),
    actor: z.number(),
    kind: z.number(),
    direction: z.number(),
    name: z.number(),
    targetType: z.number(),
    targetId: z.number(),
    source: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    caches: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    actorId: z.string().nullable(),
    name: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    actorId: z.string().nullable(),
    name: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
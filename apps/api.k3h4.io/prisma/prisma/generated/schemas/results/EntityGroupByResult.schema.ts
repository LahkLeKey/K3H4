import * as z from 'zod';
export const EntityGroupByResultSchema = z.array(z.object({
  id: z.string(),
  actorId: z.string(),
  name: z.string(),
  targetType: z.string(),
  targetId: z.string(),
  source: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
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
  }).nullable().optional()
}));
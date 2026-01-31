import * as z from 'zod';
export const MaptilerQueryGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  actorId: z.string(),
  signature: z.string(),
  kind: z.string(),
  path: z.string(),
  params: z.unknown(),
  lastUsedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    actorId: z.number(),
    actor: z.number(),
    signature: z.number(),
    kind: z.number(),
    path: z.number(),
    params: z.number(),
    lastUsedAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    cacheEntries: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    actorId: z.string().nullable(),
    signature: z.string().nullable(),
    kind: z.string().nullable(),
    path: z.string().nullable(),
    lastUsedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    actorId: z.string().nullable(),
    signature: z.string().nullable(),
    kind: z.string().nullable(),
    path: z.string().nullable(),
    lastUsedAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
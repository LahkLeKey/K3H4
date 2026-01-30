import * as z from 'zod';
export const ActorCacheGroupByResultSchema = z.array(z.object({
  id: z.string(),
  actorId: z.string(),
  key: z.string(),
  payload: z.unknown(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    actorId: z.number(),
    actor: z.number(),
    key: z.number(),
    payload: z.number(),
    expiresAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    actorId: z.string().nullable(),
    key: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    actorId: z.string().nullable(),
    key: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
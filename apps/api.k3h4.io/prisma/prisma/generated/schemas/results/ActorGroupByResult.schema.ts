import * as z from 'zod';
export const ActorGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  label: z.string(),
  note: z.string(),
  source: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    label: z.number(),
    type: z.number(),
    note: z.number(),
    source: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    entities: z.number(),
    caches: z.number(),
    geoDirections: z.number(),
    maptilerQueries: z.number(),
    maptilerCacheEntries: z.number(),
    osrmCacheEntries: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
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
    osmType: z.number(),
    osmId: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    category: z.number(),
    lastSeenAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    entities: z.number(),
    caches: z.number()
  }).optional(),
  _sum: z.object({
    osmId: z.bigint().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    osmId: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    osmType: z.string().nullable(),
    osmId: z.bigint().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    category: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    label: z.string().nullable(),
    note: z.string().nullable(),
    source: z.string().nullable(),
    osmType: z.string().nullable(),
    osmId: z.bigint().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    category: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
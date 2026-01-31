import * as z from 'zod';
export const PointOfInterestGroupByResultSchema = z.array(z.object({
  id: z.string(),
  osmType: z.string(),
  osmId: z.bigint(),
  name: z.string(),
  category: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  tags: z.unknown(),
  source: z.string(),
  lastSeenAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    osmType: z.number(),
    osmId: z.number(),
    name: z.number(),
    category: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    tags: z.number(),
    source: z.number(),
    lastSeenAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
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
    osmType: z.string().nullable(),
    osmId: z.bigint().nullable(),
    name: z.string().nullable(),
    category: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    source: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    osmType: z.string().nullable(),
    osmId: z.bigint().nullable(),
    name: z.string().nullable(),
    category: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    source: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
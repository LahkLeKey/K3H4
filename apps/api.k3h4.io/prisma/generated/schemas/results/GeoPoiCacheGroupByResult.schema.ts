import * as z from 'zod';
export const GeoPoiCacheGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  signature: z.string(),
  centerLat: z.number(),
  centerLng: z.number(),
  radiusM: z.number().int(),
  kinds: z.string(),
  pois: z.unknown(),
  count: z.number().int(),
  expiresAt: z.date(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    signature: z.number(),
    centerLat: z.number(),
    centerLng: z.number(),
    radiusM: z.number(),
    kinds: z.number(),
    pois: z.number(),
    count: z.number(),
    expiresAt: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    radiusM: z.number().nullable(),
    count: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    radiusM: z.number().nullable(),
    count: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    signature: z.string().nullable(),
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    radiusM: z.number().int().nullable(),
    kinds: z.string().nullable(),
    count: z.number().int().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    signature: z.string().nullable(),
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    radiusM: z.number().int().nullable(),
    kinds: z.string().nullable(),
    count: z.number().int().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));
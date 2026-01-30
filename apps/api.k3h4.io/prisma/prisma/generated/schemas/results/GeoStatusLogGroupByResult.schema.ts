import * as z from 'zod';
export const GeoStatusLogGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  status: z.string(),
  poiStatus: z.string(),
  centerLat: z.number(),
  centerLng: z.number(),
  error: z.string(),
  userAgent: z.string(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    status: z.number(),
    poiStatus: z.number(),
    centerLat: z.number(),
    centerLng: z.number(),
    error: z.number(),
    userAgent: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    status: z.string().nullable(),
    poiStatus: z.string().nullable(),
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    error: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    status: z.string().nullable(),
    poiStatus: z.string().nullable(),
    centerLat: z.number().nullable(),
    centerLng: z.number().nullable(),
    error: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));
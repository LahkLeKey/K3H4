import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  centerLat: z.literal(true).optional(),
  centerLng: z.literal(true).optional(),
  radiusM: z.literal(true).optional(),
  kinds: z.literal(true).optional(),
  count: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const GeoPoiCacheMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheMinAggregateInputType>;
export const GeoPoiCacheMinAggregateInputObjectZodSchema = makeSchema();

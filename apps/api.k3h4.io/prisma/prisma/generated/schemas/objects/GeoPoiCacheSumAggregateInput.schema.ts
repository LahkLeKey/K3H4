import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  centerLat: z.literal(true).optional(),
  centerLng: z.literal(true).optional(),
  radiusM: z.literal(true).optional(),
  count: z.literal(true).optional()
}).strict();
export const GeoPoiCacheSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheSumAggregateInputType>;
export const GeoPoiCacheSumAggregateInputObjectZodSchema = makeSchema();

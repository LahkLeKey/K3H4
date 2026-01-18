import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  originLat: z.literal(true).optional(),
  originLng: z.literal(true).optional(),
  destinationLat: z.literal(true).optional(),
  destinationLng: z.literal(true).optional(),
  distanceKm: z.literal(true).optional(),
  durationMinutes: z.literal(true).optional()
}).strict();
export const GeoRouteCacheSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheSumAggregateInputType>;
export const GeoRouteCacheSumAggregateInputObjectZodSchema = makeSchema();

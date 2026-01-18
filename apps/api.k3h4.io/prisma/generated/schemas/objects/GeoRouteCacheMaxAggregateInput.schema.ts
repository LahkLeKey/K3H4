import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  originLat: z.literal(true).optional(),
  originLng: z.literal(true).optional(),
  destinationLat: z.literal(true).optional(),
  destinationLng: z.literal(true).optional(),
  distanceKm: z.literal(true).optional(),
  durationMinutes: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const GeoRouteCacheMaxAggregateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheMaxAggregateInputType>;
export const GeoRouteCacheMaxAggregateInputObjectZodSchema = makeSchema();

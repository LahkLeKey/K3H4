import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  centerLat: z.literal(true).optional(),
  centerLng: z.literal(true).optional()
}).strict();
export const GeoStatusLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogAvgAggregateInputType>;
export const GeoStatusLogAvgAggregateInputObjectZodSchema = makeSchema();

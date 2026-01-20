import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  centerLat: z.literal(true).optional(),
  centerLng: z.literal(true).optional()
}).strict();
export const GeoStatusLogSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogSumAggregateInputType>;
export const GeoStatusLogSumAggregateInputObjectZodSchema = makeSchema();

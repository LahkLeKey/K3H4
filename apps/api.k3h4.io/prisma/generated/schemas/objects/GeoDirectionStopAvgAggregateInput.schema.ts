import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sequence: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  osmId: z.literal(true).optional()
}).strict();
export const GeoDirectionStopAvgAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopAvgAggregateInputType>;
export const GeoDirectionStopAvgAggregateInputObjectZodSchema = makeSchema();

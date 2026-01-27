import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  originLat: z.literal(true).optional(),
  originLng: z.literal(true).optional(),
  destinationLat: z.literal(true).optional(),
  destinationLng: z.literal(true).optional(),
  distanceMeters: z.literal(true).optional(),
  durationSeconds: z.literal(true).optional(),
  statusCode: z.literal(true).optional()
}).strict();
export const GeoDirectionSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSumAggregateInputType>;
export const GeoDirectionSumAggregateInputObjectZodSchema = makeSchema();

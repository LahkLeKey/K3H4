import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sequence: z.literal(true).optional(),
  distanceMeters: z.literal(true).optional(),
  durationSeconds: z.literal(true).optional(),
  startLat: z.literal(true).optional(),
  startLng: z.literal(true).optional(),
  endLat: z.literal(true).optional(),
  endLng: z.literal(true).optional()
}).strict();
export const GeoDirectionSegmentSumAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentSumAggregateInputType>;
export const GeoDirectionSegmentSumAggregateInputObjectZodSchema = makeSchema();

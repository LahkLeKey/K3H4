import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  directionId: z.literal(true).optional(),
  sequence: z.literal(true).optional(),
  instruction: z.literal(true).optional(),
  maneuverType: z.literal(true).optional(),
  maneuverModifier: z.literal(true).optional(),
  distanceMeters: z.literal(true).optional(),
  durationSeconds: z.literal(true).optional(),
  startLat: z.literal(true).optional(),
  startLng: z.literal(true).optional(),
  endLat: z.literal(true).optional(),
  endLng: z.literal(true).optional(),
  geometry: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const GeoDirectionSegmentCountAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCountAggregateInputType>;
export const GeoDirectionSegmentCountAggregateInputObjectZodSchema = makeSchema();

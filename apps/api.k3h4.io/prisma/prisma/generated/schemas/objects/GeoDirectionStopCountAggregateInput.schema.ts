import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  directionId: z.literal(true).optional(),
  sequence: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  label: z.literal(true).optional(),
  address: z.literal(true).optional(),
  source: z.literal(true).optional(),
  osmId: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const GeoDirectionStopCountAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopCountAggregateInputType>;
export const GeoDirectionStopCountAggregateInputObjectZodSchema = makeSchema();

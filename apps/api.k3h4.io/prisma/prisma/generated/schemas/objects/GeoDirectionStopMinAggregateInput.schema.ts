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
  createdAt: z.literal(true).optional()
}).strict();
export const GeoDirectionStopMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopMinAggregateInputType>;
export const GeoDirectionStopMinAggregateInputObjectZodSchema = makeSchema();

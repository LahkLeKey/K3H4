import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  osmId: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  buildingId: z.literal(true).optional()
}).strict();
export const PoiAvgAggregateInputObjectSchema: z.ZodType<Prisma.PoiAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PoiAvgAggregateInputType>;
export const PoiAvgAggregateInputObjectZodSchema = makeSchema();

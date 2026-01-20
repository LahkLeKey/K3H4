import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  osmId: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  buildingId: z.literal(true).optional()
}).strict();
export const PoiSumAggregateInputObjectSchema: z.ZodType<Prisma.PoiSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PoiSumAggregateInputType>;
export const PoiSumAggregateInputObjectZodSchema = makeSchema();

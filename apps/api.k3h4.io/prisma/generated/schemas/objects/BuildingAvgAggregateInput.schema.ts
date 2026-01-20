import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  osmId: z.literal(true).optional()
}).strict();
export const BuildingAvgAggregateInputObjectSchema: z.ZodType<Prisma.BuildingAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuildingAvgAggregateInputType>;
export const BuildingAvgAggregateInputObjectZodSchema = makeSchema();

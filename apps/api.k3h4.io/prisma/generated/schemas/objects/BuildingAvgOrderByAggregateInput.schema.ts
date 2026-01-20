import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional()
}).strict();
export const BuildingAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuildingAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingAvgOrderByAggregateInput>;
export const BuildingAvgOrderByAggregateInputObjectZodSchema = makeSchema();

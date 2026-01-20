import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional()
}).strict();
export const BuildingSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BuildingSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BuildingSumOrderByAggregateInput>;
export const BuildingSumOrderByAggregateInputObjectZodSchema = makeSchema();

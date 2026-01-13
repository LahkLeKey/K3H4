import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  prepMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  price: SortOrderSchema.optional()
}).strict();
export const CulinaryMenuItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemAvgOrderByAggregateInput>;
export const CulinaryMenuItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();

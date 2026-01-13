import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCommodityMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCommodityMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityMaxOrderByAggregateInput>;
export const UsdaCommodityMaxOrderByAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  extra: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCommodityCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCommodityCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityCountOrderByAggregateInput>;
export const UsdaCommodityCountOrderByAggregateInputObjectZodSchema = makeSchema();

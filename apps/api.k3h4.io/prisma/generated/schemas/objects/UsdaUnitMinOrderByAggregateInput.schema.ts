import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  wikidataId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaUnitMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaUnitMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitMinOrderByAggregateInput>;
export const UsdaUnitMinOrderByAggregateInputObjectZodSchema = makeSchema();

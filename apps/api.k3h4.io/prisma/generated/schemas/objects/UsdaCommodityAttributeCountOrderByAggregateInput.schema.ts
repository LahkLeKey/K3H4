import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  wikidataId: SortOrderSchema.optional(),
  enrichment: SortOrderSchema.optional(),
  extra: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCommodityAttributeCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCommodityAttributeCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeCountOrderByAggregateInput>;
export const UsdaCommodityAttributeCountOrderByAggregateInputObjectZodSchema = makeSchema();

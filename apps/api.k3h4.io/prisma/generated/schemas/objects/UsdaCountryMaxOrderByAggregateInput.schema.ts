import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  regionCode: SortOrderSchema.optional(),
  wikidataId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCountryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCountryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryMaxOrderByAggregateInput>;
export const UsdaCountryMaxOrderByAggregateInputObjectZodSchema = makeSchema();

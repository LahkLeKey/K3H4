import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumWarehouseCategoryFilterObjectSchema as NestedEnumWarehouseCategoryFilterObjectSchema } from './NestedEnumWarehouseCategoryFilter.schema'

const nestedenumwarehousecategorywithaggregatesfilterSchema = z.object({
  equals: WarehouseCategorySchema.optional(),
  in: WarehouseCategorySchema.array().optional(),
  notIn: WarehouseCategorySchema.array().optional(),
  not: z.union([WarehouseCategorySchema, z.lazy(() => NestedEnumWarehouseCategoryWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema).optional()
}).strict();
export const NestedEnumWarehouseCategoryWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumWarehouseCategoryWithAggregatesFilter> = nestedenumwarehousecategorywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumWarehouseCategoryWithAggregatesFilter>;
export const NestedEnumWarehouseCategoryWithAggregatesFilterObjectZodSchema = nestedenumwarehousecategorywithaggregatesfilterSchema;

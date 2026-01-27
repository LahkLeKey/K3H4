import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema';
import { NestedEnumWarehouseCategoryWithAggregatesFilterObjectSchema as NestedEnumWarehouseCategoryWithAggregatesFilterObjectSchema } from './NestedEnumWarehouseCategoryWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumWarehouseCategoryFilterObjectSchema as NestedEnumWarehouseCategoryFilterObjectSchema } from './NestedEnumWarehouseCategoryFilter.schema'

const makeSchema = () => z.object({
  equals: WarehouseCategorySchema.optional(),
  in: WarehouseCategorySchema.array().optional(),
  notIn: WarehouseCategorySchema.array().optional(),
  not: z.union([WarehouseCategorySchema, z.lazy(() => NestedEnumWarehouseCategoryWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema).optional()
}).strict();
export const EnumWarehouseCategoryWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumWarehouseCategoryWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumWarehouseCategoryWithAggregatesFilter>;
export const EnumWarehouseCategoryWithAggregatesFilterObjectZodSchema = makeSchema();

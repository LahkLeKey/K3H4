import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema';
import { NestedEnumWarehouseCategoryFilterObjectSchema as NestedEnumWarehouseCategoryFilterObjectSchema } from './NestedEnumWarehouseCategoryFilter.schema'

const makeSchema = () => z.object({
  equals: WarehouseCategorySchema.optional(),
  in: WarehouseCategorySchema.array().optional(),
  notIn: WarehouseCategorySchema.array().optional(),
  not: z.union([WarehouseCategorySchema, z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema)]).optional()
}).strict();
export const EnumWarehouseCategoryFilterObjectSchema: z.ZodType<Prisma.EnumWarehouseCategoryFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumWarehouseCategoryFilter>;
export const EnumWarehouseCategoryFilterObjectZodSchema = makeSchema();

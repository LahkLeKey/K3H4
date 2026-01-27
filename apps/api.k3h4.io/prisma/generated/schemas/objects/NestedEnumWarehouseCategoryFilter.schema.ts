import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema'

const nestedenumwarehousecategoryfilterSchema = z.object({
  equals: WarehouseCategorySchema.optional(),
  in: WarehouseCategorySchema.array().optional(),
  notIn: WarehouseCategorySchema.array().optional(),
  not: z.union([WarehouseCategorySchema, z.lazy(() => NestedEnumWarehouseCategoryFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumWarehouseCategoryFilterObjectSchema: z.ZodType<Prisma.NestedEnumWarehouseCategoryFilter> = nestedenumwarehousecategoryfilterSchema as unknown as z.ZodType<Prisma.NestedEnumWarehouseCategoryFilter>;
export const NestedEnumWarehouseCategoryFilterObjectZodSchema = nestedenumwarehousecategoryfilterSchema;

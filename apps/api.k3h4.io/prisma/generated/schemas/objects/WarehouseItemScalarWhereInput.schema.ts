import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumWarehouseCategoryFilterObjectSchema as EnumWarehouseCategoryFilterObjectSchema } from './EnumWarehouseCategoryFilter.schema';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const warehouseitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WarehouseItemScalarWhereInputObjectSchema), z.lazy(() => WarehouseItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WarehouseItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WarehouseItemScalarWhereInputObjectSchema), z.lazy(() => WarehouseItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sku: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  location: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  freightLoadId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  category: z.union([z.lazy(() => EnumWarehouseCategoryFilterObjectSchema), WarehouseCategorySchema]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WarehouseItemScalarWhereInputObjectSchema: z.ZodType<Prisma.WarehouseItemScalarWhereInput> = warehouseitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.WarehouseItemScalarWhereInput>;
export const WarehouseItemScalarWhereInputObjectZodSchema = warehouseitemscalarwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const culinarysupplierneedwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  item: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  dueDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const CulinarySupplierNeedWhereInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedWhereInput> = culinarysupplierneedwhereinputSchema as unknown as z.ZodType<Prisma.CulinarySupplierNeedWhereInput>;
export const CulinarySupplierNeedWhereInputObjectZodSchema = culinarysupplierneedwhereinputSchema;

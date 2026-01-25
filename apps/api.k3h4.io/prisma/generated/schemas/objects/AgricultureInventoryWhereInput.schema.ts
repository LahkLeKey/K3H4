import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgricultureInventoryMovementListRelationFilterObjectSchema as AgricultureInventoryMovementListRelationFilterObjectSchema } from './AgricultureInventoryMovementListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryWhereInputObjectSchema), z.lazy(() => AgricultureInventoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryWhereInputObjectSchema), z.lazy(() => AgricultureInventoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sku: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  totalQuantity: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalQuantity' must be a Decimal",
})]).optional(),
  unit: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  movements: z.lazy(() => AgricultureInventoryMovementListRelationFilterObjectSchema).optional()
}).strict();
export const AgricultureInventoryWhereInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryWhereInput> = agricultureinventorywhereinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryWhereInput>;
export const AgricultureInventoryWhereInputObjectZodSchema = agricultureinventorywhereinputSchema;

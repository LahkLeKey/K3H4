import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadecardscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeCardScalarWhereInputObjectSchema), z.lazy(() => ArcadeCardScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeCardScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeCardScalarWhereInputObjectSchema), z.lazy(() => ArcadeCardScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  label: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  balance: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balance' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeCardScalarWhereInputObjectSchema: z.ZodType<Prisma.ArcadeCardScalarWhereInput> = arcadecardscalarwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeCardScalarWhereInput>;
export const ArcadeCardScalarWhereInputObjectZodSchema = arcadecardscalarwhereinputSchema;

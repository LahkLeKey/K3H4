import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema).array()]).optional(),
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
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureInventoryScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryScalarWhereInput> = agricultureinventoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryScalarWhereInput>;
export const AgricultureInventoryScalarWhereInputObjectZodSchema = agricultureinventoryscalarwhereinputSchema;

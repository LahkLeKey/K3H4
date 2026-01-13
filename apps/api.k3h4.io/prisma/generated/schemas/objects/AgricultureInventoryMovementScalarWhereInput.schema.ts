import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventorymovementscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  inventoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'quantity' must be a Decimal",
})]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureInventoryMovementScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementScalarWhereInput> = agricultureinventorymovementscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryMovementScalarWhereInput>;
export const AgricultureInventoryMovementScalarWhereInputObjectZodSchema = agricultureinventorymovementscalarwhereinputSchema;

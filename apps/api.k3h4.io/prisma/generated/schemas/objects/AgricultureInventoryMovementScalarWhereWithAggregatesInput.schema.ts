import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventorymovementscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  inventoryId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'quantity' must be a Decimal",
})]).optional(),
  reason: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementScalarWhereWithAggregatesInput> = agricultureinventorymovementscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryMovementScalarWhereWithAggregatesInput>;
export const AgricultureInventoryMovementScalarWhereWithAggregatesInputObjectZodSchema = agricultureinventorymovementscalarwherewithaggregatesinputSchema;

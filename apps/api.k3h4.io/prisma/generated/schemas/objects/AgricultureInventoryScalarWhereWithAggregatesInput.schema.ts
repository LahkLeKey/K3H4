import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { EnumLifecycleStatusWithAggregatesFilterObjectSchema as EnumLifecycleStatusWithAggregatesFilterObjectSchema } from './EnumLifecycleStatusWithAggregatesFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sku: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  totalQuantity: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalQuantity' must be a Decimal",
})]).optional(),
  unit: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumLifecycleStatusWithAggregatesFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureInventoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryScalarWhereWithAggregatesInput> = agricultureinventoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryScalarWhereWithAggregatesInput>;
export const AgricultureInventoryScalarWhereWithAggregatesInputObjectZodSchema = agricultureinventoryscalarwherewithaggregatesinputSchema;

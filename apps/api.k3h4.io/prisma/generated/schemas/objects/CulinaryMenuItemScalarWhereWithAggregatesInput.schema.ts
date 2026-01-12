import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const culinarymenuitemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  prepMinutes: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  cost: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional(),
  price: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinaryMenuItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemScalarWhereWithAggregatesInput> = culinarymenuitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CulinaryMenuItemScalarWhereWithAggregatesInput>;
export const CulinaryMenuItemScalarWhereWithAggregatesInputObjectZodSchema = culinarymenuitemscalarwherewithaggregatesinputSchema;

import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const culinarymenuitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema), z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema), z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  prepMinutes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  cost: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional(),
  price: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CulinaryMenuItemScalarWhereInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemScalarWhereInput> = culinarymenuitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.CulinaryMenuItemScalarWhereInput>;
export const CulinaryMenuItemScalarWhereInputObjectZodSchema = culinarymenuitemscalarwhereinputSchema;

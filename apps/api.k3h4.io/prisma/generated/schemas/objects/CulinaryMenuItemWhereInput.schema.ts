import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const culinarymenuitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryMenuItemWhereInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryMenuItemWhereInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const CulinaryMenuItemWhereInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemWhereInput> = culinarymenuitemwhereinputSchema as unknown as z.ZodType<Prisma.CulinaryMenuItemWhereInput>;
export const CulinaryMenuItemWhereInputObjectZodSchema = culinarymenuitemwhereinputSchema;

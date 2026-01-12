import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCulinaryMenuItemsInputObjectSchema as UserCreateNestedOneWithoutCulinaryMenuItemsInputObjectSchema } from './UserCreateNestedOneWithoutCulinaryMenuItemsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  prepMinutes: z.number().int(),
  cost: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
}),
  price: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
}),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCulinaryMenuItemsInputObjectSchema)
}).strict();
export const CulinaryMenuItemCreateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateInput>;
export const CulinaryMenuItemCreateInputObjectZodSchema = makeSchema();

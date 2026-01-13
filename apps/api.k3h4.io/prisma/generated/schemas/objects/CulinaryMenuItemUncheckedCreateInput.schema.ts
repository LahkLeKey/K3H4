import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  createdAt: z.coerce.date().optional()
}).strict();
export const CulinaryMenuItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUncheckedCreateInput>;
export const CulinaryMenuItemUncheckedCreateInputObjectZodSchema = makeSchema();

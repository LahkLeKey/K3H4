import * as z from 'zod';
import { Prisma } from '@prisma/client';


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
  updatedAt: z.coerce.date().optional()
}).strict();
export const CulinaryMenuItemCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateWithoutUserInput>;
export const CulinaryMenuItemCreateWithoutUserInputObjectZodSchema = makeSchema();

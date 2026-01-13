import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  sku: z.string().optional().nullable(),
  costCoins: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costCoins' must be a Decimal",
}),
  stock: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ArcadePrizeCreateManyUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateManyUserInput>;
export const ArcadePrizeCreateManyUserInputObjectZodSchema = makeSchema();

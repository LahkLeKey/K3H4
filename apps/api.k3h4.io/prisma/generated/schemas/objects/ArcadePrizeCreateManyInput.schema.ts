import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
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
export const ArcadePrizeCreateManyInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateManyInput>;
export const ArcadePrizeCreateManyInputObjectZodSchema = makeSchema();

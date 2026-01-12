import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  cardId: z.string(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  source: z.string().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeTopUpUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUncheckedCreateInput>;
export const ArcadeTopUpUncheckedCreateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  kind: z.string(),
  direction: z.string(),
  note: z.string().optional().nullable(),
  balanceAfter: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balanceAfter' must be a Decimal",
}),
  createdAt: z.coerce.date().optional()
}).strict();
export const BankTransactionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.BankTransactionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionUncheckedCreateInput>;
export const BankTransactionUncheckedCreateInputObjectZodSchema = makeSchema();

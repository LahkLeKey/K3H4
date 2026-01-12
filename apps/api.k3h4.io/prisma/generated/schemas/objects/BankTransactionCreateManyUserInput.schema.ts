import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
export const BankTransactionCreateManyUserInputObjectSchema: z.ZodType<Prisma.BankTransactionCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCreateManyUserInput>;
export const BankTransactionCreateManyUserInputObjectZodSchema = makeSchema();

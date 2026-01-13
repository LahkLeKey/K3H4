import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutBankTransactionsInputObjectSchema as UserCreateNestedOneWithoutBankTransactionsInputObjectSchema } from './UserCreateNestedOneWithoutBankTransactionsInput.schema'

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
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBankTransactionsInputObjectSchema)
}).strict();
export const BankTransactionCreateInputObjectSchema: z.ZodType<Prisma.BankTransactionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCreateInput>;
export const BankTransactionCreateInputObjectZodSchema = makeSchema();

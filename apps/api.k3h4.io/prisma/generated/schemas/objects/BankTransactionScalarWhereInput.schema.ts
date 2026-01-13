import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const banktransactionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BankTransactionScalarWhereInputObjectSchema), z.lazy(() => BankTransactionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BankTransactionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BankTransactionScalarWhereInputObjectSchema), z.lazy(() => BankTransactionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  direction: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  balanceAfter: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balanceAfter' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BankTransactionScalarWhereInputObjectSchema: z.ZodType<Prisma.BankTransactionScalarWhereInput> = banktransactionscalarwhereinputSchema as unknown as z.ZodType<Prisma.BankTransactionScalarWhereInput>;
export const BankTransactionScalarWhereInputObjectZodSchema = banktransactionscalarwhereinputSchema;

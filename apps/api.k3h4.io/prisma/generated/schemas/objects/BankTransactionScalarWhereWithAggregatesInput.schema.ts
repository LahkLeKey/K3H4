import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const banktransactionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BankTransactionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BankTransactionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BankTransactionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BankTransactionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BankTransactionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  kind: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  direction: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  balanceAfter: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'balanceAfter' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BankTransactionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BankTransactionScalarWhereWithAggregatesInput> = banktransactionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BankTransactionScalarWhereWithAggregatesInput>;
export const BankTransactionScalarWhereWithAggregatesInputObjectZodSchema = banktransactionscalarwherewithaggregatesinputSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema'

const nestedenumbanktransactiondirectionnullablefilterSchema = z.object({
  equals: BankTransactionDirectionSchema.optional().nullable(),
  in: BankTransactionDirectionSchema.array().optional().nullable(),
  notIn: BankTransactionDirectionSchema.array().optional().nullable(),
  not: z.union([BankTransactionDirectionSchema, z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumBankTransactionDirectionNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankTransactionDirectionNullableFilter> = nestedenumbanktransactiondirectionnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankTransactionDirectionNullableFilter>;
export const NestedEnumBankTransactionDirectionNullableFilterObjectZodSchema = nestedenumbanktransactiondirectionnullablefilterSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumBankTransactionDirectionNullableFilterObjectSchema as NestedEnumBankTransactionDirectionNullableFilterObjectSchema } from './NestedEnumBankTransactionDirectionNullableFilter.schema'

const nestedenumbanktransactiondirectionnullablewithaggregatesfilterSchema = z.object({
  equals: BankTransactionDirectionSchema.optional().nullable(),
  in: BankTransactionDirectionSchema.array().optional().nullable(),
  notIn: BankTransactionDirectionSchema.array().optional().nullable(),
  not: z.union([BankTransactionDirectionSchema, z.lazy(() => NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankTransactionDirectionNullableWithAggregatesFilter> = nestedenumbanktransactiondirectionnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankTransactionDirectionNullableWithAggregatesFilter>;
export const NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectZodSchema = nestedenumbanktransactiondirectionnullablewithaggregatesfilterSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema';
import { NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema as NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema } from './NestedEnumBankTransactionDirectionNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumBankTransactionDirectionNullableFilterObjectSchema as NestedEnumBankTransactionDirectionNullableFilterObjectSchema } from './NestedEnumBankTransactionDirectionNullableFilter.schema'

const makeSchema = () => z.object({
  equals: BankTransactionDirectionSchema.optional().nullable(),
  in: BankTransactionDirectionSchema.array().optional().nullable(),
  notIn: BankTransactionDirectionSchema.array().optional().nullable(),
  not: z.union([BankTransactionDirectionSchema, z.lazy(() => NestedEnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema).optional()
}).strict();
export const EnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBankTransactionDirectionNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankTransactionDirectionNullableWithAggregatesFilter>;
export const EnumBankTransactionDirectionNullableWithAggregatesFilterObjectZodSchema = makeSchema();

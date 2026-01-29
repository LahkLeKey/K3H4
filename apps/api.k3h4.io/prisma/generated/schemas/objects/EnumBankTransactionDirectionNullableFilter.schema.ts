import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema';
import { NestedEnumBankTransactionDirectionNullableFilterObjectSchema as NestedEnumBankTransactionDirectionNullableFilterObjectSchema } from './NestedEnumBankTransactionDirectionNullableFilter.schema'

const makeSchema = () => z.object({
  equals: BankTransactionDirectionSchema.optional().nullable(),
  in: BankTransactionDirectionSchema.array().optional().nullable(),
  notIn: BankTransactionDirectionSchema.array().optional().nullable(),
  not: z.union([BankTransactionDirectionSchema, z.lazy(() => NestedEnumBankTransactionDirectionNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumBankTransactionDirectionNullableFilterObjectSchema: z.ZodType<Prisma.EnumBankTransactionDirectionNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankTransactionDirectionNullableFilter>;
export const EnumBankTransactionDirectionNullableFilterObjectZodSchema = makeSchema();

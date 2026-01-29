import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBankTransactionKindFilterObjectSchema as NestedEnumBankTransactionKindFilterObjectSchema } from './NestedEnumBankTransactionKindFilter.schema'

const nestedenumbanktransactionkindwithaggregatesfilterSchema = z.object({
  equals: BankTransactionKindSchema.optional(),
  in: BankTransactionKindSchema.array().optional(),
  notIn: BankTransactionKindSchema.array().optional(),
  not: z.union([BankTransactionKindSchema, z.lazy(() => NestedEnumBankTransactionKindWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema).optional()
}).strict();
export const NestedEnumBankTransactionKindWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankTransactionKindWithAggregatesFilter> = nestedenumbanktransactionkindwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankTransactionKindWithAggregatesFilter>;
export const NestedEnumBankTransactionKindWithAggregatesFilterObjectZodSchema = nestedenumbanktransactionkindwithaggregatesfilterSchema;

import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema';
import { NestedEnumBankTransactionKindWithAggregatesFilterObjectSchema as NestedEnumBankTransactionKindWithAggregatesFilterObjectSchema } from './NestedEnumBankTransactionKindWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBankTransactionKindFilterObjectSchema as NestedEnumBankTransactionKindFilterObjectSchema } from './NestedEnumBankTransactionKindFilter.schema'

const makeSchema = () => z.object({
  equals: BankTransactionKindSchema.optional(),
  in: BankTransactionKindSchema.array().optional(),
  notIn: BankTransactionKindSchema.array().optional(),
  not: z.union([BankTransactionKindSchema, z.lazy(() => NestedEnumBankTransactionKindWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema).optional()
}).strict();
export const EnumBankTransactionKindWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBankTransactionKindWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankTransactionKindWithAggregatesFilter>;
export const EnumBankTransactionKindWithAggregatesFilterObjectZodSchema = makeSchema();

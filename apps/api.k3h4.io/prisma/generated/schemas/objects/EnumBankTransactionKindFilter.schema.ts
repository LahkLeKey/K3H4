import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema';
import { NestedEnumBankTransactionKindFilterObjectSchema as NestedEnumBankTransactionKindFilterObjectSchema } from './NestedEnumBankTransactionKindFilter.schema'

const makeSchema = () => z.object({
  equals: BankTransactionKindSchema.optional(),
  in: BankTransactionKindSchema.array().optional(),
  notIn: BankTransactionKindSchema.array().optional(),
  not: z.union([BankTransactionKindSchema, z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema)]).optional()
}).strict();
export const EnumBankTransactionKindFilterObjectSchema: z.ZodType<Prisma.EnumBankTransactionKindFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankTransactionKindFilter>;
export const EnumBankTransactionKindFilterObjectZodSchema = makeSchema();

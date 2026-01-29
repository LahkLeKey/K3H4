import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema'

const nestedenumbanktransactionkindfilterSchema = z.object({
  equals: BankTransactionKindSchema.optional(),
  in: BankTransactionKindSchema.array().optional(),
  notIn: BankTransactionKindSchema.array().optional(),
  not: z.union([BankTransactionKindSchema, z.lazy(() => NestedEnumBankTransactionKindFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumBankTransactionKindFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankTransactionKindFilter> = nestedenumbanktransactionkindfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankTransactionKindFilter>;
export const NestedEnumBankTransactionKindFilterObjectZodSchema = nestedenumbanktransactionkindfilterSchema;

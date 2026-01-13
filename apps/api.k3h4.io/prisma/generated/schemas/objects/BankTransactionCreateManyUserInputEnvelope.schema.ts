import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionCreateManyUserInputObjectSchema as BankTransactionCreateManyUserInputObjectSchema } from './BankTransactionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => BankTransactionCreateManyUserInputObjectSchema), z.lazy(() => BankTransactionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const BankTransactionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.BankTransactionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCreateManyUserInputEnvelope>;
export const BankTransactionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();

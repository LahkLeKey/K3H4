import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionCreateManyInputObjectSchema as BankTransactionCreateManyInputObjectSchema } from './objects/BankTransactionCreateManyInput.schema';

export const BankTransactionCreateManySchema: z.ZodType<Prisma.BankTransactionCreateManyArgs> = z.object({ data: z.union([ BankTransactionCreateManyInputObjectSchema, z.array(BankTransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionCreateManyArgs>;

export const BankTransactionCreateManyZodSchema = z.object({ data: z.union([ BankTransactionCreateManyInputObjectSchema, z.array(BankTransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
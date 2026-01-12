import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionCreateManyInputObjectSchema as BankTransactionCreateManyInputObjectSchema } from './objects/BankTransactionCreateManyInput.schema';

export const BankTransactionCreateManyAndReturnSchema: z.ZodType<Prisma.BankTransactionCreateManyAndReturnArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), data: z.union([ BankTransactionCreateManyInputObjectSchema, z.array(BankTransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionCreateManyAndReturnArgs>;

export const BankTransactionCreateManyAndReturnZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), data: z.union([ BankTransactionCreateManyInputObjectSchema, z.array(BankTransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';

export const BankTransactionDeleteOneSchema: z.ZodType<Prisma.BankTransactionDeleteArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BankTransactionDeleteArgs>;

export const BankTransactionDeleteOneZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict();
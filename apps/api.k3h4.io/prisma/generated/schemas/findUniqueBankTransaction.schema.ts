import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';

export const BankTransactionFindUniqueSchema: z.ZodType<Prisma.BankTransactionFindUniqueArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BankTransactionFindUniqueArgs>;

export const BankTransactionFindUniqueZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict();
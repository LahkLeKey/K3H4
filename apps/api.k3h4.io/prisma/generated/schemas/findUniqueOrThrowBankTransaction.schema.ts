import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';

export const BankTransactionFindUniqueOrThrowSchema: z.ZodType<Prisma.BankTransactionFindUniqueOrThrowArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BankTransactionFindUniqueOrThrowArgs>;

export const BankTransactionFindUniqueOrThrowZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema }).strict();
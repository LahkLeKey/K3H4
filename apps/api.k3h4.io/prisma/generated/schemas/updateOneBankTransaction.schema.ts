import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionUpdateInputObjectSchema as BankTransactionUpdateInputObjectSchema } from './objects/BankTransactionUpdateInput.schema';
import { BankTransactionUncheckedUpdateInputObjectSchema as BankTransactionUncheckedUpdateInputObjectSchema } from './objects/BankTransactionUncheckedUpdateInput.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';

export const BankTransactionUpdateOneSchema: z.ZodType<Prisma.BankTransactionUpdateArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), data: z.union([BankTransactionUpdateInputObjectSchema, BankTransactionUncheckedUpdateInputObjectSchema]), where: BankTransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BankTransactionUpdateArgs>;

export const BankTransactionUpdateOneZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), data: z.union([BankTransactionUpdateInputObjectSchema, BankTransactionUncheckedUpdateInputObjectSchema]), where: BankTransactionWhereUniqueInputObjectSchema }).strict();
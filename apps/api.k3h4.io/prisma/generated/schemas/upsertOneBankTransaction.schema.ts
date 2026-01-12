import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';
import { BankTransactionCreateInputObjectSchema as BankTransactionCreateInputObjectSchema } from './objects/BankTransactionCreateInput.schema';
import { BankTransactionUncheckedCreateInputObjectSchema as BankTransactionUncheckedCreateInputObjectSchema } from './objects/BankTransactionUncheckedCreateInput.schema';
import { BankTransactionUpdateInputObjectSchema as BankTransactionUpdateInputObjectSchema } from './objects/BankTransactionUpdateInput.schema';
import { BankTransactionUncheckedUpdateInputObjectSchema as BankTransactionUncheckedUpdateInputObjectSchema } from './objects/BankTransactionUncheckedUpdateInput.schema';

export const BankTransactionUpsertOneSchema: z.ZodType<Prisma.BankTransactionUpsertArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema, create: z.union([ BankTransactionCreateInputObjectSchema, BankTransactionUncheckedCreateInputObjectSchema ]), update: z.union([ BankTransactionUpdateInputObjectSchema, BankTransactionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.BankTransactionUpsertArgs>;

export const BankTransactionUpsertOneZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), where: BankTransactionWhereUniqueInputObjectSchema, create: z.union([ BankTransactionCreateInputObjectSchema, BankTransactionUncheckedCreateInputObjectSchema ]), update: z.union([ BankTransactionUpdateInputObjectSchema, BankTransactionUncheckedUpdateInputObjectSchema ]) }).strict();
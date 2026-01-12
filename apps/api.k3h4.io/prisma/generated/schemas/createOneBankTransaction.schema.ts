import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionCreateInputObjectSchema as BankTransactionCreateInputObjectSchema } from './objects/BankTransactionCreateInput.schema';
import { BankTransactionUncheckedCreateInputObjectSchema as BankTransactionUncheckedCreateInputObjectSchema } from './objects/BankTransactionUncheckedCreateInput.schema';

export const BankTransactionCreateOneSchema: z.ZodType<Prisma.BankTransactionCreateArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), data: z.union([BankTransactionCreateInputObjectSchema, BankTransactionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.BankTransactionCreateArgs>;

export const BankTransactionCreateOneZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), include: BankTransactionIncludeObjectSchema.optional(), data: z.union([BankTransactionCreateInputObjectSchema, BankTransactionUncheckedCreateInputObjectSchema]) }).strict();
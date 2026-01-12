import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './objects/BankTransactionWhereInput.schema';

export const BankTransactionDeleteManySchema: z.ZodType<Prisma.BankTransactionDeleteManyArgs> = z.object({ where: BankTransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionDeleteManyArgs>;

export const BankTransactionDeleteManyZodSchema = z.object({ where: BankTransactionWhereInputObjectSchema.optional() }).strict();
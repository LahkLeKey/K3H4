import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionUpdateManyMutationInputObjectSchema as BankTransactionUpdateManyMutationInputObjectSchema } from './objects/BankTransactionUpdateManyMutationInput.schema';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './objects/BankTransactionWhereInput.schema';

export const BankTransactionUpdateManySchema: z.ZodType<Prisma.BankTransactionUpdateManyArgs> = z.object({ data: BankTransactionUpdateManyMutationInputObjectSchema, where: BankTransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionUpdateManyArgs>;

export const BankTransactionUpdateManyZodSchema = z.object({ data: BankTransactionUpdateManyMutationInputObjectSchema, where: BankTransactionWhereInputObjectSchema.optional() }).strict();
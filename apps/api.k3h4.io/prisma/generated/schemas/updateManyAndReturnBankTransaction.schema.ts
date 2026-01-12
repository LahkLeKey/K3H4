import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './objects/BankTransactionSelect.schema';
import { BankTransactionUpdateManyMutationInputObjectSchema as BankTransactionUpdateManyMutationInputObjectSchema } from './objects/BankTransactionUpdateManyMutationInput.schema';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './objects/BankTransactionWhereInput.schema';

export const BankTransactionUpdateManyAndReturnSchema: z.ZodType<Prisma.BankTransactionUpdateManyAndReturnArgs> = z.object({ select: BankTransactionSelectObjectSchema.optional(), data: BankTransactionUpdateManyMutationInputObjectSchema, where: BankTransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionUpdateManyAndReturnArgs>;

export const BankTransactionUpdateManyAndReturnZodSchema = z.object({ select: BankTransactionSelectObjectSchema.optional(), data: BankTransactionUpdateManyMutationInputObjectSchema, where: BankTransactionWhereInputObjectSchema.optional() }).strict();
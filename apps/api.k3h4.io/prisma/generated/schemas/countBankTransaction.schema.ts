import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionOrderByWithRelationInputObjectSchema as BankTransactionOrderByWithRelationInputObjectSchema } from './objects/BankTransactionOrderByWithRelationInput.schema';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './objects/BankTransactionWhereInput.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';
import { BankTransactionCountAggregateInputObjectSchema as BankTransactionCountAggregateInputObjectSchema } from './objects/BankTransactionCountAggregateInput.schema';

export const BankTransactionCountSchema: z.ZodType<Prisma.BankTransactionCountArgs> = z.object({ orderBy: z.union([BankTransactionOrderByWithRelationInputObjectSchema, BankTransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: BankTransactionWhereInputObjectSchema.optional(), cursor: BankTransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BankTransactionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionCountArgs>;

export const BankTransactionCountZodSchema = z.object({ orderBy: z.union([BankTransactionOrderByWithRelationInputObjectSchema, BankTransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: BankTransactionWhereInputObjectSchema.optional(), cursor: BankTransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BankTransactionCountAggregateInputObjectSchema ]).optional() }).strict();
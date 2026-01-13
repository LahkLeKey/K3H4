import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './objects/BankTransactionInclude.schema';
import { BankTransactionOrderByWithRelationInputObjectSchema as BankTransactionOrderByWithRelationInputObjectSchema } from './objects/BankTransactionOrderByWithRelationInput.schema';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './objects/BankTransactionWhereInput.schema';
import { BankTransactionWhereUniqueInputObjectSchema as BankTransactionWhereUniqueInputObjectSchema } from './objects/BankTransactionWhereUniqueInput.schema';
import { BankTransactionScalarFieldEnumSchema } from './enums/BankTransactionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BankTransactionFindFirstSelectSchema: z.ZodType<Prisma.BankTransactionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    amount: z.boolean().optional(),
    kind: z.boolean().optional(),
    direction: z.boolean().optional(),
    note: z.boolean().optional(),
    balanceAfter: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BankTransactionSelect>;

export const BankTransactionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    amount: z.boolean().optional(),
    kind: z.boolean().optional(),
    direction: z.boolean().optional(),
    note: z.boolean().optional(),
    balanceAfter: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const BankTransactionFindFirstSchema: z.ZodType<Prisma.BankTransactionFindFirstArgs> = z.object({ select: BankTransactionFindFirstSelectSchema.optional(), include: z.lazy(() => BankTransactionIncludeObjectSchema.optional()), orderBy: z.union([BankTransactionOrderByWithRelationInputObjectSchema, BankTransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: BankTransactionWhereInputObjectSchema.optional(), cursor: BankTransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BankTransactionScalarFieldEnumSchema, BankTransactionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BankTransactionFindFirstArgs>;

export const BankTransactionFindFirstZodSchema = z.object({ select: BankTransactionFindFirstSelectSchema.optional(), include: z.lazy(() => BankTransactionIncludeObjectSchema.optional()), orderBy: z.union([BankTransactionOrderByWithRelationInputObjectSchema, BankTransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: BankTransactionWhereInputObjectSchema.optional(), cursor: BankTransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BankTransactionScalarFieldEnumSchema, BankTransactionScalarFieldEnumSchema.array()]).optional() }).strict();
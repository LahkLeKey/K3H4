import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './objects/ArcadePrizeInclude.schema';
import { ArcadePrizeOrderByWithRelationInputObjectSchema as ArcadePrizeOrderByWithRelationInputObjectSchema } from './objects/ArcadePrizeOrderByWithRelationInput.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './objects/ArcadePrizeWhereInput.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './objects/ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeScalarFieldEnumSchema } from './enums/ArcadePrizeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadePrizeFindFirstSelectSchema: z.ZodType<Prisma.ArcadePrizeSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    sku: z.boolean().optional(),
    costCoins: z.boolean().optional(),
    stock: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeSelect>;

export const ArcadePrizeFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    sku: z.boolean().optional(),
    costCoins: z.boolean().optional(),
    stock: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ArcadePrizeFindFirstSchema: z.ZodType<Prisma.ArcadePrizeFindFirstArgs> = z.object({ select: ArcadePrizeFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadePrizeIncludeObjectSchema.optional()), orderBy: z.union([ArcadePrizeOrderByWithRelationInputObjectSchema, ArcadePrizeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadePrizeWhereInputObjectSchema.optional(), cursor: ArcadePrizeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadePrizeScalarFieldEnumSchema, ArcadePrizeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadePrizeFindFirstArgs>;

export const ArcadePrizeFindFirstZodSchema = z.object({ select: ArcadePrizeFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadePrizeIncludeObjectSchema.optional()), orderBy: z.union([ArcadePrizeOrderByWithRelationInputObjectSchema, ArcadePrizeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadePrizeWhereInputObjectSchema.optional(), cursor: ArcadePrizeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadePrizeScalarFieldEnumSchema, ArcadePrizeScalarFieldEnumSchema.array()]).optional() }).strict();
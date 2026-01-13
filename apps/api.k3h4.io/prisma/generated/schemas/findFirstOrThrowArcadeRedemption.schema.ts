import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './objects/ArcadeRedemptionInclude.schema';
import { ArcadeRedemptionOrderByWithRelationInputObjectSchema as ArcadeRedemptionOrderByWithRelationInputObjectSchema } from './objects/ArcadeRedemptionOrderByWithRelationInput.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './objects/ArcadeRedemptionWhereInput.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './objects/ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionScalarFieldEnumSchema } from './enums/ArcadeRedemptionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadeRedemptionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ArcadeRedemptionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    prizeId: z.boolean().optional(),
    prize: z.boolean().optional(),
    status: z.boolean().optional(),
    fulfilledAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionSelect>;

export const ArcadeRedemptionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    prizeId: z.boolean().optional(),
    prize: z.boolean().optional(),
    status: z.boolean().optional(),
    fulfilledAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ArcadeRedemptionFindFirstOrThrowSchema: z.ZodType<Prisma.ArcadeRedemptionFindFirstOrThrowArgs> = z.object({ select: ArcadeRedemptionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ArcadeRedemptionIncludeObjectSchema.optional()), orderBy: z.union([ArcadeRedemptionOrderByWithRelationInputObjectSchema, ArcadeRedemptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeRedemptionWhereInputObjectSchema.optional(), cursor: ArcadeRedemptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeRedemptionScalarFieldEnumSchema, ArcadeRedemptionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeRedemptionFindFirstOrThrowArgs>;

export const ArcadeRedemptionFindFirstOrThrowZodSchema = z.object({ select: ArcadeRedemptionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ArcadeRedemptionIncludeObjectSchema.optional()), orderBy: z.union([ArcadeRedemptionOrderByWithRelationInputObjectSchema, ArcadeRedemptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeRedemptionWhereInputObjectSchema.optional(), cursor: ArcadeRedemptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeRedemptionScalarFieldEnumSchema, ArcadeRedemptionScalarFieldEnumSchema.array()]).optional() }).strict();
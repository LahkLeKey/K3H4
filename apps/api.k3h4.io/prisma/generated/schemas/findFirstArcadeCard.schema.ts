import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './objects/ArcadeCardInclude.schema';
import { ArcadeCardOrderByWithRelationInputObjectSchema as ArcadeCardOrderByWithRelationInputObjectSchema } from './objects/ArcadeCardOrderByWithRelationInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './objects/ArcadeCardWhereInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './objects/ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardScalarFieldEnumSchema } from './enums/ArcadeCardScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadeCardFindFirstSelectSchema: z.ZodType<Prisma.ArcadeCardSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    label: z.boolean().optional(),
    balance: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    topUps: z.boolean().optional(),
    sessions: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadeCardSelect>;

export const ArcadeCardFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    label: z.boolean().optional(),
    balance: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    topUps: z.boolean().optional(),
    sessions: z.boolean().optional(),
    redemptions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ArcadeCardFindFirstSchema: z.ZodType<Prisma.ArcadeCardFindFirstArgs> = z.object({ select: ArcadeCardFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeCardIncludeObjectSchema.optional()), orderBy: z.union([ArcadeCardOrderByWithRelationInputObjectSchema, ArcadeCardOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeCardWhereInputObjectSchema.optional(), cursor: ArcadeCardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeCardScalarFieldEnumSchema, ArcadeCardScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeCardFindFirstArgs>;

export const ArcadeCardFindFirstZodSchema = z.object({ select: ArcadeCardFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeCardIncludeObjectSchema.optional()), orderBy: z.union([ArcadeCardOrderByWithRelationInputObjectSchema, ArcadeCardOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeCardWhereInputObjectSchema.optional(), cursor: ArcadeCardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeCardScalarFieldEnumSchema, ArcadeCardScalarFieldEnumSchema.array()]).optional() }).strict();
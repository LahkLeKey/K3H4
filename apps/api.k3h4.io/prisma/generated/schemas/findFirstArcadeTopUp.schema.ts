import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './objects/ArcadeTopUpInclude.schema';
import { ArcadeTopUpOrderByWithRelationInputObjectSchema as ArcadeTopUpOrderByWithRelationInputObjectSchema } from './objects/ArcadeTopUpOrderByWithRelationInput.schema';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './objects/ArcadeTopUpWhereInput.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpScalarFieldEnumSchema } from './enums/ArcadeTopUpScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadeTopUpFindFirstSelectSchema: z.ZodType<Prisma.ArcadeTopUpSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    amount: z.boolean().optional(),
    source: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpSelect>;

export const ArcadeTopUpFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    amount: z.boolean().optional(),
    source: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const ArcadeTopUpFindFirstSchema: z.ZodType<Prisma.ArcadeTopUpFindFirstArgs> = z.object({ select: ArcadeTopUpFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeTopUpIncludeObjectSchema.optional()), orderBy: z.union([ArcadeTopUpOrderByWithRelationInputObjectSchema, ArcadeTopUpOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeTopUpWhereInputObjectSchema.optional(), cursor: ArcadeTopUpWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeTopUpScalarFieldEnumSchema, ArcadeTopUpScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpFindFirstArgs>;

export const ArcadeTopUpFindFirstZodSchema = z.object({ select: ArcadeTopUpFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeTopUpIncludeObjectSchema.optional()), orderBy: z.union([ArcadeTopUpOrderByWithRelationInputObjectSchema, ArcadeTopUpOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeTopUpWhereInputObjectSchema.optional(), cursor: ArcadeTopUpWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeTopUpScalarFieldEnumSchema, ArcadeTopUpScalarFieldEnumSchema.array()]).optional() }).strict();
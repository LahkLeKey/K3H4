import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './objects/ArcadeSessionInclude.schema';
import { ArcadeSessionOrderByWithRelationInputObjectSchema as ArcadeSessionOrderByWithRelationInputObjectSchema } from './objects/ArcadeSessionOrderByWithRelationInput.schema';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './objects/ArcadeSessionWhereInput.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionScalarFieldEnumSchema } from './enums/ArcadeSessionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadeSessionFindFirstSelectSchema: z.ZodType<Prisma.ArcadeSessionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    machineId: z.boolean().optional(),
    machine: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    creditsSpent: z.boolean().optional(),
    score: z.boolean().optional(),
    rewardRedemptionId: z.boolean().optional(),
    rewardRedemption: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    endedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionSelect>;

export const ArcadeSessionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    machineId: z.boolean().optional(),
    machine: z.boolean().optional(),
    cardId: z.boolean().optional(),
    card: z.boolean().optional(),
    creditsSpent: z.boolean().optional(),
    score: z.boolean().optional(),
    rewardRedemptionId: z.boolean().optional(),
    rewardRedemption: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    endedAt: z.boolean().optional()
  }).strict();

export const ArcadeSessionFindFirstSchema: z.ZodType<Prisma.ArcadeSessionFindFirstArgs> = z.object({ select: ArcadeSessionFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeSessionIncludeObjectSchema.optional()), orderBy: z.union([ArcadeSessionOrderByWithRelationInputObjectSchema, ArcadeSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeSessionWhereInputObjectSchema.optional(), cursor: ArcadeSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeSessionScalarFieldEnumSchema, ArcadeSessionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionFindFirstArgs>;

export const ArcadeSessionFindFirstZodSchema = z.object({ select: ArcadeSessionFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeSessionIncludeObjectSchema.optional()), orderBy: z.union([ArcadeSessionOrderByWithRelationInputObjectSchema, ArcadeSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeSessionWhereInputObjectSchema.optional(), cursor: ArcadeSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeSessionScalarFieldEnumSchema, ArcadeSessionScalarFieldEnumSchema.array()]).optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightOrderByWithRelationInputObjectSchema as AiInsightOrderByWithRelationInputObjectSchema } from './objects/AiInsightOrderByWithRelationInput.schema';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';
import { AiInsightScalarFieldEnumSchema } from './enums/AiInsightScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AiInsightFindFirstSelectSchema: z.ZodType<Prisma.AiInsightSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    targetLabel: z.boolean().optional(),
    description: z.boolean().optional(),
    metadata: z.boolean().optional(),
    payload: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AiInsightSelect>;

export const AiInsightFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    targetType: z.boolean().optional(),
    targetId: z.boolean().optional(),
    targetLabel: z.boolean().optional(),
    description: z.boolean().optional(),
    metadata: z.boolean().optional(),
    payload: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const AiInsightFindFirstSchema: z.ZodType<Prisma.AiInsightFindFirstArgs> = z.object({ select: AiInsightFindFirstSelectSchema.optional(), include: z.lazy(() => AiInsightIncludeObjectSchema.optional()), orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AiInsightScalarFieldEnumSchema, AiInsightScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightFindFirstArgs>;

export const AiInsightFindFirstZodSchema = z.object({ select: AiInsightFindFirstSelectSchema.optional(), include: z.lazy(() => AiInsightIncludeObjectSchema.optional()), orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AiInsightScalarFieldEnumSchema, AiInsightScalarFieldEnumSchema.array()]).optional() }).strict();
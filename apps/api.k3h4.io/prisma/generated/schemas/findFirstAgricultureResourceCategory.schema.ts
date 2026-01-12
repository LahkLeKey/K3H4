import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategoryIncludeObjectSchema as AgricultureResourceCategoryIncludeObjectSchema } from './objects/AgricultureResourceCategoryInclude.schema';
import { AgricultureResourceCategoryOrderByWithRelationInputObjectSchema as AgricultureResourceCategoryOrderByWithRelationInputObjectSchema } from './objects/AgricultureResourceCategoryOrderByWithRelationInput.schema';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './objects/AgricultureResourceCategoryWhereInput.schema';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './objects/AgricultureResourceCategoryWhereUniqueInput.schema';
import { AgricultureResourceCategoryScalarFieldEnumSchema } from './enums/AgricultureResourceCategoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureResourceCategoryFindFirstSelectSchema: z.ZodType<Prisma.AgricultureResourceCategorySelect> = z.object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    resources: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategorySelect>;

export const AgricultureResourceCategoryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    slug: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    resources: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AgricultureResourceCategoryFindFirstSchema: z.ZodType<Prisma.AgricultureResourceCategoryFindFirstArgs> = z.object({ select: AgricultureResourceCategoryFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureResourceCategoryIncludeObjectSchema.optional()), orderBy: z.union([AgricultureResourceCategoryOrderByWithRelationInputObjectSchema, AgricultureResourceCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureResourceCategoryWhereInputObjectSchema.optional(), cursor: AgricultureResourceCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureResourceCategoryScalarFieldEnumSchema, AgricultureResourceCategoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryFindFirstArgs>;

export const AgricultureResourceCategoryFindFirstZodSchema = z.object({ select: AgricultureResourceCategoryFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureResourceCategoryIncludeObjectSchema.optional()), orderBy: z.union([AgricultureResourceCategoryOrderByWithRelationInputObjectSchema, AgricultureResourceCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureResourceCategoryWhereInputObjectSchema.optional(), cursor: AgricultureResourceCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureResourceCategoryScalarFieldEnumSchema, AgricultureResourceCategoryScalarFieldEnumSchema.array()]).optional() }).strict();
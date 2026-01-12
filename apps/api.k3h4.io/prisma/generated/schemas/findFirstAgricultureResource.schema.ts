import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './objects/AgricultureResourceInclude.schema';
import { AgricultureResourceOrderByWithRelationInputObjectSchema as AgricultureResourceOrderByWithRelationInputObjectSchema } from './objects/AgricultureResourceOrderByWithRelationInput.schema';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './objects/AgricultureResourceWhereInput.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './objects/AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceScalarFieldEnumSchema } from './enums/AgricultureResourceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureResourceFindFirstSelectSchema: z.ZodType<Prisma.AgricultureResourceSelect> = z.object({
    id: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    category: z.boolean().optional(),
    title: z.boolean().optional(),
    summary: z.boolean().optional(),
    url: z.boolean().optional(),
    tags: z.boolean().optional(),
    source: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceSelect>;

export const AgricultureResourceFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    category: z.boolean().optional(),
    title: z.boolean().optional(),
    summary: z.boolean().optional(),
    url: z.boolean().optional(),
    tags: z.boolean().optional(),
    source: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const AgricultureResourceFindFirstSchema: z.ZodType<Prisma.AgricultureResourceFindFirstArgs> = z.object({ select: AgricultureResourceFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureResourceIncludeObjectSchema.optional()), orderBy: z.union([AgricultureResourceOrderByWithRelationInputObjectSchema, AgricultureResourceOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureResourceWhereInputObjectSchema.optional(), cursor: AgricultureResourceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureResourceScalarFieldEnumSchema, AgricultureResourceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceFindFirstArgs>;

export const AgricultureResourceFindFirstZodSchema = z.object({ select: AgricultureResourceFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureResourceIncludeObjectSchema.optional()), orderBy: z.union([AgricultureResourceOrderByWithRelationInputObjectSchema, AgricultureResourceOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureResourceWhereInputObjectSchema.optional(), cursor: AgricultureResourceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureResourceScalarFieldEnumSchema, AgricultureResourceScalarFieldEnumSchema.array()]).optional() }).strict();
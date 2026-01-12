import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityOrderByWithRelationInputObjectSchema as PersonaCompatibilityOrderByWithRelationInputObjectSchema } from './objects/PersonaCompatibilityOrderByWithRelationInput.schema';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './objects/PersonaCompatibilityWhereInput.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './objects/PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityScalarFieldEnumSchema } from './enums/PersonaCompatibilityScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonaCompatibilityFindManySelectSchema: z.ZodType<Prisma.PersonaCompatibilitySelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sourceId: z.boolean().optional(),
    source: z.boolean().optional(),
    targetId: z.boolean().optional(),
    target: z.boolean().optional(),
    jaccardScore: z.boolean().optional(),
    intersectionCount: z.boolean().optional(),
    unionCount: z.boolean().optional(),
    overlappingTokens: z.boolean().optional(),
    computedAt: z.boolean().optional(),
    rationale: z.boolean().optional(),
    status: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilitySelect>;

export const PersonaCompatibilityFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sourceId: z.boolean().optional(),
    source: z.boolean().optional(),
    targetId: z.boolean().optional(),
    target: z.boolean().optional(),
    jaccardScore: z.boolean().optional(),
    intersectionCount: z.boolean().optional(),
    unionCount: z.boolean().optional(),
    overlappingTokens: z.boolean().optional(),
    computedAt: z.boolean().optional(),
    rationale: z.boolean().optional(),
    status: z.boolean().optional()
  }).strict();

export const PersonaCompatibilityFindManySchema: z.ZodType<Prisma.PersonaCompatibilityFindManyArgs> = z.object({ select: PersonaCompatibilityFindManySelectSchema.optional(), include: z.lazy(() => PersonaCompatibilityIncludeObjectSchema.optional()), orderBy: z.union([PersonaCompatibilityOrderByWithRelationInputObjectSchema, PersonaCompatibilityOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaCompatibilityWhereInputObjectSchema.optional(), cursor: PersonaCompatibilityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaCompatibilityScalarFieldEnumSchema, PersonaCompatibilityScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityFindManyArgs>;

export const PersonaCompatibilityFindManyZodSchema = z.object({ select: PersonaCompatibilityFindManySelectSchema.optional(), include: z.lazy(() => PersonaCompatibilityIncludeObjectSchema.optional()), orderBy: z.union([PersonaCompatibilityOrderByWithRelationInputObjectSchema, PersonaCompatibilityOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaCompatibilityWhereInputObjectSchema.optional(), cursor: PersonaCompatibilityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaCompatibilityScalarFieldEnumSchema, PersonaCompatibilityScalarFieldEnumSchema.array()]).optional() }).strict();
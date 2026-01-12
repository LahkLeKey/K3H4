import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './objects/PersonaOrderByWithRelationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';
import { PersonaScalarFieldEnumSchema } from './enums/PersonaScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonaFindFirstSelectSchema: z.ZodType<Prisma.PersonaSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    alias: z.boolean().optional(),
    account: z.boolean().optional(),
    handle: z.boolean().optional(),
    note: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    assignments: z.boolean().optional(),
    assignmentPayouts: z.boolean().optional(),
    attributes: z.boolean().optional(),
    compatibilitySources: z.boolean().optional(),
    compatibilityTargets: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PersonaSelect>;

export const PersonaFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    alias: z.boolean().optional(),
    account: z.boolean().optional(),
    handle: z.boolean().optional(),
    note: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    assignments: z.boolean().optional(),
    assignmentPayouts: z.boolean().optional(),
    attributes: z.boolean().optional(),
    compatibilitySources: z.boolean().optional(),
    compatibilityTargets: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PersonaFindFirstSchema: z.ZodType<Prisma.PersonaFindFirstArgs> = z.object({ select: PersonaFindFirstSelectSchema.optional(), include: z.lazy(() => PersonaIncludeObjectSchema.optional()), orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaScalarFieldEnumSchema, PersonaScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PersonaFindFirstArgs>;

export const PersonaFindFirstZodSchema = z.object({ select: PersonaFindFirstSelectSchema.optional(), include: z.lazy(() => PersonaIncludeObjectSchema.optional()), orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaScalarFieldEnumSchema, PersonaScalarFieldEnumSchema.array()]).optional() }).strict();
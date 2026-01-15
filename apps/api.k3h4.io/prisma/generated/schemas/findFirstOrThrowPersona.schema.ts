import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './objects/PersonaOrderByWithRelationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';
import { PersonaScalarFieldEnumSchema } from './enums/PersonaScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonaFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PersonaSelect> = z.object({
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
    staffingCandidates: z.boolean().optional(),
    staffingShiftsAssigned: z.boolean().optional(),
    staffingPlacements: z.boolean().optional(),
    attributes: z.boolean().optional(),
    compatibilitySources: z.boolean().optional(),
    compatibilityTargets: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PersonaSelect>;

export const PersonaFindFirstOrThrowSelectZodSchema = z.object({
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
    staffingCandidates: z.boolean().optional(),
    staffingShiftsAssigned: z.boolean().optional(),
    staffingPlacements: z.boolean().optional(),
    attributes: z.boolean().optional(),
    compatibilitySources: z.boolean().optional(),
    compatibilityTargets: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PersonaFindFirstOrThrowSchema: z.ZodType<Prisma.PersonaFindFirstOrThrowArgs> = z.object({ select: PersonaFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PersonaIncludeObjectSchema.optional()), orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaScalarFieldEnumSchema, PersonaScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PersonaFindFirstOrThrowArgs>;

export const PersonaFindFirstOrThrowZodSchema = z.object({ select: PersonaFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PersonaIncludeObjectSchema.optional()), orderBy: z.union([PersonaOrderByWithRelationInputObjectSchema, PersonaOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaWhereInputObjectSchema.optional(), cursor: PersonaWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaScalarFieldEnumSchema, PersonaScalarFieldEnumSchema.array()]).optional() }).strict();
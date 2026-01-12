import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeOrderByWithRelationInputObjectSchema as PersonaAttributeOrderByWithRelationInputObjectSchema } from './objects/PersonaAttributeOrderByWithRelationInput.schema';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './objects/PersonaAttributeWhereInput.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './objects/PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeScalarFieldEnumSchema } from './enums/PersonaAttributeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonaAttributeFindFirstSelectSchema: z.ZodType<Prisma.PersonaAttributeSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    category: z.boolean().optional(),
    value: z.boolean().optional(),
    weight: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeSelect>;

export const PersonaAttributeFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    category: z.boolean().optional(),
    value: z.boolean().optional(),
    weight: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const PersonaAttributeFindFirstSchema: z.ZodType<Prisma.PersonaAttributeFindFirstArgs> = z.object({ select: PersonaAttributeFindFirstSelectSchema.optional(), include: z.lazy(() => PersonaAttributeIncludeObjectSchema.optional()), orderBy: z.union([PersonaAttributeOrderByWithRelationInputObjectSchema, PersonaAttributeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaAttributeWhereInputObjectSchema.optional(), cursor: PersonaAttributeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaAttributeScalarFieldEnumSchema, PersonaAttributeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeFindFirstArgs>;

export const PersonaAttributeFindFirstZodSchema = z.object({ select: PersonaAttributeFindFirstSelectSchema.optional(), include: z.lazy(() => PersonaAttributeIncludeObjectSchema.optional()), orderBy: z.union([PersonaAttributeOrderByWithRelationInputObjectSchema, PersonaAttributeOrderByWithRelationInputObjectSchema.array()]).optional(), where: PersonaAttributeWhereInputObjectSchema.optional(), cursor: PersonaAttributeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PersonaAttributeScalarFieldEnumSchema, PersonaAttributeScalarFieldEnumSchema.array()]).optional() }).strict();
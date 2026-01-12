import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityUpdateInputObjectSchema as PersonaCompatibilityUpdateInputObjectSchema } from './objects/PersonaCompatibilityUpdateInput.schema';
import { PersonaCompatibilityUncheckedUpdateInputObjectSchema as PersonaCompatibilityUncheckedUpdateInputObjectSchema } from './objects/PersonaCompatibilityUncheckedUpdateInput.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './objects/PersonaCompatibilityWhereUniqueInput.schema';

export const PersonaCompatibilityUpdateOneSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), data: z.union([PersonaCompatibilityUpdateInputObjectSchema, PersonaCompatibilityUncheckedUpdateInputObjectSchema]), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateArgs>;

export const PersonaCompatibilityUpdateOneZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), data: z.union([PersonaCompatibilityUpdateInputObjectSchema, PersonaCompatibilityUncheckedUpdateInputObjectSchema]), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict();
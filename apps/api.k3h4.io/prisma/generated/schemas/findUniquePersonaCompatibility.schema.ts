import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './objects/PersonaCompatibilityWhereUniqueInput.schema';

export const PersonaCompatibilityFindUniqueSchema: z.ZodType<Prisma.PersonaCompatibilityFindUniqueArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityFindUniqueArgs>;

export const PersonaCompatibilityFindUniqueZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict();
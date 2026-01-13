import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './objects/PersonaCompatibilityWhereUniqueInput.schema';

export const PersonaCompatibilityFindUniqueOrThrowSchema: z.ZodType<Prisma.PersonaCompatibilityFindUniqueOrThrowArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityFindUniqueOrThrowArgs>;

export const PersonaCompatibilityFindUniqueOrThrowZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema }).strict();
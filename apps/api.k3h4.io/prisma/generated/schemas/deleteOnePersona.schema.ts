import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';

export const PersonaDeleteOneSchema: z.ZodType<Prisma.PersonaDeleteArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaDeleteArgs>;

export const PersonaDeleteOneZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema }).strict();
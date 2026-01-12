import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';

export const PersonaFindUniqueSchema: z.ZodType<Prisma.PersonaFindUniqueArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaFindUniqueArgs>;

export const PersonaFindUniqueZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema }).strict();
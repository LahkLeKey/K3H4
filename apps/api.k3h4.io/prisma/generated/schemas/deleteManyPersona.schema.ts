import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';

export const PersonaDeleteManySchema: z.ZodType<Prisma.PersonaDeleteManyArgs> = z.object({ where: PersonaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaDeleteManyArgs>;

export const PersonaDeleteManyZodSchema = z.object({ where: PersonaWhereInputObjectSchema.optional() }).strict();
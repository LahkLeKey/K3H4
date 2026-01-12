import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './objects/PersonaAttributeWhereInput.schema';

export const PersonaAttributeDeleteManySchema: z.ZodType<Prisma.PersonaAttributeDeleteManyArgs> = z.object({ where: PersonaAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeDeleteManyArgs>;

export const PersonaAttributeDeleteManyZodSchema = z.object({ where: PersonaAttributeWhereInputObjectSchema.optional() }).strict();
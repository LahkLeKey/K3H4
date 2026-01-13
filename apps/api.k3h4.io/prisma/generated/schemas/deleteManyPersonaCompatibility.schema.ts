import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './objects/PersonaCompatibilityWhereInput.schema';

export const PersonaCompatibilityDeleteManySchema: z.ZodType<Prisma.PersonaCompatibilityDeleteManyArgs> = z.object({ where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityDeleteManyArgs>;

export const PersonaCompatibilityDeleteManyZodSchema = z.object({ where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict();
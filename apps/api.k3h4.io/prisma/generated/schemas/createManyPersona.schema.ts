import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCreateManyInputObjectSchema as PersonaCreateManyInputObjectSchema } from './objects/PersonaCreateManyInput.schema';

export const PersonaCreateManySchema: z.ZodType<Prisma.PersonaCreateManyArgs> = z.object({ data: z.union([ PersonaCreateManyInputObjectSchema, z.array(PersonaCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCreateManyArgs>;

export const PersonaCreateManyZodSchema = z.object({ data: z.union([ PersonaCreateManyInputObjectSchema, z.array(PersonaCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
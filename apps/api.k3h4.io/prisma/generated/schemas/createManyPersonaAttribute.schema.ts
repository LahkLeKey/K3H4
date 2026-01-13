import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeCreateManyInputObjectSchema as PersonaAttributeCreateManyInputObjectSchema } from './objects/PersonaAttributeCreateManyInput.schema';

export const PersonaAttributeCreateManySchema: z.ZodType<Prisma.PersonaAttributeCreateManyArgs> = z.object({ data: z.union([ PersonaAttributeCreateManyInputObjectSchema, z.array(PersonaAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeCreateManyArgs>;

export const PersonaAttributeCreateManyZodSchema = z.object({ data: z.union([ PersonaAttributeCreateManyInputObjectSchema, z.array(PersonaAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
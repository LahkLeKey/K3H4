import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilityCreateManyInputObjectSchema as PersonaCompatibilityCreateManyInputObjectSchema } from './objects/PersonaCompatibilityCreateManyInput.schema';

export const PersonaCompatibilityCreateManySchema: z.ZodType<Prisma.PersonaCompatibilityCreateManyArgs> = z.object({ data: z.union([ PersonaCompatibilityCreateManyInputObjectSchema, z.array(PersonaCompatibilityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateManyArgs>;

export const PersonaCompatibilityCreateManyZodSchema = z.object({ data: z.union([ PersonaCompatibilityCreateManyInputObjectSchema, z.array(PersonaCompatibilityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
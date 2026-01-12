import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaCreateManyInputObjectSchema as PersonaCreateManyInputObjectSchema } from './objects/PersonaCreateManyInput.schema';

export const PersonaCreateManyAndReturnSchema: z.ZodType<Prisma.PersonaCreateManyAndReturnArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), data: z.union([ PersonaCreateManyInputObjectSchema, z.array(PersonaCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCreateManyAndReturnArgs>;

export const PersonaCreateManyAndReturnZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), data: z.union([ PersonaCreateManyInputObjectSchema, z.array(PersonaCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeCreateManyInputObjectSchema as PersonaAttributeCreateManyInputObjectSchema } from './objects/PersonaAttributeCreateManyInput.schema';

export const PersonaAttributeCreateManyAndReturnSchema: z.ZodType<Prisma.PersonaAttributeCreateManyAndReturnArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), data: z.union([ PersonaAttributeCreateManyInputObjectSchema, z.array(PersonaAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeCreateManyAndReturnArgs>;

export const PersonaAttributeCreateManyAndReturnZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), data: z.union([ PersonaAttributeCreateManyInputObjectSchema, z.array(PersonaAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
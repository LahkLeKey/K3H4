import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityCreateManyInputObjectSchema as PersonaCompatibilityCreateManyInputObjectSchema } from './objects/PersonaCompatibilityCreateManyInput.schema';

export const PersonaCompatibilityCreateManyAndReturnSchema: z.ZodType<Prisma.PersonaCompatibilityCreateManyAndReturnArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), data: z.union([ PersonaCompatibilityCreateManyInputObjectSchema, z.array(PersonaCompatibilityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateManyAndReturnArgs>;

export const PersonaCompatibilityCreateManyAndReturnZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), data: z.union([ PersonaCompatibilityCreateManyInputObjectSchema, z.array(PersonaCompatibilityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
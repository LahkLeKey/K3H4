import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaCreateInputObjectSchema as PersonaCreateInputObjectSchema } from './objects/PersonaCreateInput.schema';
import { PersonaUncheckedCreateInputObjectSchema as PersonaUncheckedCreateInputObjectSchema } from './objects/PersonaUncheckedCreateInput.schema';

export const PersonaCreateOneSchema: z.ZodType<Prisma.PersonaCreateArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), data: z.union([PersonaCreateInputObjectSchema, PersonaUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PersonaCreateArgs>;

export const PersonaCreateOneZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), data: z.union([PersonaCreateInputObjectSchema, PersonaUncheckedCreateInputObjectSchema]) }).strict();
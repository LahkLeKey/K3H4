import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeCreateInputObjectSchema as PersonaAttributeCreateInputObjectSchema } from './objects/PersonaAttributeCreateInput.schema';
import { PersonaAttributeUncheckedCreateInputObjectSchema as PersonaAttributeUncheckedCreateInputObjectSchema } from './objects/PersonaAttributeUncheckedCreateInput.schema';

export const PersonaAttributeCreateOneSchema: z.ZodType<Prisma.PersonaAttributeCreateArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), data: z.union([PersonaAttributeCreateInputObjectSchema, PersonaAttributeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeCreateArgs>;

export const PersonaAttributeCreateOneZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), data: z.union([PersonaAttributeCreateInputObjectSchema, PersonaAttributeUncheckedCreateInputObjectSchema]) }).strict();
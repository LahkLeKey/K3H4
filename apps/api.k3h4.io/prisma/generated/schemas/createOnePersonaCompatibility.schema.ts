import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityCreateInputObjectSchema as PersonaCompatibilityCreateInputObjectSchema } from './objects/PersonaCompatibilityCreateInput.schema';
import { PersonaCompatibilityUncheckedCreateInputObjectSchema as PersonaCompatibilityUncheckedCreateInputObjectSchema } from './objects/PersonaCompatibilityUncheckedCreateInput.schema';

export const PersonaCompatibilityCreateOneSchema: z.ZodType<Prisma.PersonaCompatibilityCreateArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), data: z.union([PersonaCompatibilityCreateInputObjectSchema, PersonaCompatibilityUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateArgs>;

export const PersonaCompatibilityCreateOneZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), data: z.union([PersonaCompatibilityCreateInputObjectSchema, PersonaCompatibilityUncheckedCreateInputObjectSchema]) }).strict();
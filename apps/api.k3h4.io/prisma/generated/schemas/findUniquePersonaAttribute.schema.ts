import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './objects/PersonaAttributeWhereUniqueInput.schema';

export const PersonaAttributeFindUniqueSchema: z.ZodType<Prisma.PersonaAttributeFindUniqueArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeFindUniqueArgs>;

export const PersonaAttributeFindUniqueZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict();
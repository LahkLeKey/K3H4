import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './objects/PersonaAttributeWhereUniqueInput.schema';

export const PersonaAttributeFindUniqueOrThrowSchema: z.ZodType<Prisma.PersonaAttributeFindUniqueOrThrowArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeFindUniqueOrThrowArgs>;

export const PersonaAttributeFindUniqueOrThrowZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeUpdateInputObjectSchema as PersonaAttributeUpdateInputObjectSchema } from './objects/PersonaAttributeUpdateInput.schema';
import { PersonaAttributeUncheckedUpdateInputObjectSchema as PersonaAttributeUncheckedUpdateInputObjectSchema } from './objects/PersonaAttributeUncheckedUpdateInput.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './objects/PersonaAttributeWhereUniqueInput.schema';

export const PersonaAttributeUpdateOneSchema: z.ZodType<Prisma.PersonaAttributeUpdateArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), data: z.union([PersonaAttributeUpdateInputObjectSchema, PersonaAttributeUncheckedUpdateInputObjectSchema]), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateArgs>;

export const PersonaAttributeUpdateOneZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), data: z.union([PersonaAttributeUpdateInputObjectSchema, PersonaAttributeUncheckedUpdateInputObjectSchema]), where: PersonaAttributeWhereUniqueInputObjectSchema }).strict();
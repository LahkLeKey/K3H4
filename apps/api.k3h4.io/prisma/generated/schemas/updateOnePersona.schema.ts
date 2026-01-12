import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaUpdateInputObjectSchema as PersonaUpdateInputObjectSchema } from './objects/PersonaUpdateInput.schema';
import { PersonaUncheckedUpdateInputObjectSchema as PersonaUncheckedUpdateInputObjectSchema } from './objects/PersonaUncheckedUpdateInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';

export const PersonaUpdateOneSchema: z.ZodType<Prisma.PersonaUpdateArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), data: z.union([PersonaUpdateInputObjectSchema, PersonaUncheckedUpdateInputObjectSchema]), where: PersonaWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonaUpdateArgs>;

export const PersonaUpdateOneZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), data: z.union([PersonaUpdateInputObjectSchema, PersonaUncheckedUpdateInputObjectSchema]), where: PersonaWhereUniqueInputObjectSchema }).strict();
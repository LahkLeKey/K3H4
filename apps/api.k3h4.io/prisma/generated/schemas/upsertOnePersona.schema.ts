import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaIncludeObjectSchema as PersonaIncludeObjectSchema } from './objects/PersonaInclude.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './objects/PersonaWhereUniqueInput.schema';
import { PersonaCreateInputObjectSchema as PersonaCreateInputObjectSchema } from './objects/PersonaCreateInput.schema';
import { PersonaUncheckedCreateInputObjectSchema as PersonaUncheckedCreateInputObjectSchema } from './objects/PersonaUncheckedCreateInput.schema';
import { PersonaUpdateInputObjectSchema as PersonaUpdateInputObjectSchema } from './objects/PersonaUpdateInput.schema';
import { PersonaUncheckedUpdateInputObjectSchema as PersonaUncheckedUpdateInputObjectSchema } from './objects/PersonaUncheckedUpdateInput.schema';

export const PersonaUpsertOneSchema: z.ZodType<Prisma.PersonaUpsertArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema, create: z.union([ PersonaCreateInputObjectSchema, PersonaUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaUpdateInputObjectSchema, PersonaUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PersonaUpsertArgs>;

export const PersonaUpsertOneZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), include: PersonaIncludeObjectSchema.optional(), where: PersonaWhereUniqueInputObjectSchema, create: z.union([ PersonaCreateInputObjectSchema, PersonaUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaUpdateInputObjectSchema, PersonaUncheckedUpdateInputObjectSchema ]) }).strict();
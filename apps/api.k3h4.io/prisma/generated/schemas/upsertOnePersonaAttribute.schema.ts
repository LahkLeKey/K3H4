import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeIncludeObjectSchema as PersonaAttributeIncludeObjectSchema } from './objects/PersonaAttributeInclude.schema';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './objects/PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeCreateInputObjectSchema as PersonaAttributeCreateInputObjectSchema } from './objects/PersonaAttributeCreateInput.schema';
import { PersonaAttributeUncheckedCreateInputObjectSchema as PersonaAttributeUncheckedCreateInputObjectSchema } from './objects/PersonaAttributeUncheckedCreateInput.schema';
import { PersonaAttributeUpdateInputObjectSchema as PersonaAttributeUpdateInputObjectSchema } from './objects/PersonaAttributeUpdateInput.schema';
import { PersonaAttributeUncheckedUpdateInputObjectSchema as PersonaAttributeUncheckedUpdateInputObjectSchema } from './objects/PersonaAttributeUncheckedUpdateInput.schema';

export const PersonaAttributeUpsertOneSchema: z.ZodType<Prisma.PersonaAttributeUpsertArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema, create: z.union([ PersonaAttributeCreateInputObjectSchema, PersonaAttributeUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaAttributeUpdateInputObjectSchema, PersonaAttributeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeUpsertArgs>;

export const PersonaAttributeUpsertOneZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), include: PersonaAttributeIncludeObjectSchema.optional(), where: PersonaAttributeWhereUniqueInputObjectSchema, create: z.union([ PersonaAttributeCreateInputObjectSchema, PersonaAttributeUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaAttributeUpdateInputObjectSchema, PersonaAttributeUncheckedUpdateInputObjectSchema ]) }).strict();
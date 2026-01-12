import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityIncludeObjectSchema as PersonaCompatibilityIncludeObjectSchema } from './objects/PersonaCompatibilityInclude.schema';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './objects/PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityCreateInputObjectSchema as PersonaCompatibilityCreateInputObjectSchema } from './objects/PersonaCompatibilityCreateInput.schema';
import { PersonaCompatibilityUncheckedCreateInputObjectSchema as PersonaCompatibilityUncheckedCreateInputObjectSchema } from './objects/PersonaCompatibilityUncheckedCreateInput.schema';
import { PersonaCompatibilityUpdateInputObjectSchema as PersonaCompatibilityUpdateInputObjectSchema } from './objects/PersonaCompatibilityUpdateInput.schema';
import { PersonaCompatibilityUncheckedUpdateInputObjectSchema as PersonaCompatibilityUncheckedUpdateInputObjectSchema } from './objects/PersonaCompatibilityUncheckedUpdateInput.schema';

export const PersonaCompatibilityUpsertOneSchema: z.ZodType<Prisma.PersonaCompatibilityUpsertArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema, create: z.union([ PersonaCompatibilityCreateInputObjectSchema, PersonaCompatibilityUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaCompatibilityUpdateInputObjectSchema, PersonaCompatibilityUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpsertArgs>;

export const PersonaCompatibilityUpsertOneZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), include: PersonaCompatibilityIncludeObjectSchema.optional(), where: PersonaCompatibilityWhereUniqueInputObjectSchema, create: z.union([ PersonaCompatibilityCreateInputObjectSchema, PersonaCompatibilityUncheckedCreateInputObjectSchema ]), update: z.union([ PersonaCompatibilityUpdateInputObjectSchema, PersonaCompatibilityUncheckedUpdateInputObjectSchema ]) }).strict();
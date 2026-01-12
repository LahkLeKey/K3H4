import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeUpdateManyMutationInputObjectSchema as PersonaAttributeUpdateManyMutationInputObjectSchema } from './objects/PersonaAttributeUpdateManyMutationInput.schema';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './objects/PersonaAttributeWhereInput.schema';

export const PersonaAttributeUpdateManySchema: z.ZodType<Prisma.PersonaAttributeUpdateManyArgs> = z.object({ data: PersonaAttributeUpdateManyMutationInputObjectSchema, where: PersonaAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateManyArgs>;

export const PersonaAttributeUpdateManyZodSchema = z.object({ data: PersonaAttributeUpdateManyMutationInputObjectSchema, where: PersonaAttributeWhereInputObjectSchema.optional() }).strict();
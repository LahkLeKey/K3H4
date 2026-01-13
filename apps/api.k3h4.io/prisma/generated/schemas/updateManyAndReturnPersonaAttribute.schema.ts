import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaAttributeSelectObjectSchema as PersonaAttributeSelectObjectSchema } from './objects/PersonaAttributeSelect.schema';
import { PersonaAttributeUpdateManyMutationInputObjectSchema as PersonaAttributeUpdateManyMutationInputObjectSchema } from './objects/PersonaAttributeUpdateManyMutationInput.schema';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './objects/PersonaAttributeWhereInput.schema';

export const PersonaAttributeUpdateManyAndReturnSchema: z.ZodType<Prisma.PersonaAttributeUpdateManyAndReturnArgs> = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), data: PersonaAttributeUpdateManyMutationInputObjectSchema, where: PersonaAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaAttributeUpdateManyAndReturnArgs>;

export const PersonaAttributeUpdateManyAndReturnZodSchema = z.object({ select: PersonaAttributeSelectObjectSchema.optional(), data: PersonaAttributeUpdateManyMutationInputObjectSchema, where: PersonaAttributeWhereInputObjectSchema.optional() }).strict();